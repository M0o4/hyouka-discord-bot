const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('val_stats')
        .setDescription('Your valorant statistics')
        .addStringOption((option) =>
            option
                .setName('name')
                .setDescription('You account name, like "xShodi"')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName('tag')
                .setDescription('You account tag, like "2312"')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName('region')
                .setDescription('You account region, like "eu"')
                .setRequired(true)
        ),

    async execute(interaction) {
        try {
            const name = interaction.options.getString('name');
            const tag = interaction.options.getString('tag');
            const region = interaction.options
                .getString('region')
                ?.toLowerCase();
            await interaction.reply(`Please, wait ღゝ◡╹ )ノ♡`);
            const res = await axios.get(
                `https://api.henrikdev.xyz/valorant/v3/matches/${region}/${name}/${tag}`
            );
            console.log(res.data.data);
            // if (!res?.data?.results) {
            //     await interaction.reply('Something went wrong (ノ﹏ヽ)');
            // }
        } catch (err) {
            console.log(err);
        }
    },
};
