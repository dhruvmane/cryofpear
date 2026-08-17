import 'dotenv/config'

// Load Groq.
import Groq from "groq-sdk";
const GROQ_API_KEY = process.env.GROQ_API_KEY
const GROQ_MODEL = process.env.GROQ_MODEL
const groq_ai = new Groq({ apiKey: GROQ_API_KEY });

// Returns an AI Response.
async function generateReply(ai_type: string, contentsArray: string[], prompt: string) {
    switch (ai_type) {
        case "GROQ":
            try {
                const response = await groq_ai.chat.completions.create({
                    messages: [
                        {
                            role: 'user',
                            content: `${prompt + contentsArray.join("\n")}`
                        }
                    ],
                    model: GROQ_MODEL!
                })
                // console.log(response.choices[0].message.content)
                 // console.log(response.choices[0].message)
                 return response.choices[0].message.content
            } catch (error){
                console.log(`[ERROR]: ${error}`)
                return '😔'
            }
            break
    }
}


export { generateReply as generateReply}