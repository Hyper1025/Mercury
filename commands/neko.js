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

        const nekol = Math.floor(Math.random() * 5) + 1
        if (nekol == 1) {
            const neko2 = await axios.get(`https://nekos.life/api/v2/img/neko`)
            await client.sendFileFromUrl(from, neko2.data.url, ``, `Nekooo`, id)
        } else if (nekol == 2) {
            const neko3 = await axios.get(`https://nekos.life/api/v2/img/ngif`)
            await client.sendFileFromUrl(from, neko3.data.url, ``, `Nekooo`, id)
        } else if (nekol == 3) {
            const neko4 = await axios.get(`https://nekos.life/api/v2/img/fox_girl`)
            await client.sendFileFromUrl(from, neko4.data.url, ``, `Nekooo`, id)
        } else if (nekol == 4) {
            const neko5 = await axios.get(`https://nekos.life/api/v2/img/kemonomimi`)
            await client.sendFileFromUrl(from, neko5.data.url, ``, `Nekoooo chann`, id)
        } else if (nekol == 5) {
            const neko6 = await axios.get(`https://arugaz.herokuapp.com/api/nekonime`)
            await client.sendFileFromUrl(from, neko6.data.result, ``, `Nekoooo chann`, id)
        }
    } catch (error) {
        console.log(error);
    }
};

