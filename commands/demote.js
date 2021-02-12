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
        const botNumber = await client.getHostNumber()
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false

        if (isGroupMsg && isGroupAdmins) {
            if (!isBotGroupAdmins) {
                return client.reply(from, 'Caro administrador, se quiser que eu use esses comandos, precisa me deixar ser um ademir!', id)
            }

            if (mentionedJidList.length == 0) {
                return client.reply(from, 'Você esqueceu de marcar a pessoa que quer demitir.', id)
            }

            if (mentionedJidList.length >= 2) {
                return client.reply(from, 'Desculpe, só posso demitir 1 por vez.', id)
            }

            if (!groupAdmins.includes(mentionedJidList[0])) {
                return client.reply(from, 'Bom, ele não é um administrador.', id)
            }

            await client.demoteParticipant(groupId, mentionedJidList[0])
            await client.sendTextWithMentions(from, `Demitindo administrador do bar @${mentionedJidList[0]}.`)

        } else if (isGroupMsg && isOwner) {
            if (!isBotGroupAdmins) {
                return client.reply(from, 'Caro administrador, se quiser que eu use esses comandos, precisa me deixar ser um ademir!', id)
            }

            if (mentionedJidList.length == 0) {
                return client.reply(from, 'Você esqueceu de marcar a pessoa que quer demitir.', id)
            }

            if (mentionedJidList.length >= 2) {
                return client.reply(from, 'Desculpe, só posso demitir 1 por vez.', id)
            }

            if (!groupAdmins.includes(mentionedJidList[0])) {
                return client.reply(from, 'Bom, ele não é um administrador.', id)
            }

            await client.sendTextWithMentions(from, `Demitindo administrador do bar @${mentionedJidList[0]}.`)
            await client.demoteParticipant(groupId, mentionedJidList[0])

        } else if (isGroupMsg) {
            await client.reply(from, 'Desculpe, somente os administradores podem rebaixar membros pelo bot.', id)

        } else {
            await client.reply(from, 'Esse comando apenas pode ser usado em grupos!', id)
        }
    } catch (error) {
        console.log(error);
    }
};

exports.help = {
    name: "Demote",
    description: "Remove o ADM de alguém",
    usage: `*${prefix}demote* _Mencione alguém_`
};