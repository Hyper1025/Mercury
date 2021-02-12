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

        arq = body.trim().split(' ')
        if (author === undefined) {
            return client.sendText(from, 'Você não mencionou ninguém', id)
        }
        const person = author.replace('@c.us', '')
        await client.sendGiphyAsSticker(from, 'https://media.giphy.com/media/S8507sBJm1598XnsgD/source.gif')
        client.sendTextWithMentions(from, '@' + person + ' *deu um tapa em* ' + arq[1])

    } catch (error) {
        console.log(error);
    }
};

exports.help = {
    name: "Slap",
    description: "Dá um tapa em alguém!\nVocê só pode dar tapas quando estiver em um grupo...",
    usage: `*${prefix}slap* _mencione alguém_`
};