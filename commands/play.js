const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

function createEmbed(song) {
    return new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(`${song.name || '???'}`)
        .setURL(`${song.url || 'none'}`)
        .setAuthor({ name: `${song.author || '???'}` })
        .setDescription(`Duration: ${song.duration || '???'}`)
        .setThumbnail(`${song.thumbnail || ''}`)
        .addFields({
            name: 'Inline field title',
            value: 'Some value here',
            inline: true,
        })
        .setImage(`${song.thumbnail || ''}`);
}

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
                embeds: [createEmbed(queue.songs.at(-1).url)],
            });
        } catch (err) {
            console.log(err.message);
            await interaction.reply(`I can't play this song (☍﹏⁰)｡`);
        }
    },
};
