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
        let { body } = message

        if (args.length == 0) return client.reply(from, 'Faltou a pesquisa!', id)
        const linp = await fetch(`http://api.fdci.se/rep.php?gambar=${body.slice(7)}`)
        const pint = await linp.json()

        if (pint === undefined || pint === null) {
            return client.reply(from, 'Nenhuma imagem recebida ou servidor offline, tente mais tarde.', id)
        }

        let erest = pint[Math.floor(Math.random() * pint.length) + 1]
        await client.sendFileFromUrl(from, erest, '', 'Havia muitas mas espero que curta a imagem que eu escolhi ^^!', id)
            .catch(() => {
                client.reply(from, 'Nenhuma imagem recebida ou servidor offline, tente mais tarde.', id)
            })
    } catch (error) {
        console.log(error);
    }
};

