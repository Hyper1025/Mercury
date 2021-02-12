const { decryptMedia } = require('@open-wa/wa-decrypt')
const fs = require('fs-extra')
const uaOverride = process.env.UserAgent
const { prefix, botName } = JSON.parse(fs.readFileSync('./settings/settings.json'))
const { spawn, exec, execFile } = require('child_process')

/**
 * 
 * @param {"@open-wa/wa-automate"} client
 * @param {import("@open-wa/wa-automate").Message} message 
 * @param {*} args 
 */
exports.run = async (client, message, args) => {
    try {
        const { type, id, from, t, sender, author, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message

        // let { pushname, verifiedName, formattedName } = message.sender
        // pushname = pushname || verifiedName || formattedName
        // let stickerAutor = pushname.replace(/['"`]+/g, '')

        if (isMedia) {
            if (mimetype === 'video/mp4' && message.duration < 10 || mimetype === 'image/gif' && message.duration < 15) {
                var mediaData = await decryptMedia(message, uaOverride)
                client.reply(from, '⏳ Em andamento, aguarde por favor aguarde', id)
                var filename = `./temp/stickers/stickergif.${mimetype.split('/')[1]}`
                await fs.writeFileSync(filename, mediaData)
                await exec(`gify ${filename} ./temp/stickers/stickergf.gif --fps=15 --scale=256:256`, async function (error, stdout, stderr) {
                    var gif = await fs.readFileSync('./temp/stickers/stickergf.gif', {
                        encoding: "base64"
                    })
                    await client.sendImageAsSticker(from, `data:image/gif;base64,${gif.toString('base64')}`, { pack: botName })
                        .catch(() => {
                            client.reply(from, 'Aff! A conversão obteve erros, talvez seja o tamanho do gif ou seu peso.', id)
                        })
                })
            } else {
                client.reply(from, `Caso receba isso considere 2 motivos.\n\n1 - Isso não é um gif ou video.\n\n2 - O gif ou video tem mais de 10 segundos, passando do limite que posso converter`, id)
            }
        } else if (quotedMsg) {
            if (quotedMsg.mimetype == 'video/mp4' && quotedMsg.duration < 10 || quotedMsg.mimetype == 'image/gif' && quotedMsg.duration < 10) {
                var mediaData = await decryptMedia(quotedMsg, uaOverride)
                client.reply(from, '⏳ Em andamento, aguarde por favor aguarde', id)
                var filename = `./temp/stickers/stickergif.${quotedMsg.mimetype.split('/')[1]}`
                await fs.writeFileSync(filename, mediaData)
                await exec(`gify ${filename} ./temp/stickers/stickergf.gif --fps=15 --scale=256:256`, async function (error, stdout, stderr) {
                    var gif = await fs.readFileSync('./temp/stickers/stickergf.gif', {
                        encoding: "base64"
                    })
                    await client.sendImageAsSticker(from, `data:image/gif;base64,${gif.toString('base64')}`, { pack: botName })
                        .catch(() => {
                            client.reply(from, 'Aff! A conversão obteve erros, talvez seja o tamanho do gif ou seu peso.', id)
                        })
                })
            } else {
                client.reply(from, `Caso receba isso considere 2 motivos.\n\n1 - Isso não é um gif ou video.\n\n2 - O gif ou video tem mais de 10 segundos, passando do limite que posso converter.`, id)
            }
        } else {
            client.reply(from, 'Você usou errado haha!\nPara usar isso, envie ou marque uma foto com essa mensagem.', id)
        }
    } catch (error) {
        console.log(error);
        client.reply(message.from, `Parece que algo deu errado... 😪`, message.id)
    }
};

