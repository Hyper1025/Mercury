const fs = require('fs-extra')
const axios = require('axios')
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

        if (double == 1) {

            q2 = Math.floor(Math.random() * 900) + 300;
            q3 = Math.floor(Math.random() * 900) + 300;
            client.sendFileFromUrl(from, 'https://placekitten.com/' + q3 + '/' + q2, 'neko.png', 'Neko ')

        } else if (double == 2) {

            const catu = await axios.get('https://nekos.life/api/v2/img/meow')
            await client.sendFileFromUrl(from, catu.data.url, id)

        }
    } catch (error) {
        console.log(error);
    }
};

