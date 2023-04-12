const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

function createEmbed(anime) {
    return new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(`${anime.title || anime.id}`)
        .setURL(`${anime.url || ''}`)
        .setDescription(`Last episode: ${anime.episodeNumber || '??'}`)
        .setImage(`${anime.image || ''}`);
}

function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('anime_recent')
        .setDescription('Recent anime episodes'),
    async execute(interaction) {
        try {
            await interaction.reply(`Please, wait ღゝ◡╹ )ノ♡`);
            const res = await axios.get(
                `https://api.consumet.org/anime/gogoanime/recent-episodes`
            );
            if (!res?.data?.results) {
                await interaction.reply('Something went wrong (ノ﹏ヽ)');
            }
            const animes = res.data.results;
            for (let anime of animes) {
                await interaction.followUp({ embeds: [createEmbed(anime)] });
                await delay(1000);
            }
        } catch (err) {
            console.log(err);
        }
    },
};
