const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Stops song'),
    async execute(interaction) {
        const guildId = interaction.guild.id;
        const guildQueue = interaction.client.player.getQueue(guildId);
        console.log(guildQueue);
        if (guildQueue) {
            guildQueue.skip();
            await interaction.reply(`Skipping song! (✪‿✪)ノ`);
            return;
        }

        await interaction.reply(`There is no song to skip ┐ ( -“-) ┌`);
    },
};