import mongoose, { Schema } from "mongoose";

const responseSchema = new Schema({
    musicData: [
        {
            type: String,
            required: true
        }
    ],
    embeddings: [
        {
            type: [Number],
            required: true,
        }
    ]
});

export const Response = mongoose.model('Response', responseSchema);
