const { create, Client } = require('@open-wa/wa-automate') // As const`s aqui declaram as funções de outros arquivos
const welcome = require('./lib/welcome') // Ou de módulos que usei
const msgHandler = require('./msgHandler')
const options = require('./options')
const color = require('./lib/color')
const fs = require('fs-extra')
const moment = require('moment-timezone')
moment.tz.setDefault('America/Sao_Paulo').locale('pt_BR')
const availableCommands = new Set();
const { msgFilter } = require('./lib')

// arquivo de configuração
const {
    ownerNumber,
    groupLimit,
    memberLimit,
    memberMinimum,
    prefix,
    alwaysAllowDDD
} = JSON.parse(fs.readFileSync('./settings/settings.json'))

fs.readdir('./commands', (err, files) => {
    if (err) {
        return console.log(err)
    }

    files.forEach((commandFile) => {
        availableCommands.add(commandFile.replace('.js', ''))
    })
})

// Cria um cliente de inicialização da BOT
const start = (client = new Client()) => {
    console.clear();
    console.log(color('\n>'), color('Inicialização finalizada, os comandos podem ser usados agora...\n', 'green'))

    // Forçar recarregamento caso obtenha erros
    client.onStateChanged((state) => {
        console.log('[Estado]', state)
        if (state === 'CONFLICT' || state === 'UNLAUNCHED') client.forceRefocus()
    })

    // Le as mensagens e limpa cache
    client.onMessage((async (message) => {
        client.getAmountOfLoadedMessages()
            .then((msg) => {
                if (msg >= 1000) {
                    client.cutMsgCache()
                    console.clear()
                    console.log(color('[EVENTO]'), color('Cache de mensagens limpo', 'green'))
                }
            })

        // OLD:
        // require('./msgHandler.js')(client, message)
        // require('./hyper.js')(client, message)
        // Abaixo está uma versão assistida, mas afetará o desempenho
        //msgHandler(client, message)


        const { type, id, from, t, sender, author, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        const { name, formattedTitle } = chat
        let { pushname, verifiedName, formattedName } = sender
        pushname = pushname || verifiedName || formattedName

        // Para evitar problemas ao verificar os textos do WhatsApp
        // Verificamos se existe um texto, dentro de caption e dentro de message
        // Se existir, jogamos esse texto para a let msgText
        let msgText

        // verifica se é mídia
        if (isMedia) {
            // Verifica se é imagem ou vídeo
            if (type === 'image' || type === 'video') {
                // Verifica se existe conteúdo escrito
                if (caption === 'undefined' || caption === 'null' || caption === '') {
                    // Se não existir, retorna
                    return
                } else {
                    // Se existir, escreve dento de msgText
                    msgText = caption
                }
            }
        }
        else {
            // Se não for mídia, então é mensagem de texto... logo escreve o corpo da mensagem dentro de msgText
            msgText = message.body
        }

        // Carrega as variáveis
        // Verifica se é comando
        const isCmd = msgText.startsWith(prefix)

        // Verifica se o texto extraído começa com o prefixo
        if (!isCmd) {
            // Se não for comando, só joga pro log o recebimento de mensagem
            if (!isGroupMsg) { // Privado
                return console.log('> MENSAGEM AS', color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'de', color(pushname))
            }
            if (isGroupMsg) { // Grupo
                return console.log('> MENSAGEM AS', color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'de', color(pushname), 'em', color(name || formattedTitle))
            }
        }

        // Se é comando percorremos o código e extraímos os argumentos (args) e o comando (command)
        const args = msgText.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        // Percorre lista de comandos, se existir, deve executar o comando
        //
        // Regras:
        // Só deve considerar flood se o comando for aceito
        // Só deve enviar lido se o comando for aceito
        if (availableCommands.has(command)) {

            // ANTI FLOOD PRIVADO
            if (isCmd && msgFilter.isFiltered(from) && !isGroupMsg) {
                await client.reply(from, 'EI! Espere 10 segundos antes de usar outros comandos!', id)
                return console.log(color('FLOOD AS', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'de', color(pushname))
            }

            // ANTI FLOOD GRUPOS
            if (isCmd && msgFilter.isFiltered(from) && isGroupMsg) {
                await client.reply(from, 'EI! Espere 10 segundos antes de usar outros comandos!', id)
                return console.log(color('FLOOD AS', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'de', color(pushname), 'em', color(name || formattedTitle))
            }

            // LOG COMANDOS
            if (isCmd && !isGroupMsg) {
                console.log(color(`> COMANDO "${prefix}${command} [${args.length}]" AS`), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'de', color(pushname))
            }
            if (isCmd && isGroupMsg) {
                console.log(color(`> COMANDO "${prefix}${command} [${args.length}]" AS`), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'de', color(pushname), 'em', color(name || formattedTitle))
            }
            // Adiciona no filtro ANTI-SPAM
            msgFilter.addFilter(from)
            // Marca mensagem como lida
            client.sendSeen(message.chatId)
            // Executa o comando
            require(`./commands/${command}`).run(client, message, args)
        }
    }))

    // Configuração do welcome
    client.onGlobalParicipantsChanged((async (event) => {
        await welcome(client, event)
    }))

    client.onAddedToGroup(async (newGroup) => {
        console.log(color('[EVENTO]'), color('Bot sendo adicionado...', 'green'))

        const groups = await client.getAllGroups()

        if (newGroup.groupMetadata.owner.startsWith(alwaysAllowDDD)) {
            console.log(color('[EVENTO]'), color('Adicionado DDD permitido', 'green'), 'em', color(newGroup.name), 'com', color(`${newGroup.groupMetadata.participants.length} usuários`, 'magenta'))
            return await client.sendText(newGroup.id, `Olá, obrigado por me adicionar 😀\nVeja todos meus comandos usando *${prefix}menu*`)
        }

        if (groups.length >= groupLimit) {
            // Quando o limite do grupo de bots for atingido
            // altere o limite no arquivo settings.json            
            await client.sendText(newGroup.id, `Desculpe, o máximo de grupos que o Bot pode estar simultaneamente foi atingido.\nPortanto não posso ficar aqui ✋😔\n\nLimite: ${groupLimit}`).then(() => {
                client.leaveGroup(newGroup.id)  // Sai do grupo
                client.deleteChat(newGroup.id)  // Deleta o grupo
                console.log(color('[RECUSANDO CONVITE]'), color('Limite de grupos atingido', 'yellow'), 'em', color(newGroup.name))
            })
        } else if (newGroup.groupMetadata.participants.length >= memberLimit) {
            // Quando o grupo tiver o mais que o máximo de usuários
            // altere o limite no arquivo settings.json
            await client.sendText(newGroup.id, `Desculpe, o máximo de usuários permitidos em um grupo para que o bot possa ficar é de ${memberLimit}, esse grupo tem ${newGroup.groupMetadata.participants.length}.\nInfelizmente, terei de sair desse grupo ✋😔`).then(() => {
                client.leaveGroup(newGroup.id)  // Sai do grupo
                client.deleteChat(newGroup.id)  // Deleta o grupo
                console.log(color('[RECUSANDO CONVITE]'), color('Limite de usuários atingido', 'yellow'), 'em', color(newGroup.name))
            })
        } else if (newGroup.groupMetadata.participants.length <= memberMinimum) {
            await client.sendText(newGroup.id, `Desculpe, o mínimo de usuários permitidos em um grupo para que o bot possa ficar é de ${memberMinimum}, esse grupo tem ${newGroup.groupMetadata.participants.length}.\nInfelizmente, terei de sair desse grupo ✋😔`).then(() => {
                client.leaveGroup(newGroup.id)  // Sai do grupo
                client.deleteChat(newGroup.id)  // Deleta o grupo
                console.log(color('[RECUSANDO CONVITE]'), color('Não tem mínimo de usuários', 'yellow'), 'em', color(newGroup.name))
            })
        }
        else {
            await client.sendText(newGroup.id, `Olá, obrigado por me adicionar 😀\nVeja todos meus comandos usando *${prefix}menu*`)
            console.log(color('[ADICIONADO]'), color('Adicionado', 'green'), 'em', color(newGroup.name), 'com', color(`${newGroup.groupMetadata.participants.length} usuários`, 'magenta'))
        }
    });

    // analise de mensagens
    client.onAnyMessage((lise) => {
        messageLog(lise.fromMe, lise.type)
    })

    // Bloqueia na call
    client.onIncomingCall((async (call) => {
        await client.sendText(call.peerJid, 'Que pena! Chamadas não são suportadas e atrapalham muito! 😊\nTe bloqueei para evitar novas, contate o dono para efetuar o desbloqueio. 👋')
            .then(() => client.contactBlock(call.peerJid)) // se quiser, pode inserir seu numero acima na sendText com wa.me ou apenas o numero, ou pode mudar pra client.sendTextWithMentions pra enviar te marcando
    }))
}

create(options(true, start))
    .then((client) => start(client))
    .catch((err) => new Error(err))
