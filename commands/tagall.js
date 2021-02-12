const fs = require('fs-extra')
const { ownerNumber, prefix } = JSON.parse(fs.readFileSync('./settings/settings.json'))
const { sleep } = require('../lib/functions')

/**
 * 
 * @param {"@open-wa/wa-automate"} client
 * @param {import("@open-wa/wa-automate").Message} message 
 * @param {*} args 
 */
exports.run = async (client, message, args) => {
    try {
        const { type, id, from, t, sender, author, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message

        let { body } = message
        body = (type === 'chat' && body.startsWith(prefix)) ? body : ((type === 'image' && caption || type === 'video' && caption) && caption.startsWith(prefix)) ? caption : ''
        const isOwn = sender.id
        const isOwner = isOwn.includes(`${ownerNumber}@c.us`)
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false

        if (isGroupMsg && isGroupAdmins) {
            const groupMem = await client.getGroupMembers(groupId)
            let tagAllMsg = `Chamando todos!\nAssunto: ${body.slice(10)}\n\n`
            for (let i = 0; i < groupMem.length; i++) {
                tagAllMsg += '» '
                tagAllMsg += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
            }
            tagAllMsg += '\nObrigado & Amo vocês <3'
            await sleep(2000)
            await client.sendTextWithMentions(from, tagAllMsg, id)

        } else if (isGroupMsg && isOwner) {
            const groupMem = await client.getGroupMembers(groupId)
            let tagAllMsg = `Chamando todos!\nAssunto: ${body.slice(10)}\n\n`
            for (let i = 0; i < groupMem.length; i++) {
                tagAllMsg += '» '
                tagAllMsg += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
            }
            tagAllMsg += '\nObrigada & Amo vocês <3'
            await sleep(2000)
            await client.sendTextWithMentions(from, tagAllMsg, id)

        } else if (isGroupMsg) {
            await client.reply(from, 'Desculpe, somente os administradores podem usar esse comando...', id)
        } else {
            await client.reply(from, 'Esse comando apenas pode ser usado em grupos!', id)
        }
    } catch (error) {
        console.log(error);
    }
};

exports.help = {
    name: "TagAll",
    description: "Chama todos do grupo, é importante adicionar um assunto na mensagem... Vai ajudar para quem ler a notificação 😁",
    usage: `*${prefix}tagall* _Assunto_`
};