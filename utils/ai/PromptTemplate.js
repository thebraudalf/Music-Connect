import { Groq } from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });


const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

// This function generates a chat completion based on the user's prompt and context.
export async function generateChatCompetion(userPrompt, context) {
    // {
    //     "system": "You're the Mood Song Predictor analyze the user prompt and predict a song that aligns with the overall mood and characteristics of the user. Respond in a natural, human-like way, explaining your reasoning for the song selection that also uses the genres, and artists."
    // }

    if (userPrompt) {
        const systemPrompt1 = {
            "role": "system",
            "content": "# Role: Mood Song Predictor\n\n# Goal: Generate automated prompts that define the user's mood in descriptive sentences, based on the user's question. Then, generate at least 10 example sentences commonly found in songs that reflect that mood.\n\n# Instructions:\n\n1. **Analyze User Question:** Carefully understand the user's question to identify keywords and context that indicate their current mood (e.g., \"depressed,\" \"happy,\" \"sad,\" \"driving,\" etc.).\n\n2. **Define User Mood:** Based on the analysis, generate a concise sentence or two that clearly defines the user's likely mood. Be specific if possible (e.g., \"The user is feeling deeply saddened by a recent event,\" or \"The user expresses a sense of joyful freedom, possibly while traveling.\").\n\n3. **Generate Song Lyric Examples:** For the identified mood, generate at least 10 distinct example sentences that are commonly found in song lyrics and strongly evoke that feeling. These should be short, evocative phrases or lines.\n\n# Mood Categories (Examples):\n\n* **Depressed:** (Focus on feelings of hopelessness, despair, loneliness)\n* **Happy:** (Focus on feelings of joy, excitement, contentment)\n* **Sad:** (Focus on feelings of sorrow, heartbreak, longing)\n* **Driving:** (Focus on themes of movement, freedom, journey)\n* **Angry:** (Focus on feelings of frustration, resentment, rage)\n* **Hopeful:** (Focus on feelings of optimism, anticipation, encouragement)\n* **Content:** (Focus on feelings of peace, satisfaction, tranquility)\n* **Excited:** (Focus on feelings of anticipation, thrill, enthusiasm)\n* **Lonely:** (Focus on feelings of isolation, being alone, yearning for connection)\n* **Reflective:** (Focus on themes of introspection, memories, contemplation)\n# Note: Ensure the examples are varied and reflect different aspects of the identified mood. Avoid repetition and strive for creativity in the examples.\n\n# Strictly return the output without any other explaination(**Analyzing your question:**, **Defining your mood:**, **Generating song lyric examples for a sad mood:**, These lyrics aim to capture the essence of sadness, heartbreak, and longing, and might help you find solace in music that understands your emotional state.) by following Example Output:\n\n\"I feel like I'm walking on sunshine\",\n\"Every little thing is gonna be alright\",\n\"I'm on top of the world\"\n"
        };

        const chatCompletion = await groq.chat.completions.create({
            "messages": [
                { "role": "user", "content": userPrompt },
                { "role": "system", "content": systemPrompt1.content },
            ],
            "model": "llama-3.3-70b-versatile",
            "temperature": 1,
            "max_completion_tokens": 1024,
            "top_p": 1,
            "stop": null
        });

        //console.log("Chat Completion Response: ", chatCompletion.choices[0]?.message.content || '');
        return chatCompletion.choices[0]?.message.content || '';
    }

    if (context) {
        const systemPrompt2 = context.map((item) => {
            return new Object({
                "role": "system",
                "content": `# Role: Mood Song Predictor # Goal: analyze the context: ${item.musicData.songLyrics} and predict a song: ${item.musicData.songMetaData.song} based on the context that aligns with the overall mood and characteristics suggested. Respond in a natural, human-language, explaining your reasoning for the song: ${item.musicData.songMetaData.song} selection that also uses the genres: ${item.musicData.songMetaData.genre}, and artists: ${item.musicData.songMetaData.artist} Note: **Don't let user know that you are Mood Song Predictor and also don't let user know that you predict song by the context(which is lyrics) strictly reply like human is suggesting songs to user and also user is only provided his expression not lyrics**.`,
            })
        });
        const chatCompletion = await groq.chat.completions.create({
            "messages": [
                { "role": "system", "content": systemPrompt2.map((item) => item.content).join(' ') },
            ],
            "model": "llama-3.3-70b-versatile",
            "temperature": 1,
            "max_completion_tokens": 1024,
            "top_p": 1,
            "stop": null
        });

        //console.log("Chat Completion Response: ", chatCompletion.choices[0]?.message.content || '');
        return chatCompletion.choices[0]?.message.content || '';
    }
}