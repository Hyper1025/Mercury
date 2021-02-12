const fs = require('fs-extra')
const { prefix } = JSON.parse(fs.readFileSync('./settings/settings.json'))

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

        if (args.length == 0) return client.reply(from, 'Você não especificou uma frase para ser invertida.', id)
        const inver = body.slice(10).split('').reverse().join('')
        await client.reply(from, inver, id)
    } catch (error) {
        console.log(error);
    }
};

exports.help = {
    name: "Inverter",
    description: "Inverte o texto que você enviar",
    usage: `*${prefix}Inverter* _Texto_`
};