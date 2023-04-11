require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { Player } = require('discord-player');
const { token } = require('./config.json');
const path = require('node:path');
const fs = require('node:fs');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});
const player = new Player(client, {
    deafenOnJoin: true,
    lagMonitor: 1000,
    ytdlOptions: {
        quality: 'highestaudio',
    },
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith('.js'));

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(
            `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
    }
}

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

player.events.on('playerStart', (queue, track) => {
    queue.metadata.channel.send(`Started playing **${track.title}**!`);
});

player.events.on('audioTrackAdd', (queue, track) => {
    if (queue.node.isPlaying()) {
        queue.metadata.channel.send(`Added to the queue ${track.title}`);
    } else {
        queue.metadata.channel.send(`Track **${track.title}** queued`);
    }
});

player.events.on('audioTracksAdd', (queue, track) => {
    if (queue.node.isPlaying()) {
        queue.metadata.channel.send(`Playlist added ${track.title}`);
    } else {
        queue.metadata.channel.send(
            `Playlist starts from title: ${track.title}`
        );
    }
});

client.player = player;

client.login(token);
