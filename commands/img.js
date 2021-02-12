const fs = require('fs-extra')
const { prefix } = JSON.parse(fs.readFileSync('./settings/settings.json'))
const { decryptMedia } = require('@open-wa/wa-decrypt')

/**
 * 
 * @param {"@open-wa/wa-automate"} client
 * @param {import("@open-wa/wa-automate").Message} message 
 * @param {*} args 
 */
exports.run = async (client, message, args) => {
    try {
        const { type, id, from, t, sender, author, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message

        if (quotedMsg && quotedMsg.type == 'sticker') {

            const mediaData = await decryptMedia(quotedMsg)
            client.reply(from, `Só esperar, pode levar um tempinho...`, id)
            const stickerImage = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
            await client.sendFile(from, stickerImage, '', 'Aproveite, aqui está sua foto! :D', id)

        }
        else if (!quotedMsg) {
            return client.reply(from, `Desculpe, isso é somente para stickers...\nVocê deve mencionar e usar o comando *${prefix}img*`, id)
        }
    } catch (error) {
        console.log(error);
    }
};

