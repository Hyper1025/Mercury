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
        let { body } = message
        if (args.length == 0) return client.reply(from, 'Cadê a frase amigão?', id)
        if (args.length >= 100) return client.reply(from, 'Seu texto é mto longo', id)
        axios.get(`https://st4rz.herokuapp.com/api/ttp?kata=${body.slice(5)}`)
            .then(res => {
                client.sendImageAsSticker(from, res.data.result)
            }).catch(err => {
                return client.reply(from, 'Deu algo errado com o comando, provavelmente o servidor que faz as figurinhas em texto está OFF, tente novamente mais tarde 😪')
            })
    } catch (error) {
        console.log(error);
    }
};

