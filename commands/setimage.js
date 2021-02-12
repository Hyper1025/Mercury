const fs = require('fs-extra')
const { prefix } = JSON.parse(fs.readFileSync('./settings/settings.json'))
const { decryptMedia } = require('@open-wa/wa-decrypt')
const uaOverride = process.env.UserAgent
const errorurl = 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'

/**
 * 
 * @param {"@open-wa/wa-automate"} client
 * @param {import("@open-wa/wa-automate").Message} message 
 * @param {*} args 
 */
exports.run = async (client, message, args) => {
    try {
        const { type, id, from, t, sender, author, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        let { pushname, verifiedName, formattedName } = sender
        pushname = pushname || verifiedName || formattedName

        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const botNumber = await client.getHostNumber()
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'

        if (!isGroupMsg) return client.reply(from, 'Desculpe, mas isso é um comando para grupos.', id)
        if (!isGroupAdmins) return client.reply(from, 'Apenas Administradores podem usar, então trate de virar um haha!', id)
        if (!isBotGroupAdmins) return client.reply(from, 'Caro administrador, se quiser que eu use esses comandos, precisa me deixar ser um ademir!', id)

        if (isMedia && type == 'image' || isQuotedImage) {
            const dataMedia = isQuotedImage ? quotedMsg : message
            const _mimetype = dataMedia.mimetype
            const mediaData = await decryptMedia(dataMedia, uaOverride)
            const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
            const picgp = await client.getProfilePicFromServer(chat.id)

            if (picgp == undefined) {
                var backup = errorurl
            } else {
                var backup = picgp
            }
            await client.sendFileFromUrl(from, backup, 'group.png', 'Para caso você mude de ideia...', id)
            await client.setGroupIcon(groupId, imageBase64)
        } else if (args.length == 1) {
            if (!isUrl(url)) {
                await client.reply(from, 'Tem certeza que isso é um link apenas para a foto?', id)
            }
            const picgpo = await client.getProfilePicFromServer(chat.id)
            if (picgpo == undefined) {
                var back = errorurl
            } else {
                var back = picgpo
            }
            await client.sendFileFromUrl(from, back, 'group.png', 'Caso você mude de ideia...', id)
            client.setGroupIconByUrl(groupId, url).then((r) => (!r && r !== undefined) ?
                client.reply(from, 'É o que eu pensava, não existem fotos nesse link, ou o link contem fotos demais.', id) :
                client.reply(from, 'Isso! Agora o grupo está de cara nova haha!', id))
        } else {
            client.reply(from, `Acho que você esta usando errado em!`, id)
        }
    } catch (error) {
        console.log(error);
    }
};

