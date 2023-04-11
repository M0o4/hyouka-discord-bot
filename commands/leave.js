const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Leave player'),
    async execute(interaction) {
        const queue = interaction.client.queue;
        if (queue) {
            queue.leave();
            await interaction.reply('Leaving...');
            return;
        }

        await interaction.reply('Я не могу ливнуть, Жень ливни!');
    },
};
