const fs = require('fs-extra')
const welcomeDB = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
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

        // const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        // const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : ''
        // const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        // const isOwn = sender.id
        // const isOwner = isOwn.includes(`${ownerNumber}@c.us`)

        if (!isGroupMsg) return client.reply(from, 'Desculpe, mas isso é um comando para grupos.', id)
        // if (!isOwner) return client.reply(from, 'Opa! Isso é apenas meu criador, você não pode acessar.', id)
        if (args.length !== 1) return client.reply(from, 'Você esqueceu de colocar se quer ativado [on], ou desativado [off].', id)
        if (args[0] == 'on') {
            welcomeDB.push(chat.id)
            fs.writeFileSync('./database/group/welcome.json', JSON.stringify(welcomeDB))
            client.reply(from, 'Feito! As funções de Boas-Vindas e Good-Bye foram acionadas.', id)
        } else if (args[0] == 'off') {
            let getChatWelcome = welcomeDB.indexOf(chatId)
            welcomeDB.splice(getChatWelcome, 1)
            fs.writeFileSync('./database/group/welcome.json', JSON.stringify(welcomeDB))
            client.reply(from, 'Entendido! Desativei as opções de Boas-Vindas e Good-Bye.', id)
        } else {
            client.reply(from, 'Você esqueceu de colocar se quer ativado [on], ou desativado [off].', id)
        }
    } catch (error) {
        console.log(error);
    }
};

exports.help = {
    name: "Welcome",
    description: "Ative ou desative as boas vindas no grupo",
    usage: `Para ligar, use\n*${prefix}welcome* _ON_\nDesligar, use\n$*${prefix}welcome* _OFF_`
};