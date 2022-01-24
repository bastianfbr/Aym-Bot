const { SlashCommandBuilder } = require('@discordjs/builders');
let moment = require("moment");
const fs = require("fs");
const { MongoClient } = require("mongodb");
const { mongo } = require('../config.json');
const client_db = new MongoClient(mongo);

// Tests d'écriture et de lecture avec MongoDB
module.exports = {
    data: new SlashCommandBuilder()
        .setName('mongo')
        .setDescription('mongo_test'),
    async execute(interaction) {

        // Connexion à la DB

        await client_db.connect();
        console.log("Connecté au serveur MongoDB");

        // Selection de la Db et de la collection
        const dbName = "rolesDB"
        const db = await client_db.db(dbName);
        const col = await db.collection("niveau");

        // Ecriture dans la DB d'un test

        /* Insertion des matières
        col.insertMany([
            { mat: "allemand", id: "908367905522073641" },
            { mat: "anglais", id: "908367613200056330" },
            { mat: "arabe", id: "908368767266988073" },
            { mat: "arts", id: "777147301290049536" },
            { mat: "coréen", id: "908368949421416518" },
            { mat: "eco-so", id: "554752144507535370" },
            { mat: "espagnol", id: "908369345426645062" },
            { mat: "français-sc", id: "554752141521059841" },
            { mat: "hist-geo-emc", id: "829316900013342771" },
            { mat: "informatique", id: "554756261485215783" },
            { mat: "japonais", id: "908369234596347914" },
            { mat: "mathématiques", id: "554752142229897226" },
            { mat: "philosophie", id: "908363619262165064" },
            { mat: "sciences", id: "554752141831438336" },
        ]); */

        /* // Insertion des niveau
        col.insertMany([
            { niv: "5eme", id: "775340085452996618" },
            { niv: "4eme", id: "458346431422529547" },
            { niv: "3eme", id: "458346430827069450" },
            { niv: "2GT", id: "458346430726144010" },
            { niv: "1GT", id: "458346430436737055" },
            { niv: "TGT", id: "458346430382473217" },
            { niv: "2P", id: "458347011499098132" },
            { niv: "1P", id: "458347012467720194" },
            { niv: "TP", id: "458347013050728448" },
            { niv: "2A", id: "461226295099916289" },
            { niv: "1A", id: "461226296781963274" },
            { niv: "TA", id: "461226298748960818" },
            { niv: "UES", id: "458347015357726731" },
            { niv: "MP", id: "461616230755729418" },
            { niv: "syst-etr", id: "793128547224649738" },
        ]); */
        // vider la colection await col.deleteMany({});
        let niv = "syst-etr"
        const myDoc = await col.findOne({
            niv: niv
        });
        console.log(myDoc);
        await interaction.reply({ content: `Yop' ${interaction.member}, regarde : <@&${myDoc.id}>` });
    },
};