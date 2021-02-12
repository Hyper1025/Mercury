const fs = require('fs-extra')
const atbk = JSON.parse(fs.readFileSync('./database/group/anti.json'))
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

            if (args.length == 0) return client.reply(from, 'Defina o número.', id)
            const bkls = body.slice(8) + '@c.us'
            atbk.push(bkls)
            fs.writeFileSync('./database/group/anti.json', JSON.stringify(atbk))
            await client.reply(from, 'Número adicionado a black-list', id)

        } else if (isGroupMsg && isOwner) {

            if (args.length == 0) return client.reply(from, 'Defina o número.', id)
            const bkls = body.slice(8) + '@c.us'
            atbk.push(bkls)
            fs.writeFileSync('./database/group/anti.json', JSON.stringify(atbk))
            await client.reply(from, 'Número adicionado a black-list', id)

        } else {
            client.reply(from, 'Apenas Administradores podem usar, então trate de virar um haha!', id)
        }
    } catch (error) {
        console.log(error);
    }
};

