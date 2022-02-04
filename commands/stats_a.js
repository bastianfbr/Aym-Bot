const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

// Commande de stats qui donne les stats en fonction des rôles de niveaux ou de matières
module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('envoie les stats des membres du serveur')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Le type de stats')
                .setRequired(true)
                .addChoice('matieres', 'matieres')
                .addChoice('niveaux', 'niveaux')),
    async execute(interaction) {
        const string = interaction.options.getString('type');
        const guild = interaction.guild;
        let rolem_list = ["936928079870324785", "936928079870324782", "936928079870324781", "936928079870324780", "936928079870324779", "936928079870324778", "936928079870324777", "936928079870324776", "936928079840968723", "936928079840968722", "936928079840968721", "936928079840968720", "936928079840968719", "936928079840968718", "936928079840968717"]
        let rolen_list = ["936928079899668484", "936928079899668485", "936928079899668486", "936928079929024516", "936928079929024517", "936928079929024518", "936928079929024513", "936928079929024514", "936928079929024515", "936928079899668487", "936928079899668488", "936928079899668489", "936928079929024519", "936928079929024520", "936928079929024521"]
        let emojim_list = ["<:peepoLeveLaMain:937409115553169429>", "🇩🇪", "🇺🇸", "🇸🇦", "🎨", "🇰🇷", "📈", "🇪🇸", "📚", "🏰", "💻", "🇯🇵", "📐", "📜", "🔬" ]
        let emojin_list = ['📗', '📙', '📕', '🥈', '🥇', '📚', '📰', '📄', '📃', '🏚️', '🏠', '🏡', '🖼️', '💻', '🚩']
        let bot_map = [];
        let bot_map_size = 0;
        const ListEmbed = new MessageEmbed()
        .setColor("3983BC")
        guild.members.fetch()
        .then(member => {
            bot_map = member.map(m => m.user.bot);
            bot_map_size = bot_map.filter(m => m === true).length;
            ListEmbed.setTitle(`Stats du serveur (${guild.memberCount - bot_map_size} membres et ${bot_map_size} bots)`)
        })
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