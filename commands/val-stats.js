const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

function createEmbed(player, kda) {
    return new EmbedBuilder()
        .setColor(0xfa4141)
        .setTitle(`${player.name}#${player.tag}`)
        .setDescription('Competitive statistics')
        .addFields({ name: 'KDA', value: kda.toFixed(2) })
        .setImage(`${player.card.wide}`);
}

function calculateKDA(games) {
    const kills = games.reduce(
        (accumulator, currentValue) => accumulator + currentValue.stats.kills,
        0
    );
    const deaths = games.reduce(
        (accumulator, currentValue) => accumulator + currentValue.stats.deaths,
        0
    );
    const assists = games.reduce(
        (accumulator, currentValue) => accumulator + currentValue.stats.assists,
        0
    );

    return (kills + assists) / deaths;
}

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
        ),

    async execute(interaction) {
        try {
            const name = interaction.options.getString('name');
            const tag = interaction.options.getString('tag');
            await interaction.reply(`Please, wait ღゝ◡╹ )ノ♡`);
            const playerRes = await axios.get(
                `https://api.henrikdev.xyz/valorant/v1/account/${name}/${tag}`
            );
            const player = playerRes?.data?.data;
            if (!player) {
                await interaction.reply(
                    `There is no player ${name}#${tag} (ノ﹏ヽ)`
                );
                return;
            }

            const res = await axios.get(
                `https://api.henrikdev.xyz/valorant/v3/matches/${player.region}/${name}/${player.tag}`
            );
            const data = res?.data?.data;
            if (!data) {
                await interaction.reply('Something went wrong (ノ﹏ヽ)');
            }

            const games = data.map((item) =>
                item.players.all_players.find(
                    (element) => element.name === player.name
                )
            );

            await interaction.followUp({
                embeds: [createEmbed(player, calculateKDA(games))],
            });
        } catch (err) {
            await interaction.followUp(`Something went wrong (ᗒᗣᗕ)՞`);
        }
    },
};
