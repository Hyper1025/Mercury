const { create, Client } = require('@open-wa/wa-automate') // As const`s aqui declaram as funções de outros arquivos
const welcome = require('./lib/welcome') // Ou de módulos que usei
const msgHandler = require('./msgHandler')
//const hyper = require('./hyper')
const options = require('./options')
const color = require('./lib/color')
const fs = require('fs-extra')
const moment = require('moment-timezone')
moment.tz.setDefault('America/Sao_Paulo').locale('pt_BR')

// arquivo de configuração
const {
    ownerNumber,
    groupLimit,
    memberLimit,
    memberMinimum,
    prefix,
    alwaysAllowDDD
} = JSON.parse(fs.readFileSync('./settings/settings.json'))


// Cria um cliente de inicialização da BOT
const start = (client = new Client()) => {
    console.log(color('\n>'), color('Inicialização finalizada, os comandos podem ser usados agora...\n', 'red'))

    // Forçar recarregamento caso obtenha erros
    client.onStateChanged((state) => {
        console.log('[Estado]', state)
        if (state === 'CONFLICT' || state === 'UNLAUNCHED') client.forceRefocus()
    })

    // Le as mensagens e limpa cache
    client.onMessage((async (message) => {
        client.getAmountOfLoadedMessages()
            .then((msg) => {
                if (msg >= 100) {
                    client.cutMsgCache()
                }
            })
        msgHandler(client, message)
        //hyper(client, message)

    }))

    // Configuração do welcome
    client.onGlobalParicipantsChanged((async (event) => {
        await welcome(client, event)
    }))

    client.onAddedToGroup(async (newGroup) => {
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
                console.log(color('[SAINDO]'), color('Limite de grupos atingido', 'yellow'), 'em', color(newGroup.name))
            })
        } else if (newGroup.groupMetadata.participants.length >= memberLimit) {
            // Quando o grupo tiver o mais que o máximo de usuários
            // altere o limite no arquivo settings.json
            await client.sendText(newGroup.id, `Desculpe, o máximo de usuários permitidos em um grupo para que o bot possa ficar é de ${memberLimit}, esse grupo tem ${newGroup.groupMetadata.participants.length}.\nInfelizmente, terei de sair desse grupo ✋😔`).then(() => {
                client.leaveGroup(newGroup.id)  // Sai do grupo
                client.deleteChat(newGroup.id)  // Deleta o grupo
                console.log(color('[SAINDO]'), color('Limite de usuários atingido', 'yellow'), 'em', color(newGroup.name))
            })
        } else if (newGroup.groupMetadata.participants.length >= memberMinimum) {
            await client.sendText(newGroup.id, `Desculpe, o mínimo de usuários permitidos em um grupo para que o bot possa ficar é de ${memberMinimum}, esse grupo tem ${newGroup.groupMetadata.participants.length}.\nInfelizmente, terei de sair desse grupo ✋😔`).then(() => {
                client.leaveGroup(newGroup.id)  // Sai do grupo
                client.deleteChat(newGroup.id)  // Deleta o grupo
                console.log(color('[SAINDO]'), color('Limite de usuários atingido', 'yellow'), 'em', color(newGroup.name))
            })
        }
        else {
            await client.sendText(newGroup.id, `Olá, obrigado por me adicionar 😀\nVeja todos meus comandos usando *${prefix}menu*`)
            console.log(color('[EVENTO]'), color('Adicionado', 'green'), 'em', color(newGroup.name), 'com', color(`${newGroup.groupMetadata.participants.length} usuários`, 'magenta'))
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
