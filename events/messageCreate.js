// Quand un message est créé
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
module.exports = {
    name: 'messageCreate',
    once: false,
    execute(message) {
        let embed1 = new MessageEmbed()
            .setTitle("📖 Sélectionner votre rôle de niveau !")
            .setDescription(`Avant de pouvoir accéder à l'entièreté du serveur, nous avons besoin 
de quelques informations pour vous aider au mieux si vous postez
une demande d'aide sur le serveur.

Aym'aide est un serveur français :flag_fr:, vous retrouverez ci-dessous un 
tableau avec les niveaux similaires dans d'autres pays francophones
(n'hésitez pas à cliquer sur l'image pour l'avoir en plus grand).

Si vous faites parti du <@&793128547224649738> , merci de bien vouloir
cliquer sur le bouton :triangular_flag_on_post: en dessous de ce message.`)
            .setColor("ED4245")
            .setImage("https://cdn.discordapp.com/attachments/793142615188701234/793143238411812874/2k1Al5w.png")
        let embed2 = new MessageEmbed()
            .setTitle(":warning: Merci de bien vouloir sélectionner un seul rôle de niveau parmi ceux proposé ci-dessous !")
            .setDescription(`Collège
    :green_book: <@&458346431879577610>
    :orange_book: <@&458346431422529547>
    :closed_book: <@&458346430827069450>

Lycée Général et Technologique
    :second_place: <@&458346430726144010>
    :first_place: <@&458346430436737055>
    :books: <@&458346430382473217>

Lycée Professionnel
    :newspaper: <@&458347011499098132>
    :page_facing_up: <@&458347012467720194>
    :page_with_curl: <@&458347013050728448>

Lycée Agricole
    :house_abandoned: <@&461226295099916289>
    :house: <@&461226296781963274>
    :house_with_garden: <@&461226298748960818>

Etudes Supérieures ou au dessus
    :frame_photo: <@&458347015357726731>
    :computer: <@&461616230755729418>`)
            .setColor("CD6F57")
        let embed3 = new MessageEmbed()
            .setTitle("✨ Sélectionner vos rôles de matières !")
            .setDescription(`:information_source: Vous pouvez choisir plusieurs rôles parmi cette liste !

Cliquez sur un bouton :
- Si vous ne possédez pas le rôle, il vous sera ajouté
- Si vous possédez le rôle, il vous sera retiré`)
            .setColor("3BA55D")
        let embed4 = new MessageEmbed()
            .setTitle(":warning: Merci de bien vouloir sélectionner votre rôle de niveau parmi ceux proposé ci-dessous !")
            .setDescription(`:information_source: Ce menu vous permet de choisir votre unique rôle

Sélectionnez votre rôle
- Il vous sera automatiquement ajouté
- Il vous suffira de choisir un autre rôle pour mettre à jour votre niveau`)
            .setColor("3BA55D")
        let embed5 = new MessageEmbed()
            .setTitle("Règlement d'Aym'aide")
            .setDescription("Voici le règlement d'Aym'aide")
            .addFields(
                {
                    name: "1️⃣ Les bases",
                    value: `
Aym’aide est une association prônant le respect, les valeurs de l’éducation pour tous-tes mais aussi la sécurité numérique sur ses supports.

Tout-e utilisateur-trice de moins de 13 ans sera expulsé-e du serveur et invité-e à revenir une fois son anniversaire passé. 

Le staff se tient à votre disposition pour toute remarque ou problème au sein du serveur.`
                },
                {
                    name: "2️⃣ Compte Discord",
                    value: `Tout pseudonyme ou photo de profil ; faisant référence à un contenu violent, pornographique, sexiste, raciste, choquant ou discriminatoire doivent être changés. 
 
Les pseudonymes devront être mentionable facilement 
Exemple : @Personne au lieu de @𝓟𝓮𝓻͢͢͢𝓼𝓸𝓷𝓷𝓮๖ۣ𝓣҉

Tous les comptes « invisibles » (pseudo non visible et photo de profil se confondant avec le fond de Discord) ou « sosies » (même pseudo, même photo de profil…) seront invités à être changés, sinon sanctionnés.`
                },
                {
                    name: "3️⃣ Comportement",
                    value: `Le respect et la politesse étant la base d’interactions sociales saines, ces qualités vous sont demandées lors de vos échanges avec les autres membres. 

Insultes, spam, mentions abusives, flood, pollution sonore ou visuelle, partage de contenu choquant, pubs, harcèlement, discrimination ou toute autre forme de manque de respect ou atteinte personnelle seront sanctionnés.`
                },
                {
                    name: "4️⃣ Demandes d’aide",
                    value: `Lorsque vous demandez de l'aide, postez l'énoncé de votre exercice, des pistes de réflexion, des précisions sur le chapitre concerné ou encore ce que vous ne comprenez pas de la question. 
Les aides pour les DM sont acceptées. 
Attention, nous ne ferons ni le travail, ni une correction complète à votre place. 

Tout manque de respect ou ping abusif envers un-e aidant-e sera sanctionné.
 
N’oubliez pas, avant de poster une demande, de vérifier qu’il n’y ait pas d’aide en cours. Si cela est le cas, merci d’aller dans un autre salon dédié à votre matière ou dans un salon de soutien. 
Tout flood (même post dans plusieurs salons, posts abusifs…) sera sanctionné. `
                },
                {
                    name: "5️⃣ Autres règles et recommandations",
                    value: `Il est recommandé de ne pas intervenir en pleine aide, sauf si l’aidant-e est incertain-e, absent-e ou dit ce qui vous semble être une erreur. 
Merci dans ce cas-là de le faire avec respect, en prenant en considération qu’une telle intervention peut porter confusion à l’aidé-e. 

Si vous revenez sur une aide antérieure, aidé-e comme aidant-e, merci de vérifier que le salon est toujours libre afin de ne pas déranger une aide en cours. 

Tout devoir à temps imparti, noté et surveillé n’est pas accepté pour des raisons simples : cela ne reflète pas les réelles capacités de l’aidé-e, et biaise alors sa note. Ceci est contre-productif, ne vous apprendra rien pour le contrôle sur table et est contraire aux valeurs de l’Association. Ces publications seront supprimées et sanctionnées.

Les demandes inopinées d’aide en MP pourront être sanctionnées.`
                },
                {
                    name: "6️⃣ Publicités et Partenariats",
                    value: `Concernant les publicités, celles-ci peuvent être acceptées si elles sont motivées et validées auprès du Staff. Elles seront alors publiées dans vos-projets.
Vous pouvez contacter n’importe quel membre du staff (<@&408261421894205440>, <@&409340879518826498> ou <@&640153738744692766>)

Concernant les partenariats, il faudra suivre une autre démarche. Nous vous demandons alors de contacter le <@&640153738744692766> en présentant de manière motivée votre projet.`
                },
                {
                    name: "7️⃣ Médiation et sanctions",
                    value: `Sur ce serveur, la mise en silence est traduite par l’accès à un salon consultable uniquement par la personne réduite au silence et le Staff. 
Ce salon peut servir à expliquer les reproches par rapport au règlement, régler un conflit entre plusieurs membres ou encore sanctionner un-e membre. 

Selon une échelle de sanctions définie collectivement par l’équipe de l’Association, les sanctions sont proportionnelles à l’erreur commise. 
Cela peut passer par un simple rappel à l’ordre, la mise en silence, l’avertissement ou l’expulsion/le bannissement du serveur. 

Après 3 avertissements, le-a membre s’expose à un bannissement. 

Toute sanction appliquée par le staff est concertée et justifiée par le règlement.
Cependant, ne pouvant pas traduire toutes les situations possibles dans un règlement, le staff se réserve le droit de sanctionner pour une raison non mentionnée ici après concertation de manière juste et proportionnelle à la faute commise.`
                },
                {
                    name: "8️⃣ Association, adhésion et documents officiels",
                    value: `Ce Discord est le Discord officiel de l’Association Aym’aide. 

Vous pouvez retrouver certaines informations dans le salon <#822188749865222144>.
Également, c’est là-bas que vous retrouverez le formulaire d’adhésion (simple membre associatif) ou encore le formulaire de recrutement pour devenir <@&699538325341601802> (adhésion obligatoire, aidant reconnu-e par l’Association ayant un poids associatif).

Pour plus d’informations ou encore toute demande de documents, merci de vous adresser au <@&640153738744692766> ou d’envoyer un mail à assoaymaide@gmail.com .`
                }
            )
        const row1 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('Allemand')
                    .setLabel('Allemand')
                    .setStyle('SUCCESS')
                    .setEmoji('🇩🇪')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('Anglais')
                    .setLabel('Anglais')
                    .setStyle('SUCCESS')
                    .setEmoji('🇺🇸')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('Arabe')
                    .setLabel('Arabe')
                    .setStyle('SUCCESS')
                    .setEmoji('🇸🇦')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('Arts')
                    .setLabel('Arts')
                    .setStyle('SUCCESS')
                    .setEmoji('🎨')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('Coréen')
                    .setLabel('Coréen')
                    .setStyle('SUCCESS')
                    .setEmoji('🇰🇷')
            );

        const row2 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('Economie & Société')
                    .setLabel('Economie & Société')
                    .setStyle('SUCCESS')
                    .setEmoji('📈')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('Espagnol')
                    .setLabel('Espagnol')
                    .setStyle('SUCCESS')
                    .setEmoji('🇪🇸')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('Français et sciences humaines')
                    .setLabel('Français et sciences humaines')
                    .setStyle('SUCCESS')
                    .setEmoji('📚')
            ).addComponents(
                new MessageButton()
                    .setCustomId('Histoire,Géographie,EMC')
                    .setLabel('Histoire,Géographie,EMC')
                    .setStyle('SUCCESS')
                    .setEmoji('🏰')
            );

        const row3 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('Informatique')
                    .setLabel('Informatique')
                    .setStyle('SUCCESS')
                    .setEmoji('💻')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('Japonais')
                    .setLabel('Japonais')
                    .setStyle('SUCCESS')
                    .setEmoji('🇯🇵')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('Mathématiques')
                    .setLabel('Mathématiques')
                    .setStyle('SUCCESS')
                    .setEmoji('📐')
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('Philosophie')
                    .setLabel('Philosophie')
                    .setStyle('SUCCESS')
                    .setEmoji('📜')
            ).addComponents(
                new MessageButton()
                    .setCustomId('Sciences')
                    .setLabel('Sciences')
                    .setStyle('SUCCESS')
                    .setEmoji('🔬')
            )
        const row4 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('Système étranger')
                    .setLabel('Système étranger')
                    .setStyle('DANGER')
                    .setEmoji('🚩')
            );
        const row_niveau = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('niveau')
                    .setPlaceholder('Choisis ton rôle de niveau')
                    .addOptions([
                        {
                            label: 'Rôle 5ème',
                            description: 'Tu es en 5ème ?',
                            value: '5ème',
                            emoji: '📗'
                        },
                        {
                            label: 'Rôle 4ème',
                            description: 'Tu es en 4ème ?',
                            value: '4ème',
                            emoji: '📙'
                        },
                        {
                            label: 'Rôle 3ème',
                            description: 'Tu es en 3ème ?',
                            value: '3ème',
                            emoji: '📕'
                        },
                        {
                            label: 'Rôle Seconde Générale et Technologique',
                            description: 'Tu es en Seconde Générale et Technologique ?',
                            value: 'Seconde Générale et Technologique',
                            emoji: '🥈'
                        },
                        {
                            label: 'Rôle Première Générale et Technologique',
                            description: 'Tu es en Première Générale et Technologique ?',
                            value: 'Première Générale et Technologique',
                            emoji: '🥇'
                        },
                        {
                            label: 'Rôle Terminale Générale et Technologique',
                            description: 'Tu es en Terminale Générale et Technologique ?',
                            value: 'Terminale Générale et Technologique',
                            emoji: '📚'
                        },
                        {
                            label: 'Rôle Seconde Professionnelle',
                            description: 'Tu es en Seconde Professionnelle ?',
                            value: 'Seconde Professionnelle',
                            emoji: '📰'
                        },
                        {
                            label: 'Rôle Première Professionnelle',
                            description: 'Tu es en Première Professionnelle ?',
                            value: 'Première Professionnelle',
                            emoji: '📄'
                        },
                        {
                            label: 'Rôle Terminale Professionnelle',
                            description: 'Tu es en Terminale Professionnelle ?',
                            value: 'Terminale Professionnelle',
                            emoji: '📃'
                        },
                        {
                            label: 'Rôle Seconde Agricole',
                            description: 'Tu es en Seconde Agricole ?',
                            value: 'Seconde Agricole',
                            emoji: '🏚️'
                        },
                        {
                            label: 'Rôle Première Agricole',
                            description: 'Tu es en Première Agricole ?',
                            value: 'Première Agricole',
                            emoji: '🏠'
                        },
                        {
                            label: 'Rôle Terminale Agricole',
                            description: 'Tu es en Terminale Agricole ?',
                            value: 'Terminale Agricole',
                            emoji: '🏡'
                        },
                        {
                            label: 'Rôle Université ou Ecoles Supérieures',
                            description: 'Tu es en Université ou Ecoles Supérieures ?',
                            value: 'Université ou Ecoles Supérieures',
                            emoji: '🖼️'
                        },
                        {
                            label: 'Rôle Monde professionnel',
                            description: 'Tu es dans le Monde professionnel ?',
                            value: 'Monde professionnel',
                            emoji: '💻'
                        },
                    ]),
            );

        if (message.content === "embed1") {
            message.channel.send({ embeds: [embed1], components: [row4] });
        } else if (message.content === "embed2") {
            message.channel.send({ embeds: [embed2] });
        } else if (message.content === "embed3") {
            message.channel.send({ embeds: [embed3] });
        } else if (message.content === "embed5") {
            message.channel.send({ embeds: [embed5] });
        } else if (message.content === "bouton1") {
            message.channel.send({ embeds: [embed3], components: [row1, row2, row3] });
        } else if (message.content === "menu1") {
            message.channel.send({ embeds: [embed4], components: [row_niveau] });
        }
    }
};