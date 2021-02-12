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
        const seanl = await axios.get(`https://api.genderize.io/?name=${args[0]}`)
        const gender = seanl.data.gender.replace('female', 'mulheres').replace('male', 'homens')
        await client.reply(from, `O nome "${seanl.data.name}" é mais usado por ${gender}.`, id)
    } catch (error) {
        console.log(error);
    }
};

exports.help = {
    name: "Gender",
    description: "Determine o gênero de um nome...",
    usage: `*${prefix}gender* _Nome_`
};