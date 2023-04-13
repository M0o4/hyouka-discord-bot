const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('anime_pic')
        .setDescription('Get random sfw anime pic'),
    async execute(interaction) {
        try {
            await interaction.reply(`Please, wait ღゝ◡╹ )ノ♡`);
            const res = await axios.get('https://api.waifu.pics/endpoints');
            const categories = res?.data?.sfw;

            if (!categories) {
                await interaction.followUp('Something went wrong (ノ﹏ヽ)');
                return;
            }

            const category =
                categories[Math.floor(Math.random() * categories.length)];
            const picRes = await axios.get(
                `https://api.waifu.pics/sfw/${category}`
            );
            const picUrl = picRes?.data?.url;

            if (!picUrl) {
                await interaction.followUp('Something went wrong (ノ﹏ヽ)');
                return;
            }

            await interaction.followUp(picUrl);
        } catch (err) {
            await interaction.followUp('Something went wrong (ノ﹏ヽ)');
        }
    },
};
