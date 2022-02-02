const { SlashCommandBuilder } = require('@discordjs/builders');
let moment = require("moment");
const fs = require("fs");
const { MongoClient } = require("mongodb");
const { mongo } = require('../config.json');
const client_db = new MongoClient(mongo);

// Mettre un membre en test
module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('met un membre en test')
        .addUserOption(option =>
            option.setName('membre')
                .setDescription('Le membre à mettre en test')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('role')
                .setDescription("Le rôle de test")
                .setRequired(true)
                .addChoice('référent', 'référents') 
                .addChoice('modérateur', 'modérateurs')),
    async execute(interaction) {
        // Connexion à la DB
        const role = interaction.options.getString('role');
        await client_db.connect();
        console.log("Connecté au serveur MongoDB");

        // Selection de la Db et de la collection
        const dbName = "staffDB";
        const db = await client_db.db(dbName);
        const col = await db.collection("test");

        moment.locale("fr");

        const member = interaction.options.getMember('membre');
        console.log(member);
        // await interaction.reply(`${(moment().format('LT'))}`);
        let date_now = moment();
        let date_after = date_now.clone().add(15, 'day').format('L');
        let date_after_1 = date_now.clone().add(16, 'day').format('L');
        
        let date_test = date_now.clone().format('L');
        console.log(moment().clone().format('L') === date_test);
        console.log(moment().clone().format('L') === date_after);
        // Ecriture dans la DB
        
        col.insertOne({
            id: member.id,
            date: date_now
        })

        await interaction.reply({ content: `${member} est maintenant en test jusqu'au ${date_after}`});
        await interaction.followUp({ content: `Le rappel se fera donc le ${date_after_1}`});
        let role_act = "";
        member.send(`<a:blob_happy:856458298307510291> Bienvenue ${member}, tu es maintenant en période de test dans l'Association Aym'aide !  📨 Voici le guide des ${role} :
 *Si vous avez des questions, n'hésitez pas à contacter un membre du bureau. Votre phase de test commence dès réception de ce guide.*`);
        if (role === "référents") {
            member.send({
            files: [{
                attachment: "C:/Users/basti/Downloads/BTS_SIO_LV2.pdf",
                name: 'ref.pdf',
                description: 'test'
            }]
        })
        } else {
            member.send({
            files: [{
                attachment: "C:/Users/basti/Downloads/BTS_SIO_LV2.pdf",
                name: 'mod.pdf',
                description: 'test'
            }]
        })
        }
    },
};