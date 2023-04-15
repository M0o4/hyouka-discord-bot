const { SlashCommandBuilder } = require('discord.js');
const { createPlayerEmbed } = require('../../utils');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play song')
        .addStringOption((option) =>
            option
                .setName('song')
                .setDescription('The song url or name')
                .setRequired(true)
        ),
    async execute(interaction) {
        try {
            const song = interaction.options.getString('song');
            const guildId = interaction.guild.id;
            await interaction.reply({
                content: `Loading: ${song}`,
            });
            let queue = interaction.client.player.createQueue(guildId);
            await queue.join(interaction.member.voice.channel);
            await queue.play(song);
            await interaction.followUp({
                embeds: [createPlayerEmbed(queue.songs.at(-1))],
            });
        } catch (err) {
            console.log(err.message);
            await interaction.reply(`I can't play this song (☍﹏⁰)｡`);
        }
    },
};
