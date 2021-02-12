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

        const response = await axios.get('https://meme-api.herokuapp.com/gimme/memesbrasil');
        const {
            postlink, title, subreddit, url, nsfw, spoiler
        } = response.data
        client.sendFileFromUrl(from, `${url}`, 'meme.jpg', `${title}`, id)
    } catch (error) {
        console.log(error);
    }
};

