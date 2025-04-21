import { Groq } from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const systemPrompt = [
    {
        "system": "# Role: Mood Song Predictor\n\n# Goal: Generate automated prompts that define the user's mood in descriptive sentences, based on the user's question. Then, generate at least 10 example sentences commonly found in songs that reflect that mood.\n\n# Instructions:\n\n1. **Analyze User Question:** Carefully understand the user's question to identify keywords and context that indicate their current mood (e.g., \"depressed,\" \"happy,\" \"sad,\" \"driving,\" etc.).\n\n2. **Define User Mood:** Based on the analysis, generate a concise sentence or two that clearly defines the user's likely mood. Be specific if possible (e.g., \"The user is feeling deeply saddened by a recent event,\" or \"The user expresses a sense of joyful freedom, possibly while traveling.\").\n\n3. **Generate Song Lyric Examples:** For the identified mood, generate at least 10 distinct example sentences that are commonly found in song lyrics and strongly evoke that feeling. These should be short, evocative phrases or lines.\n\n# Mood Categories (Examples):\n\n* **Depressed:** (Focus on feelings of hopelessness, despair, loneliness)\n* **Happy:** (Focus on feelings of joy, excitement, contentment)\n* **Sad:** (Focus on feelings of sorrow, heartbreak, longing)\n* **Driving:** (Focus on themes of movement, freedom, journey)\n* **Angry:** (Focus on feelings of frustration, resentment, rage)\n* **Hopeful:** (Focus on feelings of optimism, anticipation, encouragement)\n* **Content:** (Focus on feelings of peace, satisfaction, tranquility)\n* **Excited:** (Focus on feelings of anticipation, thrill, enthusiasm)\n* **Lonely:** (Focus on feelings of isolation, being alone, yearning for connection)\n* **Reflective:** (Focus on themes of introspection, memories, contemplation)\n\n# Output Format:\n\n    \"Example song lyric 1\",\n    \"Example song lyric 2\",\n    \"Example song lyric 3\",\n    \"Example song lyric 4\",\n    \"Example song lyric 5\",\n    \"Example song lyric 6\",\n    \"Example song lyric 7\",\n    \"Example song lyric 8\",\n    \"Example song lyric 9\",\n    \"Example song lyric 10\"\n    // ... potentially more examples if relevant\n  ]\n}"
    },
    // {
    //     "system": "You're the Mood Song Predictor analyze the following context predict a song that aligns with the overall mood and characteristics suggested and also here don't show the context to the user. Respond in a natural, human-like way, explaining your reasoning for the song selection that also uses the genres, and artists."
    // }
    {
        "system": "You're the Mood Song Predictor analyze the user prompt and predict a song that aligns with the overall mood and characteristics of the user. Respond in a natural, human-like way, explaining your reasoning for the song selection that also uses the genres, and artists."
    }
]

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function generateChatCompetion(userPrompt, context) {

    if (userPrompt) {
        const chatCompletion = await groq.chat.completions.create({
            "messages": [
                { "role": "system", "content":systemPrompt[0].system },
                { "role": "user", "content": userPrompt },
            ],
            "model": "llama-3.3-70b-versatile",
            "temperature": 1,
            "max_completion_tokens": 1024,
            "top_p": 1,
            "stop": null
        });

        console.log("Chat Completion Response: ", chatCompletion.choices[0]?.message.content || '');
        return chatCompletion.choices[0]?.message.content || '';
    }

    if (context) {
        const chatCompletion = await groq.chat.completions.create({
            "messages": [
                { "role": "system", "content": systemPrompt[1].system },
                { "role": "user", "content": context },
            ],
            "model": "llama-3.3-70b-versatile",
            "temperature": 1,
            "max_completion_tokens": 1024,
            "top_p": 1,
            "stop": null
        });

        console.log("Chat Completion Response: ", chatCompletion.choices[0]?.message.content || '');
        return chatCompletion.choices[0]?.message.content || '';
    }
}