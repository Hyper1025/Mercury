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

        await client.reply(from, 'Aguarde, estou medindo sua porcentagem e tipo de gado!!', id)

        await sleep(10000)
        let mention = body.trim().split(' ')
        var chifre = ["ultra extreme gado", "Gado-Master", "Gado-Rei", "Gado", "Escravo-ceta", "Escravo-ceta Máximo", "Jogador De Forno Livre<3", "Mestre Do Frifai<3<3", "Gado-Manso", "Gado-Conformado", "Gado-Incubado", "Gado Deus", "Mestre dos Gados", "TPTDPBCT=Topa Tudo Por Buceta KKKJ", "Gado Comum", "Mini Gadinho", "Gado Iniciante", "Gado Básico", "Gado Intermediário", "Gado Avançado", "Gado Profissional", "Gado Mestre", "Gado Chifrudo", "Corno Conformado", "Corno HiperChifrudo", "Chifrudo Deus", "Mestre dos Chifrudos"]
        var gado = chifre[Math.floor(Math.random() * chifre.length)]
        var level = Math.floor(Math.random() * 101) + 1
        if (args.length == 1) {
            await client.sendTextWithMentions(from, mention[1] + ' é ' + level + '% ' + gado + 'KKKKJ.')
        } else {
            await client.reply(from, `Você é ` + level + '% ' + gado + 'KKKKJ.', id)
        }

    } catch (error) {
        console.log(error);
    }
};

exports.help = {
    name: "Gadometro",
    description: "Descubra gadinho você é... 🐂",
    usage: `*${prefix}Gadometro*\n*${prefix}Gadometro* _mencione alguém_`
};