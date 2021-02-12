const fs = require('fs-extra')
const { prefix } = JSON.parse(fs.readFileSync('./settings/settings.json'))
const axios = require('axios')
const { randomNimek, sleep, wall, tulis, ss } = require('../lib/functions')

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

        if (!isGroupMsg) return client.reply(from, 'Apenas grupos!', id)
        await client.reply(from, 'Calculando foto dos participantes do grupo...', id)
        await sleep(3000)
        const eu = await client.getGroupMembers(groupId)
        const gostosa = eu[Math.floor(Math.random() * eu.length)]
        console.log(gostosa.id)
        await client.sendTextWithMentions(from, `*ＤＥＴＥＣＴＯＲ   ＤＥ  ＧＯＳＴＯＳＡＳ👩‍⚕️*\n\n*pi pi pi pi*  \n*pipipipi🚨🚨🚨pipipipi🚨🚨🚨pipipipi🚨🚨🚨pipi*\n\n@${gostosa.id.replace(/@c.us/g, '')} *PARADA(O) AÍ🖐*\n\n*VOCÊ ACABA DE RECEBER DUAS MULTAS*\n\n*1 por não dar bom dia,boa tarde,boa noite e outra por ser muito*\n\n*gostosa(o)*\n\n*valor da multa:*\n*FOTO DA TETINHA NO PV kkkkk*`)
    } catch (error) {
        console.log(error);
    }
};

