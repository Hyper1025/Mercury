const fs = require('fs-extra')
const { ownerNumber, prefix } = JSON.parse(fs.readFileSync('./settings/settings.json'))

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
        const isOwn = sender.id
        const isOwner = isOwn.includes(`${ownerNumber}@c.us`)

        if (isGroupMsg && isGroupAdmins) {
            await client.sendText(from, 'Terei que sair mas tomará que voltemos a nós ver em breve! <3').then(() => client.leaveGroup(groupId))
        } else if (isGroupMsg && isOwner) {
            await client.sendText(from, 'Terei que sair mas tomará que voltemos a nós ver em breve! <3').then(() => client.leaveGroup(groupId))
        } else if (isGroupMsg) {
            await client.reply(from, 'Desculpe, somente os administradores e meu dono podem usar esse comando...', id)
        } else {
            await client.reply(from, 'Esse comando apenas pode ser usado em grupos!', id)
        }
    } catch (error) {
        console.log(error);
    }
};

