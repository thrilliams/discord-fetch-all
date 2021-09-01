import { Client, Intents, Message, TextChannel } from 'discord.js';
import { messages, reactions } from '../src/index';
import { BOT_TOKEN } from './config';

const client: Client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ]
});

client.once('ready', () => console.log('Yoo test is ready!'));

client.on('message', async (message: Message) => {
    if (!(message.channel instanceof TextChannel)) return;

    if (message.content === '!fetchMessages') {
        const allMessages = await messages(message.channel, {
            reverseArray: true,
            userOnly: true,
            botOnly: false,
            pinnedOnly: false,
        });

        console.log(allMessages.map(msg => msg.content));
    }
    else if (message.content === '!fetchReactions') {
        const msg = await message.channel.messages.fetch('882488807268687933');
        const allReactions = await reactions(msg, '🥵', {
            userOnly: true,
            botOnly: false,
        });

        console.log(allReactions.map(user => user.tag));
    }
});

client.login(BOT_TOKEN);