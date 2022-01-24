// Quand un membre a des informations modifiées --> ici rôle Modérateur et Référent

module.exports = {
    name: 'guildMemberUpdate',
    once: true,
    execute(oldMember, newMember) {
            const stage_channel = oldMember.client.channels.cache.get("919682923991547904");
            const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
            if (addedRoles.size > 0) {
                let add_name_role = addedRoles.map(r => r.name)
                if ((add_name_role == "6ème") || (add_name_role == "5ème")) {
                    stage_channel.send(`Salut ${add_name_role}`);
                }
            }
        }
    };