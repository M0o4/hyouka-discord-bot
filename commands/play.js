const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Echo text')
        .addStringOption((option) =>
            option
                .setName('url')
                .setDescription('The input to echo back')
                .setRequired(true)
        ),
    async execute(interaction) {
        try {
            const url = interaction.options.getString('url');
            let queue = interaction.client.player.createQueue(
                interaction.guild.id
            );
            await interaction.reply({
                content: `Loading: ${url}`,
            });
            interaction.client.queue = queue;
            await queue.join(interaction.member.voice.channel);
            await queue.play(url);
        } catch (err) {
            console.log(err);
        }
    },
};
