import { generateChatCompetion } from "../utils/ai/PromptTemplate.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Response } from "../models/response.model.js";
import { getEmbedding } from "../utils/ai/generateEmbeddings.js";
import { ApiError } from "../utils/ApiError.js";
import e from "cors";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

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

        // checking if the receiverMessage and content is present in the request body
        if (!receiverMessage) {
            throw new ApiError(400, "Receiver message are required");
        }

        // calling the generateChatCompetion func with the user message
        const chatQuestionResponse = await generateChatCompetion(receiverMessage);
        //console.log("chatResponse", chatQuestionResponse);

        if (!chatQuestionResponse) {
            throw new ApiError(400, "Unabe to generate chat question response");
        }

        // Chunk the song lyrics into smaller parts
        const textsplitters = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 20,
        });
        const chunks = await textsplitters.splitText(chatQuestionResponse); // Split the texts into chunks
        //console.log("Chunks: ", chunks);


        // Generating embeddings for the generated user message
        const embeddings = await getEmbedding(chunks);
        //console.log("embeddings", embeddings);
        // if (embeddings && Array.isArray(embeddings) && embeddings.length === 768) {
        //     // If the embedding is valid, push it to the embeddings array
        //     if (!embeddings) {
        //         embeddings = embedding;
        //     } else {
        //         embeddings.push(embedding);
        //     }
        // } else {
        //     console.error("Invalid embedding for chunk:", chunk);
        // }

        // const embeddings = await getEmbedding(chunks);
        // console.log("embeddings", embeddings);
        // const embeddings = [];
        // for (const chunk of chunks) {
        //     const embedding = await getEmbedding(chunk); // embedding for just 1 chunk

        //     if (embedding && Array.isArray(embedding) && embedding.length === 768) {
        //         // If the embedding is valid, push it to the embeddings array
        //         if (!embeddings) {
        //             embeddings = embedding;
        //         } else {
        //             embeddings.push(embedding);
        //         }
        //     } else {
        //         console.error("Invalid embedding for chunk:", chunk);
        //     }
        // }
        //console.log("embeddings", embeddings);


        if (!embeddings) {
            throw new ApiError(400, "Unable to generate embeddings");
        }


        // Performing vector search through response model with generated chat response
        const results = await Response.aggregate([
            {
                $vectorSearch: {
                    index: "vector_indexes", // This index must be of type `vector`
                    path: "embeddings",
                    queryVector: embeddings,
                    numCandidates: 100,
                    Dimensions: 768,
                    limit: 5,
                    similarity: "cosine"
                }

            },
            {
                $project: {
                    // _id: 0,
                    musicData: 1,
                    // score: { $meta: "vectorSearchScore" }
                }
            }
        ]);
        //console.log("response", results);

        // if (response.length === 0) {
        //     throw new ApiError(400, "Unabe to perform vector search");
        // }


        // Extracting the vector search result and again call the generateChatCompetion func and pass the vector search result as a message to the function
        const chatResponse = await generateChatCompetion(undefined, results);
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