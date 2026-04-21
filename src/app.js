import { Client, GatewayIntentBits } from "discord.js";
import 'dotenv/config'
import fs from 'fs'

// Self Created Modules.
import { generateReply } from './chat/response.js'
import { GetTime } from './chat/logic.js'


const TOKEN = process.env.TOKEN;
const client = new Client({intents: [ "Guilds", "GuildMembers", "GuildMessages", "MessageContent", "GuildMessageReactions"]})

client.on('clientReady', () => {
    // Set Presence.
    client.user.setPresence(
        {
            status: "idle",
        }
    )
    // Log Message.
    console.log(`[cryofpear] Logged in as ${client.user.tag}`)
})

// [{ guild_id: '848...', channels: [{ channel_id: '929..', messages: []}] }]
let messagesChatHistory = []

client.on('messageCreate', async message => {

    // Prevent the Bot from talking to itself.
    if (message.author === client.user) return;

    let guild_id = message.guild.id
    let channel_id = message.channel.id
    let user = message.author.tag
    let timestamp = GetTime()

    // if New Guild, Initialize:
    messagesChatHistory.push({guild_id: guild_id, channels: [{channel_id: channel_id, messages: []}]})
    
    // [12:00:00 am on Tuesday 1st of January, 2026] barden Says: hello!!!!
    let formattedMessage = `[${timestamp}] ${user} Says: ${message.content} \n`
    let messageGuildLog = messagesChatHistory.find(log => log.guild_id === guild_id)
    
    if (!messageGuildLog) {
        const newGuildLog = { guild_id: guild_id, channels: [{ channel_id: channel_id, messages: [] }] }
        messagesChatHistory.push(newGuildLog)
        messageGuildLog = newGuildLog   // ← assign directly, no need to re-search
    }

    // console.log(messagesChatHistory)

    let messageChannelLog = messageGuildLog.channels.find(log => log.channel_id === channel_id)
    messageChannelLog.messages.push(formattedMessage)

    const response = await generateReply("GROQ", messageChannelLog.messages, "Only Reply if the last message in the log contains a swear word! Only reply with ONE EMOJI.")

    if(response) {
        message.react(response)
    }

})



// Client Login
client.login(TOKEN)