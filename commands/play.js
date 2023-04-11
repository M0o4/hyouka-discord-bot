const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QueryType } = require('discord-player');

function yess(yes) {
    const totalDurationMs = yes.track.playlist.tracks.reduce(
        (a, c) => c.durationMS + a,
        0
    );
    const totalDurationSec = Math.floor(totalDurationMs / 1000);
    const hours = Math.floor(totalDurationSec / 3600);
    const minutes = Math.floor((totalDurationSec % 3600) / 60);
    const seconds = totalDurationSec % 60;
    const durationStr = `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return durationStr;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play query')
        .addStringOption((option) =>
            option
                .setName('query')
                .setDescription('The input to echo back')
                .setRequired(true)
        ),
    async execute(interaction) {
        try {
            const check = interaction.options.getString('query');

            const result = await interaction.client.player.search(check, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO,
            });

            const results = new EmbedBuilder()
                .setTitle(`No results`)
                .setColor(`#ff0000`)
                .setTimestamp();

            if (!result.hasTracks()) {
                return interaction.reply({ embeds: [results] });
            }

            await interaction.deferReply();
            await interaction.editReply({
                content: `Loading a: ${result.playlist ? 'playlist' : 'track'}`,
            });

            const yes = await interaction.client.player.play(
                interaction.member.voice.channel?.id,
                result,
                {
                    ytdlOptions: {
                        quality: 'highest',
                        filter: 'audioonly',
                        highWaterMark: 1 << 25,
                        dlChunkSize: 0,
                    },
                    nodeOptions: {
                        metadata: {
                            channel: interaction.channel,
                            client: interaction.guild?.members.me,
                            requestedBy: interaction.user.username,
                        },
                        volume: 20,
                        bufferingTimeout: 3000,
                        leaveOnEnd: true,
                    },
                }
            );

            const embed = new EmbedBuilder();

            embed
                .setDescription(
                    `${
                        yes.track.playlist
                            ? `**multiple tracks** from: **${yes.track.playlist.title}**`
                            : `**${yes.track.title}**`
                    }`
                )
                .setThumbnail(
                    `${
                        yes.track.playlist
                            ? `${yes.track.playlist.thumbnail.url}`
                            : `${yes.track.thumbnail}`
                    }`
                )
                .setColor(`#00ff08`)
                .setTimestamp()
                .setFooter({
                    text: `Duration: ${
                        yes.track.playlist
                            ? `${yess(yes)}`
                            : `${yes.track.duration}`
                    } | Event Loop Lag ${interaction.client.player.eventLoopLag.toFixed(
                        0
                    )}`,
                });
            return interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.log(error);
        }
    },
};
