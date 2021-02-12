const fs = require('fs-extra')
const { ownerNumber, prefix, botName, memberLimit, memberMinimum, groupLimit, alwaysAllowDDD, DddCountryAllowed } = JSON.parse(fs.readFileSync('./settings/settings.json'))

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
        let { pushname, verifiedName, formattedName } = sender
        pushname = pushname || verifiedName || formattedName

        if (args.length == 0) return client.reply(from, 'Sei la, tem algo errado nisso ai!', id)

        const groupLink = body.slice(8)
        const allGroups = await client.getAllGroups()
        const isLink = groupLink.match(/(https:\/\/chat.whatsapp.com)/gi)
        const check = await client.inviteInfo(groupLink)

        if (!isLink) return client.reply(from, 'Link errado', id)

        if (from.startsWith(alwaysAllowDDD)) { // entra em grupos que tenham ddd em 'alwaysAllowDDD' definido no arquivo 'settings.json', independentemente da quantidade de membros ou grupos
            if (check.status === 200) {
                await client.joinGroupViaLink(groupLink)
                await client.reply(from, 'Entrando no grupo...', id)
            } else {
                await client.reply(from, 'Link invalido', id)
            }
        }
        else {
            if (allGroups.length >= groupLimit) return client.reply(from, `Desculpe, o máximo de grupos que o Bot pode estar simultaneamente foi atingido.\nPortanto não posso ficar aqui ✋😔\n\nLimite: ${groupLimit}`, id)
            if (check.size >= memberLimit) return client.reply(from, `Desculpe, o máximo de usuários permitidos em um grupo para que o bot possa ficar é de ${memberLimit}, esse grupo tem ${check.size}.\nInfelizmente, terei de sair desse grupo ✋😔`)
            if (check.size <= memberMinimum) return client.reply(from, `Desculpe, o mínimo de usuários permitidos em um grupo para que o bot possa ficar é de ${memberMinimum}, esse grupo tem ${check.size}.\nInfelizmente, não posso entrar no grupo ✋😔`, id)
            if (check.status === 200) {
                await client.joinGroupViaLink(groupLink)
                await client.reply(from, 'Entrando no grupo...')
            } else {
                await client.reply(from, 'Link invalido', id)
            }
        }
    } catch (error) {
        console.log(error);
    }
};

exports.help = {
    name: "entrar",
    description: "Adiciona o bot em um grupo",
    usage: `*${prefix}entrar* _Link do grupo_`
};