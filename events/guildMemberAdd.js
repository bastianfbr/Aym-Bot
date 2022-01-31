// Quand un membre rejoint le serveur --> message

module.exports = {
    name: 'guildMemberAdd',
    once: true,
    execute(member) {
        const channel = member.client.channels.cache.get("936928080012906566");
        channel.send(`Bienvenue ${member}, je t'invite à lire le <#936928080012906565>, et à choisir des rôles correspondant à ton niveau scolaire dans <#936928080193265698> afin de voir la totalité du serveur 😉 !`)
        }
};