const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

// Application d'un menu en commande
module.exports = {
    data: new SlashCommandBuilder()
        .setName('menu')
        .setDescription("fais des menus (pas de resto hein)"),
    async execute(interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('niveau')
                    .setPlaceholder('Choisis ton rôle de niveau')
                    .addOptions([
                        {
                            label: 'Rôle 5ème',
                            description: 'Tu es en 5ème ?',
                            value: '5eme',
                            emoji: '📗'
                        },
                        {
                            label: 'Rôle 4ème',
                            description: 'Tu es en 4ème ?',
                            value: '4eme',
                            emoji: '📙'
                        },
                        {
                            label: 'Rôle 3ème',
                            description: 'Tu es en 3ème ?',
                            value: '3eme',
                            emoji: '📕'
                        },
                        {
                            label: 'Rôle Seconde Générale et Technologique',
                            description: 'Tu es en Seconde Générale et Technologique ?',
                            value: '2ndeGT',
                            emoji: '🥈'
                        },
                        {
                            label: 'Rôle Première Générale et Technologique',
                            description: 'Tu es en Première Générale et Technologique ?',
                            value: '1GT',
                            emoji: '🥇'
                        },
                        {
                            label: 'Rôle Terminale Générale et Technologique',
                            description: 'Tu es en Terminale Générale et Technologique ?',
                            value: 'TGT',
                            emoji: '📚'
                        },
                        {
                            label: 'Rôle Seconde Professionnelle',
                            description: 'Tu es en Seconde Professionnelle ?',
                            value: '2P',
                            emoji: '📰'
                        },
                        {
                            label: 'Rôle Première Professionnelle',
                            description: 'Tu es en Première Professionnelle ?',
                            value: '1P',
                            emoji: '📄'
                        },
                        {
                            label: 'Rôle Terminale Professionnelle',
                            description: 'Tu es en Terminale Professionnelle ?',
                            value: 'TP',
                            emoji: '📃'
                        },
                        {
                            label: 'Rôle Seconde Agricole',
                            description: 'Tu es en Seconde Agricole ?',
                            value: '2A',
                            emoji: '🏚️'
                        },
                        {
                            label: 'Rôle Première Agricole',
                            description: 'Tu es en Première Agricole ?',
                            value: '1A',
                            emoji: '🏠'
                        },
                        {
                            label: 'Rôle Terminale Agricole',
                            description: 'Tu es en Terminale Agricole ?',
                            value: 'TA',
                            emoji: '🏡'
                        },
                        {
                            label: 'Rôle Université ou Ecoles Supérieures',
                            description: 'Tu es en Université ou Ecoles Supérieures ?',
                            value: 'UES',
                            emoji: '🖼️'
                        },
                        {
                            label: 'Rôle Monde professionnel',
                            description: 'Tu es dans le Monde professionnel ?',
                            value: 'MP',
                            emoji: '💻'
                        },
                    ]),
            );

        await interaction.reply({content: "TEXT", components: [row] });
    },
}