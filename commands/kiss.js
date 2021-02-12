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
        arqa = body.trim().split(' ')
        if (args.length == 1) {
            const persona = author.replace('@c.us', '')
            client.sendTextWithMentions(from, 'Minha nossa! @' + persona + ' deu um beijo em ' + arqa[1] + ' !')
            if (double == 1) {
                await client.sendGiphyAsSticker(from, 'https://media.giphy.com/media/vUrwEOLtBUnJe/giphy.gif')
            } else {
                await client.sendGiphyAsSticker(from, 'https://media.giphy.com/media/1wmtU5YhqqDKg/giphy.gif')
            }
        } else {
            await client.reply(from, 'Marque ~apenas uma~ a pessoa quem você quer beijar hihihi', id)
        }

    } catch (error) {
        console.log(error);
    }
};

