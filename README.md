# NODEJS LANGCHAIN OPENAI Chatbot

Interact with your PDF files using this OpenAI-powered chatbot. Below are the steps to set it up and start chatting with your documents.

## Setup Instructions

1. **Clone the Repository**

   - Clone this repository to your local machine.

2. **Environment Setup**

   - Rename the file `.env.example` to `.env`.
   - Obtain your OpenAI API key and paste it into the `.env` file.

3. **Install Dependencies**

   - Run `npm install` to install all required packages.

4. **Upload Your Files**

   - Use the endpoint `api/upload` to upload your PDF file or files.

5. **Chat with Your PDF**

   - Navigate to `http://localhost:3000/chat-pdf?docEmbedding=docName&question=QuestionText`.
   - Replace `docName` with the name of your uploaded document.
   - Replace `QuestionText` with your specific question to the document.

6. **Feedback**
   - Enjoy interacting with your PDF! If this project helps you, consider leaving a ⭐️ on our GitHub repository!

## Support

For any issues or inquiries, contact us at [brandon.ruiz@barrcode.dev](mailto:brandon.ruiz@barrcode.dev).

Thank you for using our NODEJS LANGCHAIN OPENAI Chatbot!
