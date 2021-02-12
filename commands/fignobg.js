const { decryptMedia } = require('@open-wa/wa-decrypt')
const fs = require('fs-extra')
const uaOverride = process.env.UserAgent
const { prefix } = JSON.parse(fs.readFileSync('./settings/settings.json'))

/**
 * 
 * @param {"@open-wa/wa-automate"} client
 * @param {import("@open-wa/wa-automate").Message} message 
 * @param {*} args 
 */
exports.run = async (client, message, args) => {
    try {
        if (message.isMedia && message.type == 'image') {

            try {
                var mediaData = await decryptMedia(message, uaOverride)
                var imageBase64 = `data:${message.mimetype};base64,${mediaData.toString('base64')}`
                var base64img = imageBase64
                var outFile = './temp/img/noBg.png'
                var result = await removeBackgroundFromImageBase64({
                    base64img,
                    apiKey: apiRemoveBg,
                    size: 'auto',
                    type: 'auto',
                    outFile
                })
                await fs.writeFile(outFile, result.base64img)
                await client.sendImageAsSticker(message.from, `data:${message.mimetype};base64,${result.base64img}`)
                await client.reply(message.from, 'Certifique-se de evitar usar isso quando não precisar,', message.id)
            } catch (err) {
                console.log(err)
                await client.reply(message.from, 'Ups! Parece que a API chegou no seu limite de usos diários!\nTente novamente amanha', message.id)
            }
        } else if (message.quotedMsg && message.quotedMsg.type == 'image') {
            try {
                var mediaData = await decryptMedia(message.quotedMsg, uaOverride)
                var imageBase64 = `data:${message.quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                var base64img = imageBase64
                var outFile = './temp/img/noBg.png'
                var result = await removeBackgroundFromImageBase64({
                    base64img,
                    apiKey: apiRemoveBg,
                    size: 'auto',
                    type: 'auto',
                    outFile
                })
                await fs.writeFile(outFile, result.base64img)
                await client.sendImageAsSticker(message.from, `data:${message.quotedMsg.mimetype};base64,${result.base64img}`)
                await client.reply(message.from, 'Certifique-se de evitar usar isso quando não precisar,', message.id)
            } catch (err) {
                console.log(err)
                await client.reply(message.from, 'Ups! Parece que a API chegou no seu limite de usos diários!\nTente novamente amanha', message.id)
            }

        } else {
            await client.reply(message.from, `Ups! preciso que me envie a imagem com a legenda ${prefix}stickernobg `, message.id)
        }
    } catch (error) {
        console.log(error);
    }
};

