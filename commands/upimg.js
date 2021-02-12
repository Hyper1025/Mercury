const { decryptMedia } = require('@open-wa/wa-decrypt')
const fs = require('fs-extra')
const uaOverride = process.env.UserAgent
const { prefix } = JSON.parse(fs.readFileSync('./settings/settings.json'))
const { apiImgBB } = JSON.parse(fs.readFileSync('./settings/api.json'))
const imgbbUploader = require('imgbb-uploader')

/**
 * 
 * @param {"@open-wa/wa-automate"} client
 * @param {import("@open-wa/wa-automate").Message} message 
 * @param {*} args 
 */
exports.run = async (client, message, args) => {
    try {
        const { type, id, from, t, sender, author, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message

        if (isMedia && type === 'image') {
            const mediaData = await decryptMedia(message, uaOverride)
            var uplimg = './temp/img/imageupl.jpg'
            await fs.writeFile(uplimg, mediaData)
            const sdimg = await imgbbUploader(apiImgBB, uplimg) // Bote uma api do imgbb pras suas fotos n irem pra minha conta
            console.log(sdimg.url_viewer)
            await client.reply(from, `*OBS!* _Essa link tem duração de 7 dias, após isso a imagem será automaticamente deletada do servidor._\n\n${sdimg.url_viewer}`, id)
        } else {
            await client.reply(from, 'Amigo(a), isso somente funciona com imagens.', id)
        }
    } catch (error) {
        console.log(error);
    }
};

