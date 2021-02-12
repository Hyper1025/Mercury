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

        if (args.length == 1) return client.reply(from, 'Compreensivel, mas não usavel, você esqueceu de definir idioma e frase.')
        const ttsId = require('node-gtts')('id')
        const ttsEn = require('node-gtts')('en')
        const ttsJp = require('node-gtts')('ja')
        const ttsAr = require('node-gtts')('ar')
        const ttsAf = require('node-gtts')('af')
        const ttsSq = require('node-gtts')('sq')
        const ttsHy = require('node-gtts')('hy')
        const ttsCa = require('node-gtts')('ca')
        const ttsZh = require('node-gtts')('zh')
        const ttsCn = require('node-gtts')('zh-cn')
        const ttsTw = require('node-gtts')('zh-tw')
        const ttsYu = require('node-gtts')('zh-yue')
        const ttsHr = require('node-gtts')('hr')
        const ttsCs = require('node-gtts')('cs')
        const ttsDa = require('node-gtts')('da')
        const ttsNl = require('node-gtts')('nl')
        const ttsAu = require('node-gtts')('en-au')
        const ttsUk = require('node-gtts')('en-uk')
        const ttsUs = require('node-gtts')('en-us')
        const ttsEo = require('node-gtts')('eo')
        const ttsFi = require('node-gtts')('fi')
        const ttsFr = require('node-gtts')('fr')
        const ttsEl = require('node-gtts')('el')
        const ttsHt = require('node-gtts')('ht')
        const ttsHi = require('node-gtts')('hi')
        const ttsHu = require('node-gtts')('hu')
        const ttsIs = require('node-gtts')('is')
        const ttsIt = require('node-gtts')('it')
        const ttsKo = require('node-gtts')('ko')
        const ttsLa = require('node-gtts')('la')
        const ttsLv = require('node-gtts')('lv')
        const ttsMk = require('node-gtts')('mk')
        const ttsNo = require('node-gtts')('no')
        const ttsPl = require('node-gtts')('pl')
        const ttsRo = require('node-gtts')('ro')
        const ttsSr = require('node-gtts')('sr')
        const ttsSk = require('node-gtts')('sk')
        const ttsEs = require('node-gtts')('es')
        const ttsSp = require('node-gtts')('es-es')
        const ttsSu = require('node-gtts')('es-us')
        const ttsSw = require('node-gtts')('sw')
        const ttsSv = require('node-gtts')('sv')
        const ttsTa = require('node-gtts')('ta')
        const ttsTh = require('node-gtts')('th')
        const ttsTr = require('node-gtts')('tr')
        const ttsVi = require('node-gtts')('vi')
        const ttsCy = require('node-gtts')('cy')
        const ttsDe = require('node-gtts')('de')
        const ttsBr = require('node-gtts')('pt-br')
        const ttsPt = require('node-gtts')('pt')
        const ttsRu = require('node-gtts')('ru')
        const dataText = body.slice(8)
        if (dataText === '') return client.reply(from, 'Ora ora, temos um baka! Você esqueceu de colocar a frase pra falar.', id)
        if (dataText.length > 500) return client.reply(from, 'Desculpa, mas o limite são 500 letras...', id)
        var dataBhs = body.slice(5, 7).toLowerCase()
        if (dataBhs == 'id') {
            ttsId.save('./temp/tts/resId.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resId.mp3', id)
            })
        } else if (dataBhs == 'en') {
            ttsEn.save('./temp/tts/resEn.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resEn.mp3', id)
            })
        } else if (dataBhs == 'jp') {
            ttsJp.save('./temp/tts/resJp.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resJp.mp3', id)
            })
        } else if (dataBhs == 'de') {
            ttsDe.save('./temp/tts/resDe.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resDe.mp3', id)
            })
        } else if (dataBhs == 'br') {
            ttsBr.save('./temp/tts/resBr.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resBr.mp3', id)
            })
        } else if (dataBhs == 'ru') {
            ttsRu.save('./temp/tts/resRu.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resRu.mp3', id)
            })
        } else if (dataBhs == 'ar') {
            ttsAr.save('./temp/tts/resAr.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resAr.mp3', id)
            })
        } else if (dataBhs == 'pt') {
            ttsPt.save('./temp/tts/resPt.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resPt.mp3', id)
            })
        } else if (dataBhs == 'af') {
            ttsAf.save('./temp/tts/resAf.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resAf.mp3', id)
            })
        } else if (dataBhs == 'sq') {
            ttsSq.save('./temp/tts/resSq.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resSq.mp3', id)
            })
        } else if (dataBhs == 'hy') {
            ttsHy.save('./temp/tts/resHy.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resHy.mp3', id)
            })
        } else if (dataBhs == 'ca') {
            ttsCa.save('./temp/tts/resCa.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resCa.mp3', id)
            })
        } else if (dataBhs == 'zh') {
            ttsZh.save('./temp/tts/resZh.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resZh.mp3', id)
            })
        } else if (dataBhs == 'cn') {
            ttsCn.save('./temp/tts/resCn.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resCn.mp3', id)
            })
        } else if (dataBhs == 'tw') {
            ttsTw.save('./temp/tts/resTw.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resTw.mp3', id)
            })
        } else if (dataBhs == 'yu') {
            ttsYu.save('./temp/tts/resYue.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resYue.mp3', id)
            })
        } else if (dataBhs == 'hr') {
            ttsHr.save('./temp/tts/resHr.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resHr.mp3', id)
            })
        } else if (dataBhs == 'cs') {
            ttsCs.save('./temp/tts/resCs.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resCs.mp3', id)
            })
        } else if (dataBhs == 'da') {
            ttsDa.save('./temp/tts/resDa.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resDa.mp3', id)
            })
        } else if (dataBhs == 'nl') {
            ttsNl.save('./temp/tts/resNl.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resNl.mp3', id)
            })
        } else if (dataBhs == 'au') {
            ttsAu.save('./temp/tts/resAu.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resAu.mp3', id)
            })
        } else if (dataBhs == 'uk') {
            ttsUk.save('./temp/tts/resUk.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resUk.mp3', id)
            })
        } else if (dataBhs == 'us') {
            ttsUs.save('./temp/tts/resUs.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resUs.mp3', id)
            })
        } else if (dataBhs == 'eo') {
            ttsEo.save('./temp/tts/resEo.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resEo.mp3', id)
            })
        } else if (dataBhs == 'fi') {
            ttsFi.save('./temp/tts/resFi.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resFi.mp3', id)
            })
        } else if (dataBhs == 'fr') {
            ttsFr.save('./temp/tts/resFr.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resFr.mp3', id)
            })
        } else if (dataBhs == 'el') {
            ttsEl.save('./temp/tts/resEl.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resEl.mp3', id)
            })
        } else if (dataBhs == 'ht') {
            ttsHt.save('./temp/tts/resJp.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resHt.mp3', id)
            })
        } else if (dataBhs == 'hi') {
            ttsHi.save('./temp/tts/resHi.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resHi.mp3', id)
            })
        } else if (dataBhs == 'hu') {
            ttsHu.save('./temp/tts/resHu.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resHu.mp3', id)
            })
        } else if (dataBhs == 'is') {
            ttsIs.save('./temp/tts/resIs.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resIs.mp3', id)
            })
        } else if (dataBhs == 'it') {
            ttsIt.save('./temp/tts/resIt.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resIt.mp3', id)
            })
        } else if (dataBhs == 'ko') {
            ttsKo.save('./temp/tts/resKo.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resKo.mp3', id)
            })
        } else if (dataBhs == 'la') {
            ttsLa.save('./temp/tts/resLa.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resLa.mp3', id)
            })
        } else if (dataBhs == 'lv') {
            ttsLv.save('./temp/tts/resLv.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resLv.mp3', id)
            })
        } else if (dataBhs == 'mk') {
            ttsMk.save('./temp/tts/resMk.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resMk.mp3', id)
            })
        } else if (dataBhs == 'no') {
            ttsNo.save('./temp/tts/resNo.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resNo.mp3', id)
            })
        } else if (dataBhs == 'pl') {
            ttsPl.save('./temp/tts/resPl.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resPl.mp3', id)
            })
        } else if (dataBhs == 'ro') {
            ttsRo.save('./temp/tts/resRo.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resRo.mp3', id)
            })
        } else if (dataBhs == 'sr') {
            ttsSr.save('./temp/tts/resSr.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resSr.mp3', id)
            })
        } else if (dataBhs == 'sk') {
            ttsSk.save('./temp/tts/resSk.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resSk.mp3', id)
            })
        } else if (dataBhs == 'es') {
            ttsEs.save('./temp/tts/resEs.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resEs.mp3', id)
            })
        } else if (dataBhs == 'sp') {
            ttsSp.save('./temp/tts/resSp.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resSp.mp3', id)
            })
        } else if (dataBhs == 'su') {
            ttsSu.save('./temp/tts/resSu.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resSu.mp3', id)
            })
        } else if (dataBhs == 'sw') {
            ttsSw.save('./temp/tts/resSw.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resSk.mp3', id)
            })
        } else if (dataBhs == 'sv') {
            ttsSv.save('./temp/tts/resSv.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resSv.mp3', id)
            })
        } else if (dataBhs == 'ta') {
            ttsTa.save('./temp/tts/resTa.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resTa.mp3', id)
            })
        } else if (dataBhs == 'tr') {
            ttsTr.save('./temp/tts/resTr.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resTr.mp3', id)
            })
        } else if (dataBhs == 'vi') {
            ttsVi.save('./temp/tts/resVi.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resVi.mp3', id)
            })
        } else if (dataBhs == 'cy') {
            ttsCy.save('./temp/tts/resCy.mp3', dataText, function () {
                client.sendPtt(from, './temp/tts/resCy.mp3', id)
            })
        } else {
            client.reply(from, `Hmm, '${body.slice(5, 7)}' não é um idioma compatível, para idiomas compatíveis digite ${prefix}idiomas.`, id)
        }
    } catch (error) {
        console.log(error);
    }
};

