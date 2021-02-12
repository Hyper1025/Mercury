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

        const isOwn = sender.id
        const isOwner = isOwn.includes(`${ownerNumber}@c.us`)
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false

        if (isGroupMsg && isGroupAdmins) {
            if (!quotedMsg) return client.reply(from, 'Você precisa marcar a mensagem que deseja deletar, obviamente, uma minha.', id)
            if (!quotedMsgObj.fromMe) return client.reply(from, 'Só posso deletar minhas mensagens!', id)
            await client.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)

        } else if (isGroupMsg && isOwner) {
            if (!quotedMsg) return client.reply(from, 'Você precisa marcar a mensagem que deseja deletar, obviamente, uma minha.', id)
            if (!quotedMsgObj.fromMe) return client.reply(from, 'Só posso deletar minhas mensagens!', id)
            await client.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)

        } else if (isGroupMsg) {
            if (!quotedMsgObj.fromMe) return client.reply(from, 'Só posso deletar minhas mensagens!', id)
            await client.reply(from, 'Desculpe, somente meu dono e os administradores podem deletar minhas mensagens.', id)

        } else {
            await client.reply(from, 'Esse comando apenas pode ser usado em grupos!', id)

        }
    } catch (error) {
        console.log(error);
    }
};

exports.help = {
    name: "Del",
    description: "Remove o ADM de alguém",
    usage: `Marque uma mensagem do bot e responda ela com *${prefix}Del*`
};