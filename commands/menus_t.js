const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

// Premier test d'un menu avec les valeurs
module.exports = {
    data: new SlashCommandBuilder()
        .setName('menus')
        .setDescription("Affiche un menu"),
    async execute(interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('select')
                    .setPlaceholder('Nothing selected')
                    .addOptions([
                        {
                            label: 'Select me',
                            description: 'This is a description',
                            value: 'first_option',
                        },
                        {
                            label: 'You can select me too',
                            description: 'This is also a description',
                            value: 'second_option',
                        },
                    ]),
            );

        const collector = interaction.channel.createMessageComponentCollector({ time: 15000 });
        collector.on('collect', async i => {
            if (i.customId === 'select') {

                await i.reply({ content: 'Tu as choisis quelque chose là !', ephemeral: true, components: [] });
            }
        });
        await interaction.reply({ content: 'Pouf !', ephemeral: true, components: [row] });
    }
};