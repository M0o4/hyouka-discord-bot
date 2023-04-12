const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Leave player'),
    async execute(interaction) {
        const guildId = interaction.guild.id;
        const guildQueue = interaction.client.queues.find(
            (item) => item.guildId === guildId
        );
        if (guildQueue) {
            const { queue } = guildQueue;
            queue.leave();
            await interaction.reply('Leaving... (˃̣̣̥▽˂̣̣̥)');
            interaction.client.queues = interaction.client.queues.filter(
                (item) => item.queue !== queue
            );
            return;
        }

        await interaction.reply(`I can't leave, (✖﹏✖)`);
    },
};
