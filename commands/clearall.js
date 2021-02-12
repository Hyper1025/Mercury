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

        if (!isOwner) {
            return client.reply(from, 'Somente o meu criador tem acesso a este comando.', id)
        }

        const clearAllChats = await client.getAllChats()

        for (let sChat of clearAllChats) {
            await client.clearChat(sChat.id)
        }

        client.reply(from, 'Limpei todos os Chats!', id)
    } catch (error) {
        console.log(error);
    }
};

exports.help = {
    name: "ClearAll",
    description: "Limpa todos chats do bot.",
    usage: `*${prefix}ClearAll*`
};