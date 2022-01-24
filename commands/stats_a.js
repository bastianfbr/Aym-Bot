const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

// Commande de stats qui donne les stats en fonction des rôles de niveaux ou de matières
module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('En construction')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Le type de stats')
                .setRequired(true)
                .addChoice('matieres', 'matieres')
                .addChoice('niveau', 'niveau')),
    async execute(interaction) {
        const string = interaction.options.getString('type');
        const guild = interaction.guild;
        let rolem_list = ["468813265347149826", "908367905522073641", "908367613200056330", "908368767266988073", "777147301290049536", "908368949421416518", "554752144507535370", "908369345426645062", "554752141521059841", "829316900013342771", "554756261485215783", "908369234596347914", "554752142229897226", "908363619262165064", "554752141831438336"]
        let rolen_list = ["775340085452996618", "458346431422529547", "458346430827069450", "458346430726144010", "458346430436737055", "458346430382473217", "458347011499098132", "458347012467720194", "458347013050728448", "461226295099916289", "461226296781963274", "461226298748960818", "458347015357726731", "461616230755729418", "793128547224649738"]
        let emojim_list = ["<:peepoLeveLaMain:700411485448437811>", "🇩🇪", "🇺🇸", "🇸🇦", "🎨", "🇰🇷", "📈", "🇪🇸", "📚", "🏰", "💻", "🇯🇵", "📐", "📜", "🔬" ]
        let emojin_list = ['📗', '📙', '📕', '🥈', '🥇', '📚', '📰', '📄', '📃', '🏚️', '🏠', '🏡', '🖼️', '💻', '🚩']
        const ListEmbed = new MessageEmbed()
            .setTitle(`Stats du serveur (${guild.memberCount} membres)`)
            .setColor("3983BC")
        let role_perc = 0;
        let role_count = "";
        await interaction.deferReply({ content: 'Voici les stats !', ephemeral: false, embeds: [ListEmbed] });
        let emoji = 0;
        let role_choice = [];
        let emoji_choice = [];
        if (string === "matieres") {
            role_choice = rolem_list;
            emoji_choice = emojim_list;
        } else {
            role_choice = rolen_list;
            emoji_choice = emojin_list;
        }
        role_choice.forEach(r => {
            let memberCount = 0;
            guild.members.fetch()
                .then(function (response) {
                    memberCount = guild.roles.cache.get(r).members
                    role_perc = (Math.round((memberCount.size * 10000) / guild.memberCount) / 100).toString() + " %)"
                    role_count = memberCount.size.toString() + " membres" + " (" + role_perc
                    ListEmbed.addFields(
                        { name: guild.roles.cache.get(r).name, value: emoji_choice[emoji] + " " + role_count, inline: true},
                    )
                    emoji = emoji + 1
                    interaction.editReply({ content: 'Voici les stats !', ephemeral: false, embeds: [ListEmbed] });
                })
                .catch(console.error)
            }
            );
    }
};