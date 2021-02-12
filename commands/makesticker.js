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

        if (args.length == 0) return client.reply(from, 'Faltou algo para usar de referência!', id)

        console.log(`http://api.fdci.se/rep.php?gambar=${args.join('+')}`);
        const stkm = await fetch(`http://api.fdci.se/rep.php?gambar=${args.join('+')}`)
        const stimg = await stkm.json()
        let stkfm = stimg[Math.floor(Math.random() * stimg.length) + 1]
        console.log(stkfm)
        await client.sendStickerfromUrl(from, stkfm)
            .catch(() => {
                client.reply(from, 'Nenhuma imagem recebida ou servidor offline, tente mais tarde.', id)
            })

    } catch (error) {
        console.log(error);
    }
};

