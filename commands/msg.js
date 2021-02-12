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

        if (args.length == 0) return client.reply(from, 'Você esqueceu de inserir uma mensagem... e.e', id)
        await client.sendText(from, `${body.slice(5)}`)
    } catch (error) {
        console.log(error);
    }
};

exports.help = {
    name: "Msg",
    description: "Repito o que você me mandar...",
    usage: `*${prefix}msg* _texto_`
};