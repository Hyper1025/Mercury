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

        if (!isGroupMsg) {
            return client.reply(from, 'Desculpe, mas isso é um comando para grupos.', id)
        }

        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        let { body } = message
        body = (type === 'chat' && body.startsWith(prefix)) ? body : ((type === 'image' && caption || type === 'video' && caption) && caption.startsWith(prefix)) ? caption : ''

        const membersOfGroup = await client.getGroupMembers(groupId)
        const randPerson = membersOfGroup[Math.floor(Math.random() * membersOfGroup.length)]
        await client.sendTextWithMentions(from, `Você foi escolhido!\n\n @${randPerson.id.replace(/@c.us/g, '')}\n\nPara: ${body.slice(8)}`)
    } catch (error) {
        console.log(error);
    }
};

exports.help = {
    name: "Oculto",
    description: "Esse eu prefiro nem descrever...",
    usage: `*${prefix}oculto* _mencione Alguém_`
};