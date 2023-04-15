const { Events } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const date = new Date();
        const formattedDate = moment(date).format('MMMM Do, HH:mm');

        const command = interaction.client.commands.get(
            interaction.commandName
        );

        if (!command) {
            console.error(
                `No command matching ${interaction.commandName} was found | ${interaction.guild.name} | ${formattedDate}`
            );
            return;
        }

        console.log(
            `Try execute command ${interaction.commandName} | ${interaction.guild.name} | ${formattedDate} `
        );

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(
                `Error executing ${interaction.commandName} | ${interaction.guild.name} | ${formattedDate}`
            );
            console.error(error);
        }
    },
};
