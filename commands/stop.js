const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stops player'),
    async execute(interaction) {
        const queue = interaction.client.queue;
        if (queue) {
            queue.stop();
            await interaction.reply('Stopping player!\n\nЖеня урод заткнись!');
            return;
        }

        await interaction.reply('There is no players to stop!');
    },
};
