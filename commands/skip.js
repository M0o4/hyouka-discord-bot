const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stops player'),
    async execute(interaction) {
        const guildId = interaction.guild.id;
        const guildQueue = interaction.client.player.getQueue(guildId);
        if (guildQueue) {
            guildQueue.skip();
            await interaction.reply('Stopping player! (✪‿✪)ノ');
            return;
        }

        await interaction.reply('There is no players to stop!');
    },
};
