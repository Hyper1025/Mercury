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
                return client.reply(from, 'Pra isso eu preciso ser parte dos Administradores.', id)
            }

            if (mentionedJidList.length === 0) {
                return client.reply(from, 'Você digitou o comando de forma muito errada, arrume e envie certo.', id)
            }

            await client.sendTextWithMentions(from, `Banindo membro comum:\n${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`).join('\n')}`)

            for (let i = 0; i < mentionedJidList.length; i++) {
                if (groupAdmins.includes(mentionedJidList[i])) {
                    return client.reply(from, 'Para remover administradores, você precisa primeiro remover o ADM deles.', id)
                }
                await client.removeParticipant(groupId, mentionedJidList[i])
            }
        } else if (isGroupMsg && isOwner) {
            if (!isBotGroupAdmins) {
                return client.reply(from, 'Pra isso eu preciso ser parte dos Administradores.', id)
            }

            if (mentionedJidList.length === 0) {
                return client.reply(from, 'Você digitou o comando de forma muito errada, arrume e envie certo.', id)
            }

            await client.sendTextWithMentions(from, `Banindo membro comum:\n${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`).join('\n')}`)

            for (let i = 0; i < mentionedJidList.length; i++) {
                if (groupAdmins.includes(mentionedJidList[i])) {
                    return client.reply(from, 'Para remover administradores, você precisa primeiro remover o ADM deles.', id)
                }
                await client.removeParticipant(groupId, mentionedJidList[i])
            }

        } else if (isGroupMsg) {
            await client.reply(from, 'Desculpe, somente os administradores podem usar esse comando...', id)
        } else {
            await client.reply(from, 'Esse comando apenas pode ser usado em grupos!', id)
        }
    } catch (error) {
        console.log(error);
    }
};

