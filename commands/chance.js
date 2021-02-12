const fs = require('fs-extra')
const { prefix } = JSON.parse(fs.readFileSync('./settings/settings.json'))
const double = Math.floor(Math.random() * 2) + 1

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
        const levelPercentage = Math.floor(Math.random() * 101) + 1

        if (args.length == 0) return client.reply(from, 'Defina algo para analisar.', id)
        await client.reply(from, `_De acordo com meus calculos super avançados de ~gato femea~ robô a chance de..._ \n\n*"${body.slice(8)}"*\n\n_...ser realidade é de_ *${levelPercentage}%.*`, id)
    } catch (error) {
        console.log(error);
    }
};

