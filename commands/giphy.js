const fs = require('fs-extra')
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
        let { body } = message
        body = (type === 'chat' && body.startsWith(prefix)) ? body : ((type === 'image' && caption || type === 'video' && caption) && caption.startsWith(prefix)) ? caption : ''

        gark = body.trim().split(/ +/).slice(1)
        const link = gark.length !== 0 ? gark[0] : ''

        if (gark.length !== 1) {
            return client.reply(from, `Ownn, você esqueceu de inserir o link?`, id)
        }

        const isGiphy = link.match(new RegExp(/https?:\/\/(www\.)?giphy.com/, 'gi'))
        const isMediaGiphy = link.match(new RegExp(/https?:\/\/media.giphy.com\/media/, 'gi'))

        if (isGiphy) {
            const getGiphyCode = link.match(new RegExp(/(\/|\-)(?:.(?!(\/|\-)))+$/, 'gi'))
            if (!getGiphyCode) {
                return client.reply(from, 'Que peninha! O código de download dele está distante demais, mas talvez se você tentar novamente *apenas mais 1 vez...*', id)
            }

            const giphyCode = getGiphyCode[0].replace(/[-\/]/gi, '')
            const smallGifUrl = 'https://media.giphy.com/media/' + giphyCode + '/giphy-downsized.gif'

            client.sendGiphyAsSticker(from, smallGifUrl)
                .catch((err) => client.reply(from, `Um passarinho me disse que esse erro está relacionado ao envio do sticker...`, id))
        } else if (isMediaGiphy) {

            const gifUrl = link.match(new RegExp(/(giphy|source).(gif|mp4)/, 'gi'))
            if (!gifUrl) {
                return client.reply(from, 'Que peninha! O código de download dele está distante demais, mas talvez se você tentar novamente *apenas mais 1 vez...*', id)
            }

            const smallGifUrl = link.replace(gifUrl[0], 'giphy-downsized.gif')
            client.sendGiphyAsSticker(from, smallGifUrl)
                .catch(() => {
                    client.reply(from, `Um passarinho me disse que esse erro está relacionado ao envio do sticker...`, id)
                })
        } else {
            await client.reply(from, 'Desculpa, mas eu só posso aceitar links do giphy.', id)
        }
    } catch (error) {
        console.log(error);
    }
};

exports.help = {
    name: "giphy",
    description: "Serve para fazer figurinhas do whatsapp!\nA partir de gifs do Giphy.",
    usage: `*${prefix}giphy* _Link do giphy_`
};