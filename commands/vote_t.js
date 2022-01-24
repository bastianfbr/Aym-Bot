const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');
const { MongoClient } = require("mongodb");
const { mongo } = require('../config.json');
const client_db = new MongoClient(mongo);
const forge  = require('node-forge');

// Création d'un vote (sondage) et interactions
module.exports = {
    data: new SlashCommandBuilder()
        .setName('vote')
        .setDescription("crée un vote")
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Le type de sondage')
                .addChoice('Vote Borda', 'vote_borda')
                .addChoice('Vote Majorité', 'vote_majorite'))
        .addStringOption(option =>
            option.setName('question')
                .setDescription("Question du sondage"))
        .addStringOption(option =>
            option.setName('choix1')
                .setDescription("Choix numéro 1"))
        .addStringOption(option =>
            option.setName('choix2')
                .setDescription("Choix numéro 2"))
        .addStringOption(option =>
            option.setName('choix3')
                .setDescription("Choix numéro 3"))
        .addStringOption(option =>
            option.setName('choix4')
                .setDescription("Choix numéro 4"))
        .addStringOption(option =>
            option.setName('choix5')
                .setDescription("Choix numéro 5")),
    async execute(interaction) {
        // Connexion à la DB

        await client_db.connect();
        console.log("Connecté au serveur MongoDB");

        // const type = interaction.options.getString('type');

        const question = interaction.options.getString('question');
        const choix1 = interaction.options.getString('choix1');
        const choix2 = interaction.options.getString('choix2');
        const choix3 = interaction.options.getString('choix3');
        const choix4 = interaction.options.getString('choix4');
        const choix5 = interaction.options.getString('choix5');
        const type = interaction.options.getString('type');
        let liste_choix = [choix1, choix2, choix3, choix4, choix5];
        let emoji_choix = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"]

        if (type === "vote_majorite") {
            liste_choix = ["Pour", "Contre", "Abstention", "Ne prend pas part au vote"];
            emoji_choix = ["✅", "❌", "⬜", "🏳️"]
        }

        // Selection de la Db et de la collection
        const dbName = "sondageDB"
        const db = await client_db.db(dbName);
        let db_question = forge.md.md5.create();
        db_question.update(question); 
        const db_col = db_question.digest().toHex();
        await db.createCollection(db_col);
        const col = await db.collection(db_col);

        const embedChoix = new MessageEmbed()
            .setTitle(`${question}`)
            .setColor("3983BC")
        const embedTotal = new MessageEmbed()
            .setTitle(`Résultats du sondage :`)
            .setColor("43B581")
        const row = new MessageActionRow()
        let total = [];
        for (let index = 0; index < liste_choix.length; index++) {
            if (liste_choix[index] !== null) {
                total.push(0);
                embedChoix.addFields({ name: `Choix ${emoji_choix[index]}`, value: liste_choix[index], inline: true});
                embedTotal.addFields({ name: liste_choix[index], value: total[index].toString() + " votes", inline: true });
                
                row.addComponents(
                    new MessageButton()
                    .setCustomId((index + 1).toString())
                    .setLabel(`Choix ${index + 1}`)
                    .setStyle('PRIMARY')
                    .setEmoji(emoji_choix[index])
                )
            } else {
                index = liste_choix.length;
            }
        }
        await interaction.reply({ content: `:up: Nouveau sondage !`, ephemeral: false, embeds: [embedChoix, embedTotal], components: [row]})
        let vote = 0;
        const collector = interaction.channel.createMessageComponentCollector({});
        collector.on('collect', async i => {
            /*
            const myDoc = await col.findOne({
                id: interaction.user.id
            });*/
            await i.deferReply({ ephemeral: true });
      //      if (myDoc === null && myDoc.id === null) {
            let verif_col = (await col.find({ id: i.user.id }).count()).toString() === "0";
            console.log((await col.find({ id: i.user.id }).count()).toString());
            console.log(` Est-ce qu'il n'a pas voté ? : ${verif_col}`);
            console.log(` Interaction bouton :  ${i.user.id}`);
            if (verif_col) {
                col.insertOne({
                    id: i.user.id
                })
                let embedChoix_2 = new MessageEmbed()
                    .setTitle(`${question}`)
                    .setColor("3983BC")
                let embedTotal_2 = new MessageEmbed()
                    .setTitle(`Résultat du sondage :`)
                    .setColor("43B581")
                for (let index = 0; index < liste_choix.length; index++) {
                    if (liste_choix[index] !== null) {
                        if (index === parseInt(i.customId) - 1) {
                            total[index] = total[index] + 1;
                        }
                        embedChoix_2.addFields({ name: `Choix ${emoji_choix[index]}`, value: liste_choix[index], inline: true });
                        embedTotal_2.addFields({ name: liste_choix[index], value: total[index].toString() + " votes", inline: true });
                    } else {
                        index = liste_choix.length;
                    }
                }
                vote = vote + 1;
                await interaction.editReply({ content: `:up: Nouveau sondage ! ${vote} voix`, embeds: [embedChoix_2, embedTotal_2], components: [row] });
                await i.followUp({ content: `Tu as voté pour le choix numéro ${i.customId}`, ephemeral: true, components: [] });
            } else {
                await i.followUp({ content: `Tu as déjà voté !`, ephemeral: true});
            }
}); 
    },
};