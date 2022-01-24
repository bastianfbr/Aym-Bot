// Quand un membre rejoint le serveur --> message

module.exports = {
    name: 'guildMemberAdd',
    once: true,
    execute(member) {
        const channel = member.client.channels.cache.get("408260125476782103");
        channel.send(`Bienvenue ${member}, je t'invite à lire le <#408260691779125258>, et à choisir des rôles correspondant à ton niveau scolaire dans <#459676034988638208> afin de voir la totalité du serveur 😉 !`)
        }
};