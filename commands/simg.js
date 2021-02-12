const { decryptMedia } = require('@open-wa/wa-decrypt')
const fs = require('fs-extra')
const uaOverride = process.env.UserAgent
const { prefix } = JSON.parse(fs.readFileSync('./settings/settings.json'))
const { apiImgBB } = JSON.parse(fs.readFileSync('./settings/api.json'))
const imgbbUploader = require('imgbb-uploader')
const imgSearch = require('node-reverse-image-search')

/**
 * 
 * @param {"@open-wa/wa-automate"} client
 * @param {import("@open-wa/wa-automate").Message} message 
 * @param {*} args 
 */
exports.run = async (client, message, args) => {
    try {
        const { type, id, from, t, sender, author, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'

        if (isMedia && type === 'image' || isQuotedImage) {
            const dataMedia = isQuotedImage ? quotedMsg : message
            const mediaData = await decryptMedia(dataMedia, uaOverride)

            client.reply(from, 'Aguarde, leva mais de 10 segundos.\n\n *NÃO USE NOVAMENTE* até eu terminar 😡', id)

            const sendres = (results) => {
                const ttile = results[0].title.replace('<span>', '').replace('</span>', '')
                const ttscig = results[1].title.replace('<span>', '').replace('</span>', '')
                client.reply(from, `*${ttile}*\n\n*Titulo >* ${ttscig}\n\n${results[1].url}`, id)
                console.log(results)
            }

            var searchImage = './temp/img/imagesearch.jpg'
            await fs.writeFile(searchImage, mediaData)
            const upimg = await imgbbUploader(apiImgBB, searchImage)
            console.log(upimg.url)
            const resimg = await imgSearch(upimg.url, sendres)
        } else {
            await client.reply(from, 'Amigo(a), isso somente funciona com imagens...', id)
        }
    } catch (error) {
        console.log(error);
    }
};

exports.help = {
    name: "SIMG",
    description: "SIMG é a sigla para Search Image, ou procura por image... Se trata de uma pesquisa reversa, você me envia uma imagem, e eu procuro por imagens semelhantes a ela",
    usage: `Envie uma imagem *${prefix}sImg*`
};