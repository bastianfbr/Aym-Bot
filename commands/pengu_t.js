const { SlashCommandBuilder } = require('@discordjs/builders');

// Simple commande pour tester les réponses d'interactions
module.exports = {
    data: new SlashCommandBuilder()
        .setName('pengu')
        .setDescription('appelle Pengu le pingouin'),
    async execute(interaction) {
        await interaction.reply('<@695597395949518848> :penguin: , on a besoin de toi !');
    },
};