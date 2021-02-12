const fs = require('fs-extra')
const { prefix } = JSON.parse(fs.readFileSync('./settings/settings.json'))
const { translate, msgFilter, meme, urlShortener, killo } = require('../lib')
const ytdl = require('ytdl-core');
const ytsr = require('ytsr')
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
ffmpeg.setFfmpegPath(ffmpegPath);

/**
 * 
 * @param {"@open-wa/wa-automate"} client
 * @param {import("@open-wa/wa-automate").Message} message 
 * @param {*} args 
 */
exports.run = async (client, message, args) => {
    try {
        const { type, id, from, t, sender, author, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message

        if (args.length == 0) return client.reply(from, `Baixe vídeos do youtube\nUso: ${prefix}ytmp4 [link_yt]`, id)
        if (!ytdl.validateURL(args[0])) return client.reply(from, `O url não é válido`, id) //  Verifica se é um url valido do youtube
        const video = await ytdl.getInfo(args[0])

        const videoSort = video.formats.sort(
            (a, b) => parseInt(b.height) - parseInt(a.height)
        );

        const videoData = videoSort.filter(
            (format) =>
                format.container === 'mp4' &&
                format.hasAudio === true &&
                format.hasVideo === true
        )[0];

        const shortUrl = await urlShortener(videoData.url);
        console.log('Video link: ' + shortUrl);

        if (videoData.contentLength != undefined) {
            console.log(videoData.contentLength);
            if (videoData.contentLength >= 15000000) {
                return client.reply(from, `Desculpe, para evitar banimentos do WhatsApp, o limite de envio de videos é de 16MB, e esse possui ${mp4impo.replace('    ', ' ')}.\n\nPorém vou deixar o link para você baixar aqui: ${shortUrl}`, id)
            } else {
                client.reply(from, `Preparando *${video.videoDetails.title}*\nAguarde...`, id)
                await client.sendFileFromUrl(message.chatId, videoData.url, 'youtube.mp4', `Link de download: ${shortUrl}`
                );
            }
        } else {
            await client.reply(message.chatId, `*${video.videoDetails.title}*\n\nTalvez o vídeo era muito grande, ou eu não consegui avaliar o tamanho dele...\n De qualquer forma, aqui está o link de download: ${shortUrl}`, id)
        }

    } catch (error) {
        console.log(error);
    }
};

