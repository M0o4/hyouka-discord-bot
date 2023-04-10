const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('evgen')
        .setDescription('Женя заткнись'),
    async execute(interaction) {
        await interaction.reply('Женя заткнись!');
    },
};
