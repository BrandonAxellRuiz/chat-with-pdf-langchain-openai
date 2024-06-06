import { OpenAIEmbeddings } from "@langchain/openai";
// import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
// import { TextLoader } from "langchain/document_loaders/fs/text";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { config } from "../config/config.js";
import { logger } from "../utils/logger.js";
import fs from "fs";
import path from "path";

/**
 * The `ingestDocuments` function processes PDF files, extracts text, generates embeddings, and saves
 * them in directories, while the `listEmbeddingDirectories` function lists existing embedding
 * directories.
 * @param files - The `files` parameter in the `ingestDocuments` function is an array of file objects
 * that contain information about the files to be ingested. Each file object typically includes
 * properties like `filename`, `originalname`, and possibly other metadata related to the file.
 */
export const ingestDocuments = async (files) => {
  try {
    for (const file of files) {
      const filePath = path.join(config.uploadPath, file.filename); // Ensure this is not undefined
      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found at ${filePath}`);
      }

      // const loader = new PDFLoader(filePath);
      const loader = new DocxLoader(filePath);
      const docs = await loader.load();
      logger.info(`Documents loaded from ${file.originalname}`);

      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });

      const docOutput = await textSplitter.splitDocuments(docs);
      const vectorStore = await FaissStore.fromDocuments(
        docOutput,
        new OpenAIEmbeddings()
      );

      const embeddingDir = path.join(
        config.embeddingDir,
        path.basename(file.originalname, ".pdf")
      );
      if (!fs.existsSync(embeddingDir)) {
        fs.mkdirSync(embeddingDir, { recursive: true });
      }
      await vectorStore.save(embeddingDir);
      logger.info(`Embedding file saved for ${file.originalname}`);

      // Cleanup the uploaded file after processing
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    logger.error(`Error during document ingestion: ${error}`);
    throw error;
  }
};

export const listEmbeddingDirectories = () => {
  const embeddingPath = config.embeddingDir;

  try {
    // Ensure the embeddings directory exists
    if (!fs.existsSync(embeddingPath)) {
      logger.error("Embedding directory does not exist.");
      return [];
    }

    // Read the directory and filter to only include directories
    return fs
      .readdirSync(embeddingPath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
  } catch (error) {
    logger.error(`Error listing embedding directories: ${error}`);
    throw error;
  }
};
