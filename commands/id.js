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
        if (!isGroupMsg) return client.reply(from, 'Desculpe, mas isso é um comando para grupos.', id)
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        client.reply(from, `A ID desse grupo é ${groupId}`, id)

    } catch (error) {
        console.log(error);
    }
};

exports.help = {
    name: "id",
    description: "Responde com o ID do grupo",
    usage: `*${prefix}id*`
};