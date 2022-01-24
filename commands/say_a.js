const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton} = require('discord.js');

// Application du système de valeurs et de boutons de confirmation ou annulation
module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription("fais parler Aym'bot")
        .addStringOption(option =>
            option.setName('input')
                .setDescription('Ce que le bot va répéter')
                .setRequired(true)),
    async execute(interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('CONFIRMER')
                    .setLabel('CONFIRMER')
                    .setStyle('SUCCESS')
                    .setEmoji('✅'),
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('ANNULER')
                    .setLabel('ANNULER')
                    .setStyle('DANGER')
                    .setEmoji('❌'),
            );
        const string = interaction.options.getString('input');
        await interaction.reply({ content: `Je dois répéter ça : ${string}`, ephemeral: true, components: [row] });

        const collector = interaction.channel.createMessageComponentCollector({ time: 15000 });
        collector.on('collect', async i => {
            if (i.customId === 'CONFIRMER') {
                await interaction.followUp(string);
            } else if (i.customId === "ANNULER") {
                await interaction.followUp({ content: `Bon ben au revoir...`, ephemeral: true});
            }
            await interaction.editReply({ content: 'Commande terminée', components: []});;
        });

    },
};