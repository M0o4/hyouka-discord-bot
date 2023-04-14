const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const moment = require('moment');
const axios = require('axios');

function getAnimeAiredDate(anime) {
    if (!anime?.aired?.from) {
        return '???';
    }

    const from = moment(anime.aired.from);
    const formattedFrom = from.format('DD.MM.YYYY');

    if (!anime?.aired?.to) {
        return `${formattedFrom} - ???`;
    }

    const to = moment(anime.aired.to);
    const formattedTo = to.format('DD.MM.YYYY');

    return `${formattedFrom} - ${formattedTo}`;
}

function createEmbed(anime) {
    return new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(
            `${
                anime?.title_english ||
                anime.titles.find((item) => item?.type === 'English')?.title ||
                anime.titles.find((item) => item?.type === 'Default')?.title
            }`
        )
        .setURL(`${anime?.url || 'none'}`)
        .setDescription(`${anime?.synopsis || 'no synopsis'}`)
        .setThumbnail(
            `${
                anime?.images?.jpg?.large_image_url ||
                anime?.images?.jpg?.small_image_url ||
                anime?.images?.jpg?.image_url
            }`
        )
        .addFields(
            {
                name: `📌 ID anime: ${anime.mal_id}`,
            },
            {
                name: `⚙️ Trailer: ${anime?.trailer?.url || '???'}`,
            },
            {
                name: `🗂 Type: ${anime?.type || '???'}`,
            },
            {
                name: `📺 Source: ${anime?.source || '???'}`,
            },
            {
                name: `📀 Episodes: ${anime?.episodes || '???'}`,
            },
            {
                name: `⌛️ Status: ${anime?.status || '???'}`,
            },
            {
                name: `🔔 Genres: ${
                    anime?.genres.map((item) => item.name).join(',') || '???'
                }`,
            },
            {
                name: `⏰ Duration: ${anime?.duration || '???'}`,
            },
            {
                name: `🗓 Airing: ${getAnimeAiredDate(anime)}`,
            },
            {
                name: `📊 Score: ${anime?.score || '???'}`,
            },
            {
                name: `⭐️ Rank: 4 ${anime?.rank || '???'}`,
            }
        )
        .addFields({
            name: 'Inline field title',
            value: 'Some value here',
            inline: true,
        })
        .setImage('https://i.imgur.com/AfFp7pu.png')
        .setTimestamp()
        .setFooter({
            text: 'Some footer text here',
            iconURL: 'https://i.imgur.com/AfFp7pu.png',
        });
}

function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('anime_top')
        .setDescription('Anime top list'),
    async execute(interaction) {
        try {
            await interaction.reply(`Please, wait ღゝ◡╹ )ノ♡`);
            const res = await axios.get(`https://api.jikan.moe/v4/top/anime`);
            const animes = res?.data?.data;
            if (!animes) {
                await interaction.followUp('Something went wrong (ノ﹏ヽ)');
                return;
            }
            for (let anime of animes) {
                await interaction.followUp({ embeds: [createEmbed(anime)] });
                await delay(1000);
            }
        } catch (err) {
            await interaction.followUp('Something went wrong (ノ﹏ヽ)');
            console.log(err);
        }
    },
};
