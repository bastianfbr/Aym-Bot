// Quand le bot est connecté --> prêt
let moment = require("moment");
const { MongoClient } = require("mongodb");
const { mongo, ready } = require('../config.json');
const client_db = new MongoClient(mongo);

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        await client_db.connect();
        console.log("Connecté au serveur MongoDB");
        const bots = client.channels.cache.get("936928080444932165");
        const recrutements = client.channels.cache.get("936928081409613839");
        moment.locale("fr");
        let date_now = moment();
        let date_now_m = date_now.clone().format("L");
        let date_after = date_now.clone().add(1, 'day').format('L');
        // Rappel pour voter le référencement du serveur sur Disboard
        setInterval(() => {
            bots.send(`
Hey ! N'oublie pas que tu peux effectuer la commande /bump. Cela permet de mieux référencer le serveur sur le site *https://disboard.org/* et *https://fr.discordinvites.net/* ! Merci à tous ceux qui le feront :heart:`);
            if (date_now_m === date_after) {
                date_now = moment();
                date_now_m = date_now.clone().format('L');
                date_after = date_now.clone().add(1, 'day').format('L');

                // Selection de la Db et de la collection
                const dbName = "staffDB"
                const db = client_db.db(dbName);
                const col = db.collection("test");
                const myDoc = col.findOne({
                    date: date_after.toString()
                });
                // si il y a un document avec une date d'aujourd'hui --> donner rappel
                if (myDoc !== null) {
                    if (myDoc.date === date_after.toString()) {
                        recrutements.send(`Attention <@${myDoc.id}> n'est plus en test !`)
                        col.deleteOne({ id: myDoc.id })
                    }
                }
            }
        }, 7200000), // 2 heures = 7200000 ms
        console.log(`Prêt ! Connecté en tant que ${client.user.tag}`);
        client.user.setActivity(ready);
        // 🤖 Faire chier Badmax
        await client_db.close()
    }
};