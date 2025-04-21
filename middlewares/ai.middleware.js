import { generateChatCompetion } from "../utils/ai/PromptTemplate.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
// import { Response } from "../models/response.model.js";
//import { getEmbedding } from "../utils/ai/generateEmbeddings.js";
import { ApiError } from "../utils/ApiError.js";
// import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const chatGeneration = asyncHandler(async (req, res, next) => {
    // Step 1: Extract the user message from the request body
    // Step 2: Call the generateChatCompetion func with the user message
    // Step 3: Generate embeddings for the generated user message
    // Step 4: Perform vector search on response model with generated chat response
    // Step 5: Extract the vector search result and again call the generateChatCompetion func and pass the vector search result as a message to the function 

    try {

        // extracing the user message from the request body
        const { receiverMessage } = req.body;
        //console.log("receiverMessage", receiverMessage);

        // calling the generateChatCompetion func with the user message
        // const chatQuestionResponse = await generateChatCompetion(receiverMessage);
        //console.log("chatResponse", chatQuestionResponse);

        // if (!chatQuestionResponse) {
            // throw new ApiError(400, "Unabe to generate chat question response");
        // }


        // Generating embeddings for the generated user message
        // const embeddings = await getEmbedding("sad");
        // //console.log("embeddings", embeddings);

        // if (!embeddings) {
        //     throw new ApiError(400, "Unable to generate embeddings");
        // }


        // Performing vector search through response model with generated chat response
        /*const response = await Response.aggregate([
            {
                $vectorSearch: {
                    index: "vector_indexes",
                    queryVector: embeddings,
                    path: "embeddings",
                    exact: true,
                    limit: 5
                }
            },
            {
                $project: {
                   musicData: 1,
                }
            }
        ]); */
        //console.log("response", response);
        

        // if (response.length === 0) {
        //     throw new ApiError(400, "Unabe to perform vector search");
        // }


        // Extracting the vector search result and again call the generateChatCompetion func and pass the vector search result as a message to the function
        const chatResponse = await generateChatCompetion(undefined, receiverMessage);
        //console.log("chatResponse", chatResponse);

        if (!chatResponse) {
            throw new ApiError(400, "Unable to generate chat response");
        }

        req.chatResponse = chatResponse;
        next();
    } catch (error) {
        //console.error(error);
        res.status(500).json(new ApiError(500, "Internal Server Error", error.message));
    }
})

export { chatGeneration }