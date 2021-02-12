const fs = require('fs-extra')
const { prefix } = JSON.parse(fs.readFileSync('./settings/settings.json'))
const fetch = require('node-fetch');

/**
 * 
 * @param {"@open-wa/wa-automate"} client
 * @param {import("@open-wa/wa-automate").Message} message 
 * @param {*} args 
 */
exports.run = async (client, message, args) => {
    try {
        const { type, id, from, t, sender, author, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message

        const yam = await fetch(`http://api.fdci.se/rep.php?gambar=yaoi`)
        const yaoi = await yam.json()
        let flyaoi = yaoi[Math.floor(Math.random() * yaoi.length) + 1]
        await client.sendFileFromUrl(from, flyaoi, '', 'Tururu...', id)
            .catch(() => {
                client.reply(from, 'Nenhuma imagem recebida ou servidor offline, tente mais tarde.', id)
            })
    } catch (error) {
        console.log(error);
    }
};

