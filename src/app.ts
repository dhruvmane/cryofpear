import { Client, ClientUser } from "discord.js";
import 'dotenv/config'
import fs from 'fs'

import { type messageChatHistoryType } from './bot_features/reply.ts'

// Self Created Modules.
// Bot Features
import { replyWithAI } from "./bot_features/reply.ts";

const TOKEN = process.env.TOKEN;
export const client = new Client({intents: [ "Guilds", "GuildMembers", "GuildMessages", "MessageContent", "GuildMessageReactions"]})

client.on('clientReady', () => {
    // Set Presence.
    client.user?.setPresence(
        {
            status: "idle",
        }
    )
    // Log Message.
    console.log(`[cryofpear] Logged in as ${client.user?.tag}`)
})

// [{ guild_id: '848...', channels: [{ channel_id: '929..', messages: []}] }]
let messagesChatHistory: messageChatHistoryType[] = []

client.on('messageCreate', async message => {
    // Prevent bot from talking to itself.
    if (message.author === client.user) return;
    // Reply with an AI Generated Prompt and Chat History Appended.
    if (message.reference && message.reference.messageId || message.mentions.has(client.user as ClientUser)) {
         replyWithAI(message, messagesChatHistory);
    }
})


// Client Login
client.login(TOKEN)