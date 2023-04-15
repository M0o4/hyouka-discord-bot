const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skips song'),
    async execute(interaction) {
        const guildId = interaction.guild.id;
        const guildQueue = interaction.client.player.getQueue(guildId);
        if (guildQueue) {
            guildQueue.skip();
            await interaction.reply(`Skipping song! (✪‿✪)ノ`);
            const song = guildQueue?.songs[0];
            if (song) {
                await interaction.followUp(`Now playing: ${song.url}`);
                return;
            }
            await interaction.followUp(`Queue is empty (ﾐⓛᆽⓛﾐ)✧`);
            return;
        }

        await interaction.reply(`There is no song to skip ┐ ( -“-) ┌`);
    },
};
