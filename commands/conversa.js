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
        let { body } = message
        body = (type === 'chat' && body.startsWith(prefix)) ? body : ((type === 'image' && caption || type === 'video' && caption) && caption.startsWith(prefix)) ? caption : ''
        const { name, formattedTitle } = chat
        const levelPercentage = Math.floor(Math.random() * 101) + 1

        try {
            const simsimi = await axios.get(`http://simsumi.herokuapp.com/api?text=${body.slice(6)}&lang=pt`)
            if (simsimi.data.success == '') {
                console.log('Request falhou, usando respostas locais...')
                let rndrl = fs.readFileSync('./database/bot/reply.txt').toString().split('\n')
                let repl = rndrl[Math.floor(Math.random() * rndrl.length)]
                let resmf = repl.replace('%name$', `${name}`).replace('%battery%', `${levelPercentage}`)
                console.log(resmf)
                client.reply(from, resmf, id)
            } else {
                await client.reply(from, simsimi.data.success, id)
            }
        } catch (error) {
            console.log('Request falhou, usando respostas locais...')
            let rndrl = fs.readFileSync('./database/bot/reply.txt').toString().split('\n')
            let repl = rndrl[Math.floor(Math.random() * rndrl.length)]
            let resmf = repl.replace('%name$', `${name}`).replace('%battery%', `${levelPercentage}`)
            console.log(resmf)
            client.reply(from, resmf, id)
        }
    } catch (error) {
        console.log(error);
    }
};

exports.help = {
    name: "conversa",
    description: "Dou uma de simsimi pra você... Então não me leve a sério.\nAntecipadamente já peço desculpas se eu enviar uma resposta muito errada\nSabe como é o simsimi 🤡",
    usage: `*${prefix}conversa* _Seu texto_`
};