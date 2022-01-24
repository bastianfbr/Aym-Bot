const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton} = require('discord.js');

// pour faire un test de tout les boutons possibles (tout les styles) et petit template
module.exports = {
    data: new SlashCommandBuilder()
        .setName('bouton')
        .setDescription("Envoie un bouton"),
    async execute(interaction, message, client) {
        const role_arts = "885590807762055168";
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('dd')
                    .setLabel('Rôle Arts')
                    .setStyle('PRIMARY')
                    .setEmoji('🎨')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('SECONDARY')
                    .setLabel('SECONDARY')
                    .setStyle('SECONDARY')
                    .setEmoji('👀'),
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('SUCCESS')
                    .setLabel('SUCCESS')
                    .setStyle('SUCCESS'),
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('DANGER')
                    .setLabel('DANGER')
                    .setStyle('DANGER'),
            )
            .addComponents(
                new MessageButton()
                    .setLabel('LINK')
                    .setStyle('LINK')
                    .setURL("https://www.aymaide.fr/")
            );
    
        await interaction.reply({ content: 'Voici les boutons !', ephemeral: false, components: [row] });
    },
};