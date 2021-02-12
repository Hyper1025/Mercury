const fs = require('fs-extra')
const axios = require('axios')
const { prefix } = JSON.parse(fs.readFileSync('./settings/settings.json'))

/**
 * 
 * @param {"@open-wa/wa-automate"} client
 * @param {import("@open-wa/wa-automate").Message} message 
 * @param {*} args 
 */
exports.run = async (client, message, args) => {
    try {
        const { type, id, from, t, sender, author, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message

        q7 = Math.floor(Math.random() * 890) + 1;
        await client.sendFileFromUrl(from, 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + q7 + '.png', 'Pokemon.png', '', id)
    } catch (error) {
        console.log(error);
    }
};

