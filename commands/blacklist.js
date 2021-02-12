const fs = require('fs-extra')
const bklist = JSON.parse(fs.readFileSync('./database/group/blacklist.json'))
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
            if (args.length !== 1) return client.reply(from, 'Defina entre on e off!', id)
            if (args[0] == 'on') {
                bklist.push(chatId)
                fs.writeFileSync('./database/group/blacklist.json', JSON.stringify(bklist))
                client.reply(from, `Anti números acionado.\nUse ${prefix}bklist (Número) para adicionar números.`, id)
            } else if (args[0] == 'off') {
                let exclu = bklist.indexOf(chatId)
                bklist.splice(exclu, 1)
                fs.writeFileSync('./database/group/blacklist.json', JSON.stringify(bklist))
                client.reply(from, 'Anti números offline.', id)
            }
        } else if (isGroupMsg && isOwner) {
            if (args.length !== 1) return client.reply(from, 'Defina entre on e off!', id)
            if (args[0] == 'on') {
                bklist.push(chatId)
                fs.writeFileSync('./database/group/blacklist.json', JSON.stringify(bklist))
                client.reply(from, `Anti números acionado.\nUse ${prefix}bklist (Número) para adicionar números.`, id)
            } else if (args[0] == 'off') {
                let exclu = bklist.indexOf(chatId)
                bklist.splice(exclu, 1)
                fs.writeFileSync('./database/group/blacklist.json', JSON.stringify(bklist))
                client.reply(from, 'Anti números offline.', id)
            }
        } else {
            client.reply(from, 'Apenas Administradores podem usar, então trate de virar um haha!', id)
        }
    } catch (error) {
        console.log(error);
    }
};

