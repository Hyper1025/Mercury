const fs = require('fs-extra')
const { prefix } = JSON.parse(fs.readFileSync('./settings/settings.json'))
const ytdl = require('ytdl-core');
const ytsr = require('ytsr')
const ffmpeg = require('fluent-ffmpeg');
const color = require('../lib/color')
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
        let { body } = message

        if (args.length == 0) return client.reply(from, `Você precisa me dar algo para pesquisar\nPara ajuda: *${prefix}help play*`, id)
        const playOptions = {
            limit: 1,
            gl: 'BR',
            hl: 'pt'
        }
        const res = await ytsr(body.slice(6), playOptions).catch(err => {
            return client.reply(from, `Não consegui executar a funçõa, me desculpe 😔`, id)
        })

        const videoResult = res.items.filter(item => item.type === 'video')[0]

        if (!videoResult) {
            return client.reply(from, `Não obtive resultados para a sua pesquisa 😔`, id)
        }

        const playInfo = await ytdl.getInfo(videoResult.url, {
            quality: 'highestaudio'
        });

        let playStream = ytdl(videoResult.url, {
            quality: 'highestaudio'
        });

        let songPlayInfo = {
            title: playInfo.videoDetails.title,
            url: playInfo.videoDetails.video_url,
            lengthSeconds: playInfo.videoDetails.lengthSeconds,
            authorName: playInfo.videoDetails.author.name,
            videoId: playInfo.videoDetails.videoId,
            isPrivate: playInfo.videoDetails.isPrivate,
        }

        client.reply(from, `Encontrei *${songPlayInfo.title}*\nDe: *${songPlayInfo.authorName}*\nEspero muito que seja o correto\nAguarde...`, id)

        //console.log(songinfo);
        let testPlaySize = (((songPlayInfo.lengthSeconds * 128000) / 8) / 1024) / 1024
        console.log(color('[PLAY]'), color(`Estimativa de tamanho do vídeo: ${testPlaySize} MB`, 'cyan'))

        if (testPlaySize >= 15) {
            return client.reply(from, `O arquivo é muito grande ✋😥`, id)
        }

        if (songPlayInfo.lengthSeconds > 900) {
            return client.reply(from, `O vídeo é longo demais ✋😥`, id)
        }

        ffmpeg(playStream)
            .audioBitrate(128)
            .save(`./temp/yt/${songPlayInfo.videoId}.mp3`)
            .on('end', () => {
                var playStats = fs.statSync(`./temp/yt/${songPlayInfo.videoId}.mp3`)
                let realSize = playStats.size / (1024 * 1024);
                console.log(`Tamanho real: ${realSize} MB`);
                console.log(color('[PLAY]'), color(`Tamanho real: ${realSize} MB`, 'cyan'))
                if (realSize <= 15) {
                    client.sendFile(from, `./temp/yt/${songPlayInfo.videoId}.mp3`, `${songPlayInfo.videoId}.mp3`, null, id).then(f => {
                        try {
                            fs.unlinkSync(`./temp/yt/${songPlayInfo.videoId}.mp3`);
                            console.log(color('[PLAY]'), color(`Enviado e deletado com sucesso ${songPlayInfo.videoId}.mp3`, 'cyan'))
                        } catch (err) {
                            // handle the error
                            console.log(err);
                        }
                    })
                } else {
                    return client.reply(from, `O arquivo é muito grande ✋😥`, id)
                }
            });

    } catch (error) {
        console.log(error);
    }
};

exports.help = {
    name: "Play",
    description: "Envia o áudio de uma música do YouTube baseado na sua pesquisa, ou link do vídeo",
    usage: `*${prefix}play* _Sua pesquisa_\n*${prefix}play* _Link do YouTube_`
};