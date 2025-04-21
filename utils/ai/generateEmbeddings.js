import { pipeline } from '@xenova/transformers';

// Function to generate embeddings for a given data source
export async function getEmbedding(data) {
   try {
     const embedder = await pipeline(
         'feature-extraction',
         'Xenova/nomic-embed-text-v1');
     const results = await embedder(data, { pooling: 'mean', normalize: true });
     return Array.from(results.data);
   } catch (error) {
     //console.error("Error generating embeddings:", error);
     throw new Error("Failed to generate embeddings");
    
   }
}