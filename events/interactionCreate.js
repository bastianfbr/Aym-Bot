// Quand une interaction est créé (bouton ou menu actionné)

module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction) {
        // si l'interaction est une SlashCommand
        if (interaction.isCommand()) {

            const command = interaction.client.commands.get(interaction.commandName);
            let cmd_mod = ["mod"];
            // si c'est une commande de modération et que le membre n'a pas les perms de gestion de rôles (modos)
            if ((command.data.name === "mod") && (!interaction.memberPermissions.has("MANAGE_ROLES"))) {
                await interaction.reply({ content: "Tu n'es pas un modérateur, fais pas n'importe quoi !", ephemeral: true });
                return;
            }

            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: "T'as tout cassé je crois...", ephemeral: true });
            }

            // si l'interaction est un bouton

        } else if (interaction.isButton()) {
            // si un bouton est actionné ailleurs que dans #obtenir-un-role, faire...
            if (interaction.channelId !== "936928080193265698") return; 
            await interaction.deferUpdate({ ephemeral: true });
            const member = interaction.member;
            // chercher le rôle correspondant au customID du bouton pour le rajouter ou le supprimer au membre
            const r = interaction.guild.roles.cache.find((r) => r.name === interaction.customId);
                if (member.roles.cache.some(role => role.id === r.id)) {
                    member.roles.remove(r.id);
                    await interaction.followUp({ content: `<a:cross:937407398119899187> Le rôle <@&${r.id}> vous a été retiré`, ephemeral: true, components: [] });
                } else {
                    member.roles.add(r.id);
                    await interaction.followUp({ content: `<a:check:937407397050335272> Le rôle <@&${r.id}> vous a été ajouté`, ephemeral: true, components: [] });
                }

            // si l'interaction est un menu

        } else if (interaction.isSelectMenu()) {
            // si un menu est utilisé en dehors du channel tests-bots-stage, ne rien faire
            if (interaction.channelId !== "936928080193265698") return;
            // chercher le rôle correspondant à la valeur du menu
            if (interaction.customId === 'niveau') {
                const r = interaction.guild.roles.cache.find((r) => r.name === interaction.values.toString());
                const member = interaction.member
                let rem = ""
                let rep = 0;
                let roles_niv = ["936928079899668484", "936928079899668485", "936928079899668486", "936928079929024516", "936928079929024517", "936928079929024518", "936928079929024513", "936928079929024514", "936928079929024515", "936928079899668487", "936928079899668488", "936928079899668489", "936928079929024519", "936928079929024520", "936928079929024521"]
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
                await interaction.reply({ content: `<a:check:937407397050335272> Le rôle <@&${r.id}> vous a été ajouté`, ephemeral: true, components: [] });
                if (rep !== 0) {
                    await interaction.followUp({ content: `<a:cross:937407398119899187> Le rôle<@&${rem}> vous a été retiré`, ephemeral: true, components: [] });
                }
            }
        }
    }
};