import 'dotenv/config'

// Load Gemini Chatbot.
import { GoogleGenAI } from "@google/genai";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_MODEL = process.env.GEMINI_MODEL
const gemini_ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY
})

// Load ChatGPT.
// import { ChatGPTAPI } from 'chatgpt';
// const OPENAI_API_KEY = process.env.OPENAI_API_KEY
// const chatgpt_ai = new ChatGPTAPI({
    // apiKey: OPENAI_API_KEY
// })

// Load Groq.
import Groq from "groq-sdk";
const GROQ_API_KEY = process.env.GROQ_API_KEY
const GROQ_MODEL = process.env.GROQ_MODEL
const groq_ai = new Groq({ apiKey: GROQ_API_KEY });

// Returns an AI Response.
async function generateReply(ai_type, contentsArray, prompt) {
    switch (ai_type) {
        case "GEMINI":
            try {
                const response = await gemini_ai.models.generateContent({
                    model: GEMINI_MODEL,
                    contents: `${contentsArray.join("\n") + prompt}`
                })
                return response.text
            } catch (error) {
                console.log(`[ERROR]: ${error}`)
                return '😔'
            }
            break


        case "GROQ":
            try {
                const response = await groq_ai.chat.completions.create({
                    messages: [
                        {
                            role: 'user',
                            content: `${contentsArray.join("\n") + prompt}`
                        }
                    ],
                    model: GROQ_MODEL
                })
                // console.log(response.choices[0].message.content)
                return response.choices[0].message.content
            } catch (error){
                console.log(`[ERROR]: ${error}`)
                return '😔'
            }    
            break

    }
}


export { generateReply as generateReply}