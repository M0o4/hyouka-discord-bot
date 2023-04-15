const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pauses player'),
    async execute(interaction) {
        const guildId = interaction.guild.id;
        const guildQueue = interaction.client.player.getQueue(guildId);
        if (guildQueue) {
            const paused = guildQueue.paused;
            guildQueue.setPaused(!paused);
            if (paused) {
                await interaction.reply('Resume player! (✪‿✪)ノ');
                return;
            }

            await interaction.reply('Pausing player! (✪‿✪)ノ');
            return;
        }

        await interaction.reply('There is no players to pause!');
    },
};
