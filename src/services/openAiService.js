import { OpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { loadQAStuffChain } from "langchain/chains";
import { config } from "../config/config.js";

/**
 * The `getAnswer` function uses OpenAI's GPT-4 model and FaissStore to find the most relevant answer
 * to a given question within a document.
 * @param doc - The `doc` parameter in the `getAnswer` function is a string that represents the
 * document file name or path from which the function will load data for processing.
 * @param question - The `question` parameter is the question that you want to ask the AI model in
 * order to get an answer based on the provided document and the loaded vector store.
 * @returns The function `getAnswer` returns the result of the similarity search performed on the
 * loaded vector store using the provided question.
 */
export async function getAnswer(doc, question) {
  // gpt-3.5-turbo o gpt-4-turbo o gpt-4o
  const llmA = new OpenAI({ modelName: "gpt-3.5-turbo" });
  const chainA = loadQAStuffChain(llmA);
  const loadedVectorStore = await FaissStore.load(
    `${config.dir}/${doc}`,
    new OpenAIEmbeddings()
  );

  const result = await loadedVectorStore.similaritySearch(question);

  return await chainA._call({
    input_documents: result,
    question,
  });
}
