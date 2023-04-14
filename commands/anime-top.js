const { SlashCommandBuilder } = require('discord.js');
const { createMalEmbed, delay } = require('../utils');
const axios = require('axios');

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
                await interaction.followUp({ embeds: [createMalEmbed(anime)] });
                await delay(1500);
            }
        } catch (err) {
            await interaction.followUp('Something went wrong (ノ﹏ヽ)');
            console.log(err);
        }
    },
};
