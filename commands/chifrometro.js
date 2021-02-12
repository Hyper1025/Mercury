const fs = require('fs-extra')
const { prefix } = JSON.parse(fs.readFileSync('./settings/settings.json'))
const double = Math.floor(Math.random() * 2) + 1
const { randomNimek, sleep, wall, tulis, ss } = require('../lib/functions')

/**
 * 
 * @param {"@open-wa/wa-automate"} client
 * @param {import("@open-wa/wa-automate").Message} message 
 * @param {*} args 
 */
exports.run = async (client, message, args) => {
    try {
        const { type, id, from, t, sender, author, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        let { body } = message
        body = (type === 'chat' && body.startsWith(prefix)) ? body : ((type === 'image' && caption || type === 'video' && caption) && caption.startsWith(prefix)) ? caption : ''
        var value = Math.floor(Math.random() * 101) + 1

        await client.reply(from, 'Aguarde, calculando seus chifres', id)

        await sleep(10000)

        var tier = ["corno manso", "chibungo", "galhudo", "búfalo", "bovino", "chifrudo", "corno frouxo", "coenêira", "chifre de aço", "chifre revestido", "o super cuck", "coisa de corno", "web-namorado", "corno conformado"]
        var yourTier = tier[Math.floor(Math.random() * tier.length)]

        let mention = body.trim().split(' ')

        if (args.length == 1) {
            await client.sendTextWithMentions(from, `${mention[1]} levou ${value} chifres kkkkkk, levando o título de ${yourTier}`)
        } else {
            await client.reply(from, `Você levou ${value} chifres kkkkkk, levando o título de ${yourTier}`, id)
        }

    } catch (error) {
        console.log(error);
    }
};

