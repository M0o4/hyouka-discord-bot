const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Echo text')
        .addStringOption((option) =>
            option
                .setName('song')
                .setDescription('The input to echo back')
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
            interaction.client.queues.push({ queue, guildId });
            await queue.join(interaction.member.voice.channel);
            await queue.play(song);
            await interaction.editReply({
                content: `Loading: ${queue.songs.at(-1).url}`,
            });
        } catch (err) {
            console.log(err.message);
        }
    },
};
