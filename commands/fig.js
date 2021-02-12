const { decryptMedia } = require('@open-wa/wa-decrypt')
const fs = require('fs-extra')
const sharp = require('sharp')
const uaOverride = process.env.UserAgent
const { prefix, botName } = JSON.parse(fs.readFileSync('./settings/settings.json'))
const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi)

/**
 * 
 * @param {"@open-wa/wa-automate"} client
 * @param {import("@open-wa/wa-automate").Message} message 
 * @param {*} args 
 */
exports.run = async (client, message, args) => {
    try {
        // let { pushname, verifiedName, formattedName } = message.sender
        // pushname = pushname || verifiedName || formattedName
        // let stickerAutor = pushname.replace(/['"`]+/g, '')
        // console.log(stickerAutor);

        if (message.isMedia && message.type === 'image') {
            const mediaData = await decryptMedia(message, uaOverride)

            await sharp(mediaData)
                .resize(512, 512, {
                    fit: sharp.fit.contain,
                    background: { r: 0, g: 0, b: 0, alpha: 0 }
                })
                .toFile('./temp/stickers/sticker.png')

            var imgReadToBase = await fs.readFileSync('./temp/stickers/sticker.png', {
                encoding: "base64"
            })

            await client.sendImageAsSticker(message.from, `data:image/jpeg;base64,${imgReadToBase.toString('base64')}`, { pack: botName })
                .catch(() => {
                    client.reply(message.from, 'Erro', message.id)
                })

        } else if (message.quotedMsg && message.quotedMsg.type == 'image') {

            const mediaData = await decryptMedia(message.quotedMsg, uaOverride)

            await sharp(mediaData)
                .resize(512, 512, {
                    fit: sharp.fit.contain,
                    background: { r: 0, g: 0, b: 0, alpha: 0 }
                })
                .toFile('./temp/stickers/sticker.png')

            var imgReadToBase = await fs.readFileSync('./temp/stickers/sticker.png', {
                encoding: "base64"
            })

            await client.sendImageAsSticker(message.from, `data:image/jpeg;base64,${imgReadToBase.toString('base64')}`, { pack: botName })
                .catch(() => {
                    client.reply(message.from, 'Erro', message.id)
                })
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
            client.reply(message.from, `Você usou errado haha!\nPara usar isso, envie ou marque uma foto com essa mensagem.\nSe você usou isso em um gif ou mp4, use o comando *${prefix}gif*`, message.id)
        }
    } catch (error) {
        console.log(error);
        client.reply(message.from, `Parece que algo deu errado... 😪`, message.id)
    }
};

exports.help = {
    name: "Fig",
    description: "Serve para fazer figurinhas do WhatsApp!",
    usage: `Envie uma imagem, ou mencione uma imagem, com a legenda *${prefix}fig*\nVocê também pode usar *${prefix}fig* e me enviar um URL de uma imagem, para que eu a transforme em um fig`
};