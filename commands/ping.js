const processTime = (timestamp, now) => { return moment.duration(now - moment(timestamp * 1000)).asSeconds() }
const moment = require('moment-timezone')
moment.tz.setDefault('America/Sao_Paulo').locale('pt_BR')

/**
 *
 * @param {"@open-wa/wa-automate"} client
 * @param {import("@open-wa/wa-automate").Message} message
 * 
 */
exports.run = (client, message) => {
    console.log('teste');
    try {
        const { type, id, from, t, sender, author, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        client.sendText(from, `🏓 Pong!\n_Minha velocidade é de ${processTime(t, moment())} segundos._`)
    } catch (error) {
        console.log(error);
    }
};

