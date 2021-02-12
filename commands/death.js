const fs = require('fs-extra')
const { prefix } = JSON.parse(fs.readFileSync('./settings/settings.json'))
const axios = require('axios')

/**
 * 
 * @param {"@open-wa/wa-automate"} client
 * @param {import("@open-wa/wa-automate").Message} message 
 * @param {*} args 
 */
exports.run = async (client, message, args) => {
    try {
        const { type, id, from, t, sender, author, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message

        if (args.length == 0) return client.reply(from, 'Coloque um nome, apenas um, nada de sobrenome ou nomes inteiros, ainda mais por sua segurança!', id)
        const predictDeath = await axios.get(`https://api.agify.io/?name=${args[0]}`)
        await client.reply(from, `Pessoas com este nome "${predictDeath.data.name}" tendem a morrer aos ${predictDeath.data.age} anos de idade.`, id)
    } catch (error) {
        console.log(error);
    }
};

exports.help = {
    name: "Death",
    description: "Digo para você com quantos anos geralmente pessoas morrem, baseado no seu nome",
    usage: `*${prefix}death* _Nome_`
};