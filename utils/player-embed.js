const { EmbedBuilder } = require('discord.js');

exports.createPlayerEmbed = function createEmbed(song) {
    return new EmbedBuilder()
        .setColor(0xff007b)
        .setTitle(`${song.name || '???'}`)
        .setURL(`${song.url || 'none'}`)
        .setAuthor({ name: `${song.author || '???'}` })
        .setDescription(`Duration: ${song.duration || '???'}`)
        .setImage(`${song.thumbnail || ''}`);
};
