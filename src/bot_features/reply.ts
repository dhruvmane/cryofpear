// Generates an AI Generated Response to Message.


import { Message, type OmitPartialGroupDMChannel } from "discord.js"
import { generateReply } from '../chat/response.ts'
import { GetTime } from '../chat/logic.ts'

export type messageChatHistoryType = {
     guild_id: string | undefined,
     channels: [{ channel_id: string, messages: string[] }]
}

async function replyWithAI(message: OmitPartialGroupDMChannel<Message>, messagesChatHistory: messageChatHistoryType[]) {

    let guild_id = message.guild?.id
    let channel_id = message.channel.id
    let user = message.author.tag
    let timestamp = GetTime()

    // if New Guild, Initialize:
    messagesChatHistory.push({guild_id: guild_id, channels: [{channel_id: channel_id, messages: []}]})

    // [12:00:00] am on Tuesday 1st of January, 2026] barden Says: hello!!!!
    let formattedMessage = `[${timestamp}] ${user} Says: ${message.content} \n`
    let messageGuildLog = messagesChatHistory.find(log => log.guild_id === guild_id)

    if (!messageGuildLog) {
        const newGuildLog: messageChatHistoryType = { guild_id: guild_id, channels: [{ channel_id: channel_id, messages: [] }] }
        messagesChatHistory.push(newGuildLog)
        messageGuildLog = newGuildLog   // assign directly, no need to re-search
    }

    // console.log(messagesChatHistory)

    let messageChannelLog = messageGuildLog.channels.find(log => log.channel_id === channel_id)
    messageChannelLog?.messages.push(formattedMessage)
    console.log(formattedMessage)
    const GROQ_PROMPT = process.env.GROQ_PROMPT
    const prompt = GROQ_PROMPT
    const response = await generateReply("GROQ", messageChannelLog!.messages, prompt!)

    if(response) {
        // console.log(response)
        if (response.length == 1) {
            message.react(response)
        } else if (response !== "") {
            message.reply(response)
        }
    }
}

export { replyWithAI }
