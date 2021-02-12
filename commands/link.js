const fs = require('fs-extra')
const { prefix } = JSON.parse(fs.readFileSync('./settings/settings.json'))

/**
 * 
 * @param {"@open-wa/wa-automate"} client
 * @param {import("@open-wa/wa-automate").Message} message 
 * @param {*} args 
 */
exports.run = async (client, message, args) => {
    try {
        const { type, id, from, t, sender, author, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        const { name, formattedTitle } = chat

        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const botNumber = await client.getHostNumber()
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false

        if (!isGroupMsg) return client.reply(from, 'Desculpe, mas isso é um comando para grupos.', id)
        if (!isGroupAdmins) return client.reply(from, 'Apenas Administradores podem usar, então trate de virar um haha!', id)
        if (!isBotGroupAdmins) return client.reply(from, 'Caro administrador, se quiser que eu use esses comandos, precisa me deixar ser um ademir!', id)

        if (isGroupMsg) {
            const inviteLink = await client.getGroupInviteLink(groupId);
            client.sendLinkWithAutoPreview(from, inviteLink, `\nAqui está o link do grupo ${name}!`)
        } else {
            client.reply(from, 'Ops, isso é um comando de grupos apenas.', id)
        }
    } catch (error) {
        console.log(error);
    }
};

