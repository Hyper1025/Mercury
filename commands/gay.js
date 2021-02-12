const fs = require('fs-extra')
const { prefix } = JSON.parse(fs.readFileSync('./settings/settings.json'))
const double = Math.floor(Math.random() * 2) + 1

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
        const levelPercentage = Math.floor(Math.random() * 101) + 1

        gaak = body.trim().split(' ')
        var lgbt = ["lésbica", "gay", "bissexual", "transgenero", "queer", "intersexual", "pedro-sexual", "negrosexual", "helicoptero sexual", "ageneros", "androgino", "assexual", "macaco-sexual", "dedo-sexual", "Sexo-Inexplicavel", "prédio-sexual", "sexual-não-sexual", "pansexual", "kink", "incestuoso", "comedor-de-casadas", "unicornio-sexual", "maniaco-sexual"]
        var guei = lgbt[Math.floor(Math.random() * lgbt.length)]
        if (args.length == 1) {
            await client.sendTextWithMentions(from, gaak[1] + ' é ' + levelPercentage + '% ' + guei + '.')
        } else {
            await client.reply(from, `Você é ` + levelPercentage + '% ' + guei + '.', id)
        }

    } catch (error) {
        console.log(error);
    }
};

exports.help = {
    name: "gay",
    description: "Descubra a que tipo de LBGT+ alguém é...",
    usage: `*${prefix}gay*\n*${prefix}gay* _mencione alguém_`
};