const { SlashCommandBuilder } = require('discord.js');
const { createMalEmbed } = require('../../utils');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('anime_rand')
        .setDescription('Get random anime'),
    async execute(interaction) {
        try {
            await interaction.reply(`Please, wait ღゝ◡╹ )ノ♡`);
            const res = await axios.get(
                `https://api.jikan.moe/v4/random/anime`
            );
            const anime = res?.data?.data;
            if (!anime) {
                await interaction.followUp('Something went wrong (ノ﹏ヽ)');
                return;
            }

            await interaction.followUp({ embeds: [createMalEmbed(anime)] });
        } catch (err) {
            await interaction.followUp('Something went wrong (ノ﹏ヽ)');
            console.log(err);
        }
    },
};
