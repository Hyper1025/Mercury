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
        let { body } = message
        body = (type === 'chat' && body.startsWith(prefix)) ? body : ((type === 'image' && caption || type === 'video' && caption) && caption.startsWith(prefix)) ? caption : ''
        let { pushname, verifiedName, formattedName } = sender
        pushname = pushname || verifiedName || formattedName

        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const botNumber = await client.getHostNumber()
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false

        onar = body.trim().split(/ +/).slice(1)
        if (!isGroupMsg) return client.reply(from, 'Desculpe, mas isso é um comando para grupos.', id)
        if (!isGroupAdmins) return client.reply(from, 'Apenas Administradores podem usar, então trate de virar um haha!', id)
        if (!isBotGroupAdmins) return client.reply(from, 'Caro administrador, se quiser que eu use esses comandos, precisa me deixar ser um ademir!', id)
        if (onar.length !== 1) return client.reply(from, `Você esqueceu de colocar se quer ativado [On], ou desativado [Off].`, id)
        if (onar[0] == 'on') {
            client.setGroupToAdminsOnly(groupId, true).then(() => client.sendText(from, 'Aqui está a prova de poder dos ademiros!\nO silenciador :O'))
        } else if (onar[0] == 'off') {
            client.setGroupToAdminsOnly(groupId, false).then(() => client.sendText(from, 'E os membros comuns podem voltar a badernar! e.e'))
        } else {
            client.reply(from, `Você esqueceu de colocar se quer ativado [On], ou desativado [Off].`, id)
        }
    } catch (error) {
        console.log(error);
    }
};

exports.help = {
    name: "admonly",
    description: "Ativa o modo só adm no grupo, para previnir baderna",
    usage: `Para ligar\n*${prefix}admonly* _ON_\nPara desligar\n*${prefix}admonly* _OFF_`
};