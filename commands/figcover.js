const { decryptMedia } = require('@open-wa/wa-decrypt')
const fs = require('fs-extra')
const uaOverride = process.env.UserAgent
const { prefix } = JSON.parse(fs.readFileSync('./settings/settings.json'))
const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi)

/**
 * 
 * @param {"@open-wa/wa-automate"} client
 * @param {import("@open-wa/wa-automate").Message} message 
 * @param {*} args 
 */
exports.run = async (client, message, args) => {
    try {
        const isQuotedImage = message.quotedMsg && message.quotedMsg.type === 'image'

        if ((message.isMedia || isQuotedImage) && args.length === 0) {
            const encryptMedia = isQuotedImage ? message.quotedMsg : message
            const _mimetype = isQuotedImage ? message.quotedMsg.mimetype : message.mimetype
            const mediaData = await decryptMedia(encryptMedia, uaOverride)
            const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
            client.sendImageAsSticker(message.from, imageBase64)
        } else if (args.length == 1) {
            const url = args[0]
            if (url.match(isUrl)) {
                await client.sendStickerfromUrl(message.from, url, {
                    method: 'get'
                })
                    .catch(err => console.log('Erro: ', err))
            } else {
                client.reply(message.from, 'Esse link está correto? Ele me parece errado...', message.id)
            }
        } else {
            client.reply(message.from, 'Você usou errado haha!\nPara usar isso, envie ou marque uma foto com essa mensagem.', message.id)
        }
    } catch (error) {
        console.log(error);
    }
};

exports.help = {
    name: "figcover",
    description: "Serve para fazer figurinhas do whatsapp!\nPorém ela preenche todo canvas do sticker. Ou seja, corta a imagem para preencher o sticker o máximo possível.",
    usage: `Envie uma imagem, ou mencione uma imagem, com a legenda *${prefix}figcover*\nVocê também pode usar *${prefix}figcover* e me enviar um URL de uma imagem, para que eu a transforme em um sticker`
};