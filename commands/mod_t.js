const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { MongoClient } = require("mongodb");
const { mongo } = require('../config.json');
let moment = require("moment")
const client_db = new MongoClient(mongo);

// Premier test avec les options de SlashCommands
module.exports = {
    data: new SlashCommandBuilder()
        .setName('mod')
        .setDescription("fais des commandes de modération")
        .addSubcommand(subcommand =>
		subcommand
			.setName('command')
			.setDescription('fais des actions de modération')
            .addStringOption(option =>
            option.setName('action')
                .setDescription("L'action de modération")
                .setRequired(true)
                .addChoice('ban', 'ban') 
                .addChoice('mute', 'mute')
                .addChoice('warn', 'warn'))
            .addUserOption(option =>
            option.setName('membre')
                .setDescription("Le membre à qui faire l'action")
                .setRequired(true))
            .addStringOption(option =>
            option.setName('raison')
                .setDescription('La raison de cette action')
                .setRequired(true)))
        .addSubcommand(subcommand =>
        subcommand
            .setName('list')
            .setDescription('regarde la liste des sanctions')),
    async execute(interaction) {
        // Connexion à la DB

        await client_db.connect();
        console.log("Connecté au serveur MongoDB");
        await interaction.deferReply({});
        // Selection de la Db et de la collection
        const dbName = "warnDB"
        const db = await client_db.db(dbName);
        const col = await db.collection("test");

        if (interaction.options.getSubcommand() === 'command') {
        const action = interaction.options.getString('action');
        const membre = interaction.options.getMember('membre');
        const raison = interaction.options.getString('raison');
        const action_embed = new MessageEmbed()
            .setTitle(`Nouvelle action`)
            .setColor("3983BC")
            .setThumbnail(membre.user.avatarURL())
            .setTimestamp()
            .setFooter({text: `Initié par ${interaction.member.user.username}`, iconURL: interaction.member.user.avatarURL()})
            .addFields(
                {name: "Action", value: action, inline: true},
                {name: "Membre", value: membre.toString(), inline: true},
                {name: "Raison", value: raison, inline: false}
            )
        switch (action) {
            case "ban":
                console.log("bannnnnnnnnn");
                col.insertOne({user: membre.id, action: action, date: moment().format('L'), text: raison});
                // membre.ban();
                break;
        
            case "mute":
                col.insertOne({user: membre.id, action: action, date: moment().format('L'), text: raison});
                console.log("muuuuuuuuute");
                break;
            
            case "warn":
                moment.locale("fr");
                col.insertOne({user: membre.id, action: action, date: moment().format('L'), text: raison});
                console.log("waaaaaaaaarn");
        }
        console.log(membre.user.id);
        await interaction.editReply({content : `Action réalisée\nSanction enregistrée dans <#937311942702428200>`, embeds: [action_embed]});
        const arc_channel = interaction.client.channels.cache.find(x => x.id === "937311942702428200");
        arc_channel.setArchived(false);
        arc_channel.send({content: " ", embeds: [action_embed]});
    } else {
        let page = 1;
        let array = await col.find({}).toArray();
        let list_embed = new MessageEmbed()
            .setTitle(`Liste des sanctions`)
            .setColor("3983BC")
            .setTimestamp()
            .setFooter({text: `Initié par ${interaction.member.user.username}`, iconURL: interaction.member.user.avatarURL()})
        const buttons = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('NEXT')
                    .setLabel('Suivant')
                    .setStyle('PRIMARY')
                    .setEmoji('➡️')
            )
            // let array_2 = array;
        array.forEach(r => {
            // si il y a moins de 24 fields, en ajouter 3
            if (Object.keys(list_embed.fields).length < 24) {
                list_embed.addFields(
                {name: `Utilisateur (${r.action})`, value: "<@" + r.user + ">", inline:true},
                {name: "Date", value: r.date, inline: true},
                {name: `Raison de ${r.action}`, value: r.text, inline: true},
            )
                interaction.editReply({content: `Voici la page ${page} ${interaction.member.toString()}`, embeds: [list_embed]});
            } else {
                interaction.editReply({content: `Voici la page ${page} ${interaction.member.toString()}`, embeds: [list_embed], components: [buttons]});
                return;
            }
            // console.log(Object.keys(list_embed.fields).length);
            // array_2 = array_2.splice(0,24);
            // console.log(r);
        });

        const collector = interaction.channel.createMessageComponentCollector({});
        let bool = true;
        collector.on('collect', async i => {
            let list_embed = new MessageEmbed()
            .setTitle(`Liste des sanctions`)
            .setColor("3983BC")
            .setTimestamp()
            .setFooter({text: `Initié par ${interaction.member.user.username}`, iconURL: interaction.member.user.avatarURL()})
            console.log(i.customId);
            if (i.customId === 'NEXT') {
            console.log(array.length);
            array = array.splice(9, array.length)
            console.log(array.length);
            array.forEach(r => {
            if (Object.keys(list_embed.fields).length < 24) {
                list_embed.addFields(
                {name: "Utilisateur", value: "<@" + r.user + ">", inline:true},
                {name: "Date", value: r.date, inline: true},
                {name: "Raison", value: r.text, inline: true}
            )
            }
        });
            if (Object.keys(list_embed.fields).length !== 0){
                page = page + 1;
                list_embed.setFooter({text: `Page ${page}`, iconURL: interaction.member.user.avatarURL()});
                interaction.editReply({content: `Voici la page ${page} ${interaction.member.toString()}`, ephemeral: true, embeds: [list_embed], components: [buttons]});
                if (bool === false) {
                    i.deferReply({content: "Chargement", ephemeral: true});
                    bool = true;
                }
            } else {
                i.reply({content: "Fin de la liste des sanctions", ephemeral: true});
            }
        }
    });
        /*console.log(col.find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result.map(result => result.user));
            console.log(result.map(result => result.date));
            console.log(result.map(result => result.text));
        })); */
    }
    },
}