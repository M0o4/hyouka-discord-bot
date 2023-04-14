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
                name: '📌 ID anime: ',
                value: `${anime.mal_id}`,
            },
            {
                name: '⚙️ Trailer: ',
                value: `${anime?.trailer?.url || '???'}`,
            },
            {
                name: '🗂 Type: ',
                value: `${anime?.type || '???'}`,
            },
            {
                name: ' Source: ',
                value: `${anime?.source || '???'}`,
            },
            {
                name: '📀 Episodes: ',
                value: ` ${anime?.episodes || '???'}`,
            },
            {
                name: '⌛️ Status: ',
                value: `${anime?.status || '???'}`,
            },
            {
                name: '🔔 Genres: ',
                value: `${
                    anime?.genres.map((item) => item.name).join(',') || '???'
                }`,
            },
            {
                name: '⏰ Duration: ',
                value: `${anime?.duration || '???'}`,
            },
            {
                name: '🗓 Airing: ',
                value: `${getAnimeAiredDate(anime)}`,
            },
            {
                name: '📊 Score: ',
                value: ` ${anime?.score || '???'}`,
            },
            {
                name: '⭐️ Rank: ',
                value: `${anime?.rank || '???'}`,
            }
        );
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
