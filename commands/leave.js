const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Leave player'),
    async execute(interaction) {
        const guildId = interaction.guild.id;
        const guildQueue = interaction.client.player.getQueue(guildId);
        if (guildQueue) {
            guildQueue.leave();
            await interaction.reply('Leaving... (˃̣̣̥▽˂̣̣̥)');
            return;
        }

        await interaction.reply(`I can't leave, (✖﹏✖)`);
    },
};
