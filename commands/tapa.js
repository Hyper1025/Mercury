const fs = require('fs-extra')
const { prefix } = JSON.parse(fs.readFileSync('./settings/settings.json'))
const axios = require('axios')

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
        const person = author.replace('@c.us', '')
        const gifTapa = await axios.get('https://nekos.life/api/v2/img/slap')
        await client.sendStickerfromUrl(from, gifTapa.data.url)
        client.sendTextWithMentions(from, '@' + person + ' *deu um tapa em* ' + arq[1])
    } catch (error) {
        console.log(error);
    }
};

