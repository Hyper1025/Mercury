const fs = require('fs-extra')
const fetch = require('node-fetch');
const { randomNimek, sleep, wall, tulis, ss } = require('../lib/functions')
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

        const isOwn = sender.id
        const isOwner = isOwn.includes(`${ownerNumber}@c.us`)

        if (!isOwner) {
            return client.reply(from, 'Esse comando só está disponível para o dono!', id)
        }

        if (args.length == 0) return client.reply(from, 'Faltou algo para usar de referência!', id)

        console.log(`http://api.fdci.se/rep.php?gambar=${args.join('+')}`);
        const serverResp = await fetch(`http://api.fdci.se/rep.php?gambar=${args.join('+')}`)
        const RespJson = await serverResp.json()

        if (RespJson.length == 0) {
            return client.reply(from, 'Nenhuma imagem recebida ou servidor offline, tente mais tarde.', id)
        }

        await client.reply(from, `Fazendo ${RespJson.length} stickers\nPor favor aguarde, e não use o comando novamente até eu terminar`, id)

        // GAMBIARRA PQ NÃO DA PRA USAR AWAIT DENTRO DE LOOPS FOREACH 🤡
        RespJson.forEach((sticker, i) => {
            setTimeout(() => {
                if (sticker != null || sticker != undefined) {
                    client.sendStickerfromUrl(from, sticker).catch(() => { console.log(''); })
                }
            }, (i * 2000) + 1000);
        });


    } catch (error) {
        console.log(error);
    }
};

