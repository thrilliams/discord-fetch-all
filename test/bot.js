"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const index_1 = require("../src/index");
const config_1 = require("./config");
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
    ]
});
client.once('ready', () => console.log('Yoo test is ready!'));
client.on('message', async (message) => {
    if (!(message.channel instanceof discord_js_1.TextChannel))
        return;
    if (message.content === '!fetchMessages') {
        const allMessages = await (0, index_1.messages)(message.channel, {
            reverseArray: true,
            userOnly: true,
            botOnly: false,
            pinnedOnly: false,
        });
        console.log(allMessages.map(msg => msg.content));
    }
    else if (message.content === '!fetchReactions') {
        const msg = await message.channel.messages.fetch('882488807268687933');
        const allReactions = await (0, index_1.reactions)(msg, '🥵', {
            userOnly: true,
            botOnly: false,
        });
        console.log(allReactions.map(user => user.tag));
    }
});
client.login(config_1.BOT_TOKEN);
