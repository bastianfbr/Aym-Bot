// Quand une interaction est créé (bouton ou menu actionné)

module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction) {
        // si l'interaction est une SlashCommand
        if (interaction.isCommand()) {

            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: "T'as tout cassé je crois...", ephemeral: true });
            }

            // si l'interaction est un bouton

        } else if (interaction.isButton()) {
            // si un bouton est actionné en dehors du channel tests-bots-stage, ne rien faire
            if (interaction.channelId !== "850310846605557771") return; 
            await interaction.deferUpdate({ ephemeral: true });
            const member = interaction.member;
            // chercher le rôle correspondant au customID du bouton pour le rajouter ou le supprimer au membre
            const r = interaction.guild.roles.cache.find((r) => r.name === interaction.customId);
                if (member.roles.cache.some(role => role.id === r.id)) {
                    member.roles.remove(r.id);
                    await interaction.followUp({ content: `<a:cross:709042197697265685> Le rôle <@&${r.id}> vous a été retiré`, ephemeral: true, components: [] });
                } else {
                    member.roles.add(r.id);
                    await interaction.followUp({ content: `<a:check:709042204479324190> Le rôle <@&${r.id}> vous a été ajouté`, ephemeral: true, components: [] });
                }

            // si l'interaction est un menu

        } else if (interaction.isSelectMenu()) {
            // si un menu est utilisé en dehors du channel tests-bots-stage, ne rien faire
            if (interaction.channelId !== "850310846605557771") return;
            // chercher le rôle correspondant à la valeur du menu
            if (interaction.customId === 'niveau') {
                const r = interaction.guild.roles.cache.find((r) => r.name === interaction.values.toString());
                const member = interaction.member
                let rem = ""
                let rep = 0;
                let roles_niv = ["775340085452996618", "458346431422529547", "458346430827069450", "458346430726144010", "458346430436737055", "458346430382473217", "458347011499098132", "458347012467720194", "458347013050728448", "461226295099916289", "461226296781963274", "461226298748960818", "458347015357726731", "461616230755729418", "793128547224649738"]
                // Parcours des rôles grâce à la list roles_niv pour comprendre quel rôle retirer puis ajout du rôle cherché précédemment avec le menu
                for (let index = 0; index < roles_niv.length; index++) {
                    if (member.roles.cache.some(role => role.id === roles_niv[index])) {
                        rem = roles_niv[index];
                        member.roles.remove(rem);
                        rep = 1;
                        break;
                    }
                }
                member.roles.add(r);
                await interaction.reply({ content: `<a:check:709042204479324190> Le rôle <@&${r.id}> vous a été ajouté`, ephemeral: true, components: [] });
                if (rep !== 0) {
                    await interaction.followUp({ content: `<a:cross:709042197697265685> Le rôle<@&${rem}> vous a été retiré`, ephemeral: true, components: [] });
                }
            }
        }
    }
};