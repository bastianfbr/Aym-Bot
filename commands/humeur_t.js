const { SlashCommandBuilder } = require('@discordjs/builders');

// Premier test avec les options de SlashCommands
module.exports = {
    data: new SlashCommandBuilder()
        .setName('humeur')
        .setDescription("dis ton humeur du jour")
        .addStringOption(option =>
            option.setName('humeur')
                .setDescription('Ton humeur')
                .setRequired(true)
                .addChoice('content', 'contente')
                .addChoice('triste', 'triste')),
    async execute(interaction) {
        const string = interaction.options.getString('humeur');
        await interaction.reply("Cette personne est " + string);
    },
};