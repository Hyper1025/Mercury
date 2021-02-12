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

        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const botNumber = await client.getHostNumber()
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false

        if (!isGroupMsg) return client.reply(from, 'Desculpe, mas isso é um comando para grupos.', id)
        if (!isGroupAdmins) return client.reply(from, 'Apenas Administradores podem usar, então trate de virar um haha!', id)
        if (!isBotGroupAdmins) return client.reply(from, 'Caro administrador, se quiser que eu use esses comandos, precisa me deixar ser um ademir!', id)

        if (args.length !== 1) {
            return client.reply(from, 'Você precisa especificar o número de telefone.', id)
        }

        try {
            await client.addParticipant(from, `${args[0]}@c.us`)
        } catch {
            client.reply(from, 'Erros! Não pude adicionar, pode ser por limitação de adicionar ou erros meus.', id)
        }
    } catch (error) {
        console.log(error);
    }
};

exports.help = {
    name: "Add",
    description: "Adiciona alguém no grupo através do número da pessoa.",
    usage: `*${prefix}add* _Número completo_\n\nNão adicione nenhum tipo de símbolo, apenas o número completo com DDD do pais e DDD local`
};