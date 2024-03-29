const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Echo text')
        .addStringOption((option) =>
            option
                .setName('input')
                .setDescription('The input to echo back')
                .setRequired(true)
        ),
    async execute(interaction) {
        await interaction.reply(`${interaction.options.getString('input')}`);
    },
};
