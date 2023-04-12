const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stops player'),
    async execute(interaction) {
        const guildId = interaction.guild.id;
        const guildQueue = interaction.client.queues.find(
            (item) => item.guildId === guildId
        );
        if (guildQueue) {
            const { queue } = guildQueue;
            queue.stop();
            await interaction.reply('Stopping player! (✪‿✪)ノ');
            interaction.client.queues = interaction.client.queues.filter(
                (item) => item.queue !== queue
            );
            return;
        }

        await interaction.reply('There is no players to stop!');
    },
};
