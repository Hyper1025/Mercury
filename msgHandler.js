// Caso queira ver o projeto original: https://github.com/KillovSky/iris

const {
	decryptMedia
} = require('@open-wa/wa-decrypt')
const fs = require('fs-extra')
const axios = require('axios')
const sharp = require('sharp')
const math = require('mathjs')
const search = require("simple-play-store-search")
const google = require('google-it')
const isPorn = require('is-porn')
const imgSearch = require('node-reverse-image-search')
const imgbbUploader = require('imgbb-uploader')
const moment = require('moment-timezone')
moment.tz.setDefault('America/Sao_Paulo').locale('pt_BR')
const get = require('got')
const request = require('request')
const color = require('./lib/color')
const {
	spawn,
	exec,
	execFile
} = require('child_process')
const nhentai = require('nhentai-js')
const {
	API
} = require('nhentai-api')
const {
	randomNimek,
	sleep,
	wall,
	tulis,
	ss
} = require('./lib/functions')
const {
	owner,
	donate,
	down,
	help,
	admins,
	adult,
	readme,
	lang
} = require('./lib/help')
const {
	stdout
} = require('process')
const bent = require('bent')
const {
	doing
} = require('./lib/translate.js')
const {
	translate,
	msgFilter,
	meme,
	urlShortener,
	killo
} = require('./lib')
const {
	uploadImages
} = require('./lib/fether')
const feature = require('./lib/poll')
const {
	sobre
} = require('./lib/sobre')
const BrainlySearch = require('./lib/brainly')
const {
	removeBackgroundFromImageBase64
} = require('remove.bg')
const fetch = require('node-fetch');
const nsfw_ = JSON.parse(fs.readFileSync('./lib/NSFW.json'))
const welkom = JSON.parse(fs.readFileSync('./lib/welcome.json'))
const exsv = JSON.parse(fs.readFileSync('./lib/exclusive.json'))
const faki = JSON.parse(fs.readFileSync('./lib/fake.json'))
const bklist = JSON.parse(fs.readFileSync('./lib/blacklist.json'))
const atbk = JSON.parse(fs.readFileSync('./lib/anti.json'))
const errorurl = 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
const errorurl2 = 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'

// YouTube downloader e conversor
const ytdl = require('ytdl-core');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

// Arquivos de configuração
const {
	apiRemoveBg,
	apiImgBB,
	apiNasa
} = JSON.parse(fs.readFileSync('./settings/api.json'))

const {
	ownerNumber,
	groupLimit,
	prefix,
	memberLimit,
	memberMinimum,
	botName
} = JSON.parse(fs.readFileSync('./settings/settings.json'))


module.exports = msgHandler = async (client, message) => {
	try {
		const {
			type,
			id,
			from,
			t,
			sender,
			author,
			isGroupMsg,
			chat,
			chatId,
			caption,
			isMedia,
			mimetype,
			quotedMsg,
			quotedMsgObj,
			mentionedJidList
		} = message
		let {
			body
		} = message
		const {
			name,
			formattedTitle
		} = chat
		let {
			pushname,
			verifiedName,
			formattedName
		} = sender
		pushname = pushname || verifiedName || formattedName
		const double = Math.floor(Math.random() * 2) + 1
		const four = Math.floor(Math.random() * 4) + 1
		const triple = Math.floor(Math.random() * 3) + 1
		const cinco = Math.floor(Math.random() * 5) + 1
		const six = Math.floor(Math.random() * 6) + 1
		const seven = Math.floor(Math.random() * 7) + 1
		const lvpc = Math.floor(Math.random() * 101) + 1
		const time = moment(t * 1000).format('DD/MM HH:mm:ss')
		const processTime = (timestamp, now) => {
			return moment.duration(now - moment(timestamp * 1000)).asSeconds()
		}
		const botNumber = await client.getHostNumber()
		const blockNumber = await client.getBlockedIds()
		const groupId = isGroupMsg ? chat.groupMetadata.id : ''
		const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : ''
		const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
		const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false
		const chats = (type === 'chat') ? body : (type === 'image' || type === 'video') ? caption : ''
		const isOwn = sender.id
		const isOwner = isOwn.includes(`${ownerNumber}@c.us`)
		global.pollfile = 'poll_Config_' + chat.id + '.json'
		global.voterslistfile = 'poll_voters_Config_' + chat.id + '.json'
		global.client = client
		const isLeg = exsv.includes(chatId)
		const isNsfw = isGroupMsg ? nsfw_.includes(chat.id) : false
		const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi)


		// Bot Prefix
		body = (type === 'chat' && body.startsWith(prefix)) ? body : ((type === 'image' && caption || type === 'video' && caption) && caption.startsWith(prefix)) ? caption : ''


		if (type === 'image' || type === 'video') {
			if (caption === 'undefined' || caption === 'null' || caption === '') {
				console.log('retornando');
				return
			}
		}

		const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
		const arg = body.trim().substring(body.indexOf(' ') + 1)
		const args = body.trim().split(/ +/).slice(1)
		const isCmd = body.startsWith(prefix)
		const url = args.length !== 0 ? args[0] : ''
		const uaOverride = process.env.UserAgent
		const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
		const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'


		const mess = {
			wait: '⏳ Em andamento, aguarde por favor aguarde',
			error: {
				St: 'Você usou errado haha!\nPara usar isso, envie ou marque uma foto com essa mensagem.',
				Ki: 'Para remover administradores, você precisa primeiro remover o ADM deles.',
				Ad: 'Erros! Não pude adicionar, pode ser por limitação de adicionar ou erros meus.',
				Go: 'Oras, apenas o dono de um grupo pode usar esse tipo de comando.',
				Kl: 'Opa! Isso é apenas meu criador, você não pode acessar.',
				Ga: 'Apenas Administradores podem usar, então trate de virar um haha!',
				Gp: 'Desculpe, mas isso é um comando para grupos.',
				Ac: `Somente grupos que permitem conteúdo +18 podem usar comandos assim, se você é o dono e quer isso, use ${prefix}nsfw enable, ou use no PV.`,
				Ba: 'Caro administrador, se quiser que eu use esses comandos, precisa me deixar ser um ademir!',
				Iv: 'Esse link está correto? Ele me parece errado...'
			}
		}


		// ANTI GRUPOS && ANTI PORNO
		// if (isGroupMsg && isLeg && !isGroupAdmins && !isOwner) {
		// 	if (chats.match(/(https?:\/\/chat.whatsapp.com)/gi)) {
		// 		console.log('Verificando o link de grupo recebido.')
		// 		const check = await client.inviteInfo(chats)
		// 		if (check.status == 200) {
		// 			client.removeParticipant(groupId, sender.id)
		// 			console.log('Era link real então removi o ' + sender.id)
		// 		} else {
		// 			console.log('Link de grupo recebido! Mas é falso, não representa ameaças')
		// 		}
		// 	} else if (chats.match(/\bhttps?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi)) {
		// 		const chatpn = chats.match(/\bhttps?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi)
		// 		const flnrl = new URL(chatpn)
		// 		console.log('Verificando se há pornografia no link recebido...\n' + flnrl)
		// 		isPorn(flnrl.hostname, function (error, status) {
		// 			if (status == true) {
		// 				client.removeParticipant(groupId, sender.id)
		// 				console.log('Tinha pornografia então removi o ' + sender.id)
		// 			}
		// 		})
		// 	}
		// } else {
		// 	if (chats.match(/(https?:\/\/chat.whatsapp.com)/gi)) {
		// 		console.log('Link de grupo recebido, mas foi por alguém da White List ou no PV.')
		// 	}
		// }


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


		// MENSAGENS
		if (!isCmd && !isGroupMsg) {
			return console.log('> MENSAGEM AS', color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'de', color(pushname))
		}
		if (!isCmd && isGroupMsg) {
			return console.log('> MENSAGEM AS', color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'de', color(pushname), 'em', color(name || formattedTitle))
		}

		// COMANDOS
		if (isCmd && !isGroupMsg) {
			console.log(color(`> COMANDO "${prefix}${command} [${args.length}]" AS`), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'de', color(pushname))
		}
		if (isCmd && isGroupMsg) {
			console.log(color(`> COMANDO "${prefix}${command} [${args.length}]" AS`), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'de', color(pushname), 'em', color(name || formattedTitle))
		}

		if (isCmd) {
			client.sendSeen(chatId)
		}

		// Impede SPAM
		msgFilter.addFilter(from)


		switch (command) {

			case 'fig':
			case 'sticker':
			case 'stiker':
				if (isMedia && type === 'image') {
					const mediaData = await decryptMedia(message, uaOverride)

					await sharp(mediaData)
						.resize(512, 512, {
							fit: sharp.fit.contain,
							background: { r: 0, g: 0, b: 0, alpha: 0 }
						})
						.toFile('./lib/media/sticker.png')

					var imgReadToBase = await fs.readFileSync('./lib/media/sticker.png', {
						encoding: "base64"
					})

					await client.sendImageAsSticker(from, `data:image/jpeg;base64,${imgReadToBase.toString('base64')}`)
						.catch(() => {
							client.reply(from, 'Erro', id)
						})

				} else if (quotedMsg && quotedMsg.type == 'image') {

					const mediaData = await decryptMedia(quotedMsg, uaOverride)

					await sharp(mediaData)
						.resize(512, 512, {
							fit: sharp.fit.contain,
							background: { r: 0, g: 0, b: 0, alpha: 0 }
						})
						.toFile('./lib/media/sticker.png')

					var imgReadToBase = await fs.readFileSync('./lib/media/sticker.png', {
						encoding: "base64"
					})

					await client.sendImageAsSticker(from, `data:image/jpeg;base64,${imgReadToBase.toString('base64')}`)
						.catch(() => {
							client.reply(from, 'Erro', id)
						})
				} else if (args.length == 1) {
					const url = args[1]
					if (url.match(isUrl)) {
						await client.sendStickerfromUrl(from, url, {
							method: 'get'
						})
							.catch(err => console.log('Erro: ', err))
					} else {
						client.reply(from, mess.error.Iv, id)
					}
				} else {
					client.reply(from, mess.error.St, id)
				}
				break

			case 'figc':
			case 'stickercover':
			case 'stikercover':
				if (isMedia && type === 'image') {
					const mediaData = await decryptMedia(message, uaOverride)
					sharp(mediaData)
						.resize(512, 512, {
							fit: sharp.fit.cover
						})
						.flatten(true)
						.toBuffer()
						.then(async (resizedImageBuffer) => {
							let resizedImageData = resizedImageBuffer.toString('base64');
							let resizedBase64 = `data:${mimetype};base64,${resizedImageData}`;
							await client.sendImageAsSticker(from, resizedBase64)
						})
				} else if (quotedMsg && quotedMsg.type == 'image') {
					const mediaData = await decryptMedia(quotedMsg, uaOverride)
					sharp(mediaData)
						.resize(512, 512, {
							fit: sharp.fit.cover
						})
						.flatten(true)
						.toBuffer()
						.then(async (resizedImageBuffer) => {
							let resizedImageData = resizedImageBuffer.toString('base64');
							let resizedBase64 = `data:${quotedMsg.mimetype};base64,${resizedImageData}`;
							await client.sendImageAsSticker(from, resizedBase64)
						})
				} else if (args.length == 1) {
					const url = args[1]
					if (url.match(isUrl)) {
						await client.sendStickerfromUrl(from, url, {
							method: 'get'
						})
							.catch(err => console.log('Erro: ', err))
					} else {
						client.reply(from, mess.error.Iv, id)
					}
				} else {
					client.reply(from, mess.error.St, id)
				}
				break


			case 'ttp':
				if (args.length == 0) return client.reply(from, 'Cadê a frase né?', id)
				if (args.length >= 100) return client.reply(from, 'Seu texto é mto longo', id)
				axios.get(`https://st4rz.herokuapp.com/api/ttp?kata=${body.slice(5)}`)
					.then(res => {
						client.sendImageAsSticker(from, res.data.result)
					})
				break

			case 'fignobg':
			case 'stickernobg':
				if (isMedia && type == 'image') {

					try {
						var mediaData = await decryptMedia(message, uaOverride)
						var imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
						var base64img = imageBase64
						var outFile = './lib/media/img/noBg.png'
						var result = await removeBackgroundFromImageBase64({
							base64img,
							apiKey: apiRemoveBg,
							size: 'auto',
							type: 'auto',
							outFile
						})
						await fs.writeFile(outFile, result.base64img)
						await client.sendImageAsSticker(from, `data:${mimetype};base64,${result.base64img}`)
						await client.reply(from, 'Certifique-se de evitar usar isso quando não precisar,', id)
					} catch (err) {
						console.log(err)
						await client.reply(from, 'Ups! Parece que a API chegou no seu limite de usos diários!\nTente novamente amanha', id)
					}
				} else if (quotedMsg && quotedMsg.type == 'image') {
					try {
						var mediaData = await decryptMedia(quotedMsg, uaOverride)
						var imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
						var base64img = imageBase64
						var outFile = './lib/media/img/noBg.png'
						var result = await removeBackgroundFromImageBase64({
							base64img,
							apiKey: apiRemoveBg,
							size: 'auto',
							type: 'auto',
							outFile
						})
						await fs.writeFile(outFile, result.base64img)
						await client.sendImageAsSticker(from, `data:${quotedMsg.mimetype};base64,${result.base64img}`)
						await client.reply(from, 'Certifique-se de evitar usar isso quando não precisar,', id)
					} catch (err) {
						console.log(err)
						await client.reply(from, 'Ups! Parece que a API chegou no seu limite de usos diários!\nTente novamente amanha', id)
					}

				} else {
					await client.reply(from, `Ups! preciso que me envie a imagem com a legenda ${prefix}stickernobg `, id)
				}
				break

			case 'figg':
			case 'stickergif':
			case 'stikergif':
			case 'gif':
				if (isMedia) {
					if (mimetype === 'video/mp4' && message.duration < 10 || mimetype === 'image/gif' && message.duration < 15) {
						var mediaData = await decryptMedia(message, uaOverride)
						client.reply(from, mess.wait, id)
						var filename = `./lib/media/stickergif.${mimetype.split('/')[1]}`
						await fs.writeFileSync(filename, mediaData)
						await exec(`gify ${filename} ./lib/media/stickergf.gif --fps=15 --scale=256:256`, async function (error, stdout, stderr) {
							var gif = await fs.readFileSync('./lib/media/stickergf.gif', {
								encoding: "base64"
							})
							await client.sendImageAsSticker(from, `data:image/gif;base64,${gif.toString('base64')}`)
								.catch(() => {
									client.reply(from, 'Aff! A conversão obteve erros, talvez seja o tamanho do gif ou seu peso.', id)
								})
						})
					} else {
						client.reply(from, `Caso receba isso considere 2 motivos.\n\n1 - Isso não é um gif ou video.\n\n2 - O gif ou video tem mais de 15 segundos, passando do limite que posso converter`, id)
					}
				} else if (quotedMsg) {
					if (quotedMsg.mimetype == 'video/mp4' && quotedMsg.duration < 15 || quotedMsg.mimetype == 'image/gif' && quotedMsg.duration < 15) {
						var mediaData = await decryptMedia(quotedMsg, uaOverride)
						client.reply(from, mess.wait, id)
						var filename = `./lib/media/stickergif.${quotedMsg.mimetype.split('/')[1]}`
						await fs.writeFileSync(filename, mediaData)
						await exec(`gify ${filename} ./lib/media/stickergf.gif --fps=15 --scale=256:256`, async function (error, stdout, stderr) {
							var gif = await fs.readFileSync('./lib/media/stickergf.gif', {
								encoding: "base64"
							})
							await client.sendImageAsSticker(from, `data:image/gif;base64,${gif.toString('base64')}`)
								.catch(() => {
									client.reply(from, 'Aff! A conversão obteve erros, talvez seja o tamanho do gif ou seu peso.', id)
								})
						})
					} else {
						client.reply(from, `Caso receba isso considere 2 motivos.\n\n1 - Isso não é um gif ou video.\n\n2 - O gif ou video tem mais de 15 segundos, passando do limite que posso converter.`, id)
					}
				} else {
					client.reply(from, mess.error.St, id)
				}
				break


			case 'simg':
				if (isMedia && type === 'image') {
					const mediaData = await decryptMedia(message, uaOverride)
					client.reply(from, 'Aguarde, leva mais de 20 segundos.\n\n *NÃO USE NOVAMENTE* até eu terminar, caso contrario, as funções todas serão bloqueadas por IP.', id)
					const sendres = (results) => {
						const ttile = results[0].title.replace('<span>', '').replace('</span>', '')
						const ttscig = results[1].title.replace('<span>', '').replace('</span>', '')
						client.reply(from, `*${ttile}*\n\n*Titulo >* ${ttscig}\n\n${results[1].url}`, id)
						console.log(results)
					}
					var seaimg = './lib/media/img/imagesearch.jpg'
					await fs.writeFile(seaimg, mediaData)
					const upimg = await imgbbUploader(apiImgBB, seaimg) // Bote uma api do imgbb pras suas fotos n irem pra minha conta
					console.log(upimg.url)
					await sleep(10000)
					const resimg = await imgSearch(upimg.url, sendres)
				} else {
					await client.reply(from, 'Amigo(a), isso somente funciona com imagens...', id)
				}
				break


			case 'upimg':
				if (isMedia && type === 'image') {
					const mediaData = await decryptMedia(message, uaOverride)
					var uplimg = './lib/media/img/imageupl.jpg'
					await fs.writeFile(uplimg, mediaData)
					const sdimg = await imgbbUploader(apiImgBB, uplimg) // Bote uma api do imgbb pras suas fotos n irem pra minha conta
					console.log(sdimg.url_viewer)
					await client.reply(from, `*OBS!* _Essa link tem duração de 7 dias, após isso a imagem será automaticamente deletada do servidor._\n\n${sdimg.url_viewer}`, id)
				} else {
					await client.reply(from, 'Amigo(a), isso somente funciona com imagens.', id)
				}
				break


			case 'makesticker':
				if (args.length == 0) return client.reply(from, 'Faltou algo para usar de referência!', id)
				const stkm = await fetch(`http://api.fdci.se/rep.php?gambar=${body.slice(7)}`)
				const stimg = await stkm.json()
				let stkfm = stimg[Math.floor(Math.random() * stimg.length) + 1]
				console.log(stkfm)
				await client.sendStickerfromUrl(from, stkfm)
					.catch(() => {
						client.reply(from, 'Nenhuma imagem recebida ou servidor offline, tente mais tarde.', id)
					})
				break


			case 'morte':
			case 'death':
				if (args.length == 0) return client.reply(from, 'Coloque um nome, apenas um, nada de sobrenome ou nomes inteiros, ainda mais por sua segurança!', id)
				const predea = await axios.get(`https://api.agify.io/?name=${args[0]}`)
				await client.reply(from, `Pessoas com este nome "${predea.data.name}" tendem a morrer aos ${predea.data.age} anos de idade.`, id)
				break


			case 'oculto':
				if (!isGroupMsg) return client.reply(from, 'Apenas grupos!', id)
				const eur = await client.getGroupMembers(groupId)
				const surpresa = eur[Math.floor(Math.random() * eur.length)]
				console.log(surpresa.id)
				var xvid = ["Negoes branquelos e feministas", `${pushname} se depilando na banheira`, `${pushname} comendo meu cuzinho`, `${pushname} quer me comer o que fazer?`, "lolis nuas e safadas", "Ursinhos Mansos Peludos e excitados", "mae do adm cozida na pressao", "Buceta de 500 cm inflavel da boneca chinesa lolita company", "corno manso batendo uma pra mim com meu rosto na webcam", "tigresa vip da buceta de mel", "belle delphine dando o cuzinho no barzinho da esquina", "fazendo anal no negao", "africanos nus e chupando pau", "anal africano", "comendo a minha tia", "lgbts fazendo ahegao", "adm gostoso tirando a roupa", "gays puxando o intestino pra fora", "Gore de porno de cachorro", "anoes baixinhos do pau grandao", "Anões Gays Dotados Peludos", "anões gays dotados penetradores de botas", "Ursinhos Mansos Peludos", "Jailson Mendes", "Vendo meu Amigo Comer a Esposa", "Golden Shower"]
				const surpresa2 = xvid[Math.floor(Math.random() * xvid.length)]
				await client.sendTextWithMentions(from, `*EQUIPE ❌VIDEOS*\n\n_Caro usuário @${surpresa.id.replace(/@c.us/g, '')} ..._\n\n_Sou da administração do Xvideos e nós percebemos que você não entrou em sua conta por mais de 2 semanas e decidimos checar pra saber se está tudo OK com o(a) nosso(a) usuário(a) mais ativo(a)._ \n\n_Desde a última vez que você visitou nosso site, você procurou mais de centenas de vezes por_ *"${surpresa2}"* _(acreditamos ser sua favorita), viemos dizer que elas foram adicionadas e temos certeza que você irá gostar bastante._ \n_Esperamos você lá!_\n\n_Para o nosso usuário(a) favorito(a), com carinho, Equipe Xvideos._`)
				await sleep(2000)
				break


			case 'gender':
			case 'genero':
				if (args.length == 0) return client.reply(from, 'Coloque um nome, apenas um, nada de sobrenome ou nomes inteiros, ainda mais por sua segurança!', id)
				const seanl = await axios.get(`https://api.genderize.io/?name=${args[0]}`)
				const gender = seanl.data.gender.replace('female', 'mulheres').replace('male', 'homens')
				await client.reply(from, `O nome "${seanl.data.name}" é mais usado por ${gender}.`, id)
				break


			case 'detector':
				if (!isGroupMsg) return client.reply(from, 'Apenas grupos!', id)
				await client.reply(from, 'Calculando foto dos participantes do grupo...', id)
				await sleep(3000)
				const eu = await client.getGroupMembers(groupId)
				const gostosa = eu[Math.floor(Math.random() * eu.length)]
				console.log(gostosa.id)
				await client.sendTextWithMentions(from, `*ＤＥＴＥＣＴＯＲ   ＤＥ  ＧＯＳＴＯＳＡＳ👩‍⚕️*\n\n*pi pi pi pi*  \n*pipipipi🚨🚨🚨pipipipi🚨🚨🚨pipipipi🚨🚨🚨pipi*\n\n@${gostosa.id.replace(/@c.us/g, '')} *PARADA(O) AÍ🖐*\n\n*VOCÊ ACABA DE RECEBER DUAS MULTAS*\n\n*1 por não dar bom dia,boa tarde,boa noite e outra por ser muito*\n\n*gostosa(o)*\n\n*valor da multa:*\n*FOTO DA TETINHA NO PV kkkkk*`)
				await sleep(2000)
				break



			case 'math':
				if (args.length == 0) return client.reply(from, 'Você não especificou uma conta matematica.', id)
				const mtk = body.slice(6)
				if (typeof math.evaluate(mtk) !== "number") {
					client.reply(from, `Você definiu mesmo uma conta? Isso não parece uma.`, id)
				} else {
					client.reply(from, `_A equação:_\n\n*${mtk}*\n\n_tem resultado de:_\n\n*${math.evaluate(mtk)}*`, id)
				}
				break


			case 'inverter':
				if (args.length == 0) return client.reply(from, 'Você não especificou uma frase para ser invertida.', id)
				const inver = body.slice(10).split('').reverse().join('')
				await client.reply(from, inver, id)
				break


			case 'contar':
				if (args.length == 0) return client.reply(from, 'Isso possui 0 letras, afinal, não há texto.', id)
				const count = body.slice(8).length
				await client.reply(from, `O texto possui ${count} letras.`, id)
				break


			case 'giphy':
				gark = body.trim().split(/ +/).slice(1)
				const link = gark.length !== 0 ? gark[0] : ''
				if (gark.length !== 1) return client.reply(from, `Ownn, você esqueceu de inserir o link?`, id)
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
				break


			case 'msg':
				if (args.length == 0) return client.reply(from, 'Você esqueceu de inserir uma mensagem... e.e', id)
				await client.sendText(from, `${body.slice(5)}`)
				break


			case 'id':
				if (!isGroupMsg) return client.reply(from, mess.error.Gp, id)
				client.reply(from, `A ID desse grupo é ${groupId}`, id)
				break

			case 'fake':
				if (isGroupMsg && isGroupAdmins) {
					if (args.length !== 1) return client.reply(from, 'Você esqueceu de colocar se quer ativado [on], ou desativado [off].', id)
					if (args[0] == 'on') {
						faki.push(chatId)
						fs.writeFileSync('./lib/fake.json', JSON.stringify(faki))
						client.reply(from, 'Anti-Fakes habilitado.', id)
					} else if (args[0] == 'off') {
						let yath = faki.indexOf(chatId)
						faki.splice(yath, 1)
						fs.writeFileSync('./lib/fake.json', JSON.stringify(faki))
						client.reply(from, 'Anti-fakes desabilitado.', id)
					}
				} else if (isGroupMsg && isOwner) {
					if (args.length !== 1) return client.reply(from, 'Você esqueceu de colocar se quer ativado [on], ou desativado [off].', id)
					if (args[0] == 'on') {
						faki.push(chatId)
						fs.writeFileSync('./lib/fake.json', JSON.stringify(faki))
						client.reply(from, 'Anti-Fakes habilitado.', id)
					} else if (args[0] == 'off') {
						let yath = faki.indexOf(chatId)
						faki.splice(yath, 1)
						fs.writeFileSync('./lib/fake.json', JSON.stringify(faki))
						client.reply(from, 'Anti-fakes desabilitado.', id)
					}
				} else {
					client.reply(from, mess.error.Ga, id)
				}
				break

			case 'blacklist':
				if (isGroupMsg && isGroupAdmins) {
					if (args.length !== 1) return client.reply(from, 'Defina entre on e off!', id)
					if (args[0] == 'on') {
						bklist.push(chatId)
						fs.writeFileSync('./lib/blacklist.json', JSON.stringify(bklist))
						client.reply(from, `Anti números acionado.\nUse ${prefix}bklist (Número) para adicionar números.`, id)
					} else if (args[0] == 'off') {
						let exclu = bklist.indexOf(chatId)
						bklist.splice(exclu, 1)
						fs.writeFileSync('./lib/blacklist.json', JSON.stringify(bklist))
						client.reply(from, 'Anti números offline.', id)
					}
				} else if (isGroupMsg && isOwner) {
					if (args.length !== 1) return client.reply(from, 'Defina entre on e off!', id)
					if (args[0] == 'on') {
						bklist.push(chatId)
						fs.writeFileSync('./lib/blacklist.json', JSON.stringify(bklist))
						client.reply(from, `Anti números acionado.\nUse ${prefix}bklist (Número) para adicionar números.`, id)
					} else if (args[0] == 'off') {
						let exclu = bklist.indexOf(chatId)
						bklist.splice(exclu, 1)
						fs.writeFileSync('./lib/blacklist.json', JSON.stringify(bklist))
						client.reply(from, 'Anti números offline.', id)
					}
				} else {
					client.reply(from, mess.error.Ga, id)
				}
				break


			case 'bklist':
				if (isGroupMsg && isGroupAdmins) {
					if (args.length == 0) return client.reply(from, 'Defina o número.', id)
					const bkls = body.slice(8) + '@c.us'
					atbk.push(bkls)
					fs.writeFileSync('./lib/anti.json', JSON.stringify(atbk))
					await client.reply(from, 'Número adicionado a black-list', id)
				} else if (isGroupMsg && isOwner) {
					if (args.length == 0) return client.reply(from, 'Defina o número.', id)
					const bkls = body.slice(8) + '@c.us'
					atbk.push(bkls)
					fs.writeFileSync('./lib/anti.json', JSON.stringify(atbk))
					await client.reply(from, 'Número adicionado a black-list', id)
				} else {
					client.reply(from, mess.error.Ga, id)
				}
				break


			case 'onlyadms':
				onar = body.trim().split(/ +/).slice(1)
				if (!isGroupMsg) return client.reply(from, mess.error.Gp, id)
				if (!isGroupAdmins) return client.reply(from, mess.error.Ga, id)
				if (!isBotGroupAdmins) return client.reply(from, mess.error.Ba, id)
				if (onar.length !== 1) return client.reply(from, `Você esqueceu de colocar se quer ativado [On], ou desativado [Off].`, id)
				if (onar[0] == 'on') {
					client.setGroupToAdminsOnly(groupId, true).then(() => client.sendText(from, 'Aqui está a prova de poder dos ademiros!\nO silenciador :O'))
				} else if (onar[0] == 'off') {
					client.setGroupToAdminsOnly(groupId, false).then(() => client.sendText(from, 'E os membros comuns podem voltar a badernar! e.e'))
				} else {
					client.reply(from, `Você esqueceu de colocar se quer ativado [On], ou desativado [Off].`, id)
				}
				break


			case 'revoke':
				if (!isGroupMsg) return client.reply(from, mess.error.Gp, id)
				if (!isGroupAdmins) return client.reply(from, mess.error.Ga, id)
				if (!isBotGroupAdmins) return client.reply(from, mess.error.Ba, id)
				await client.revokeGroupInviteLink(groupId).then(() => client.reply(from, 'Prontinho, sua ordem foi realizada! e.e', id))
				break

			case 'setimage':
				if (!isGroupMsg) return client.reply(from, mess.error.Gp, id)
				if (!isGroupAdmins) return client.reply(from, mess.error.Ga, id)
				if (!isBotGroupAdmins) return client.reply(from, mess.error.Ba, id)
				if (isMedia && type == 'image' || isQuotedImage) {
					const dataMedia = isQuotedImage ? quotedMsg : message
					const _mimetype = dataMedia.mimetype
					const mediaData = await decryptMedia(dataMedia, uaOverride)
					const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
					const picgp = await client.getProfilePicFromServer(chat.id)
					if (picgp == undefined) {
						var backup = errorurl
					} else {
						var backup = picgp
					}
					await client.sendFileFromUrl(from, backup, 'group.png', 'Para caso você mude de ideia...', id)
					await client.setGroupIcon(groupId, imageBase64)
				} else if (args.length == 1) {
					if (!isUrl(url)) {
						await client.reply(from, 'Tem certeza que isso é um link apenas para a foto?', id)
					}
					const picgpo = await client.getProfilePicFromServer(chat.id)
					if (picgpo == undefined) {
						var back = errorurl
					} else {
						var back = picgpo
					}
					await client.sendFileFromUrl(from, back, 'group.png', 'Caso você mude de ideia...', id)
					client.setGroupIconByUrl(groupId, url).then((r) => (!r && r !== undefined) ?
						client.reply(from, 'É o que eu pensava, não existem fotos nesse link, ou o link contem fotos demais.', id) :
						client.reply(from, 'Isso! Agora o grupo está de cara nova haha!', id))
				} else {
					client.reply(from, `Acho que você esta usando errado em!`)
				}
				break


			case 'img':
				if (quotedMsg && quotedMsg.type == 'sticker') {
					const mediaData = await decryptMedia(quotedMsg)
					client.reply(from, `Só esperar, pode levar um tempinho...`, id)
					const stickerImage = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
					await client.sendFile(from, stickerImage, '', 'Aproveite, aqui está sua foto! :D', id)
				} else if (!quotedMsg) return client.reply(from, `Desculpe, isso é somente para stickers...`, id)
				break


			case 'randomanime':
				const nime2 = await randomNimek('anime')
				console.log(nime2.data)
				await client.sendFileFromUrl(from, nime2, ``, 'Ui Ui...', id)
				break


			case 'frase':
				if (double == 1) {
					const skya = await get.get('http://mhankbarbars.herokuapp.com/api/quotesnime/random').json()
					skya_ = skya.data
					const quot = skya.data.quote
					client.reply(from, mess.wait, id)
					await sleep(5000)
					translate(quot, 'pt')
						.then((quote) => client.reply(from, `➸ *Frase* : ${quote}\n➸ *Personagem* : ${skya_.chara}\n➸ *Anime* : ${skya_.anime}`, id))
				} else if (double == 2) {
					const aiquote = await axios.get("http://inspirobot.me/api?generate=true")
					await client.sendFileFromUrl(from, aiquote.data, 'quote.jpg', '~Não entendi nada, mas vamos seguir o roteiro...~\n\n❤️', id)
				}
				break


			case 'make':
				if (args.length == 0) return client.reply(from, `Você precisa inserir uma frase após o comando.`, id)
				const nulisq = body.slice(6)
				const nulisp = await tulis(nulisq)
				await client.sendImage(from, `${nulisp}`, '', 'Belo diário este seu em amigo...', id)
					.catch(() => {
						client.reply(from, 'Que peninha, a imagem não quis enviar ou o servidor negou o acesso...', id)
					})
				break


			case 'neko':
				const nekol = Math.floor(Math.random() * 6) + 1
				if (nekol == 1) {
					const neko1 = await get.get('http://mhankbarbars.herokuapp.com/api/nekonime').json()
					await client.sendFileFromUrl(from, neko1.result, ``, `Que fofa...`, id)
				} else if (nekol == 2) {
					const neko2 = await axios.get(`https://nekos.life/api/v2/img/neko`)
					await client.sendFileFromUrl(from, neko2.data.url, ``, `Nekooo`, id)
				} else if (nekol == 3) {
					const neko3 = await axios.get(`https://nekos.life/api/v2/img/ngif`)
					await client.sendFileFromUrl(from, neko3.data.url, ``, `Nekooo`, id)
				} else if (nekol == 4) {
					const neko4 = await axios.get(`https://nekos.life/api/v2/img/fox_girl`)
					await client.sendFileFromUrl(from, neko4.data.url, ``, `Nekooo`, id)
				} else if (nekol == 5) {
					const neko5 = await axios.get(`https://nekos.life/api/v2/img/kemonomimi`)
					await client.sendFileFromUrl(from, neko5.data.url, ``, `Nekoooo chann`, id)
				} else if (nekol == 6) {
					const neko6 = await axios.get(`https://arugaz.herokuapp.com/api/nekonime`)
					await client.sendFileFromUrl(from, neko6.data.result, ``, `Nekoooo chann`, id)
				}
				break


			case 'image':
				if (args.length == 0) return client.reply(from, 'Faltou um nome!', id)
				const linp = await fetch(`http://api.fdci.se/rep.php?gambar=${body.slice(7)}`)
				const pint = await linp.json()
				let erest = pint[Math.floor(Math.random() * pint.length) + 1]
				console.log(erest)
				await client.sendFileFromUrl(from, erest, '', 'Havia muitas mas espero que curta a imagem que eu escolhi ^^!', id)
					.catch(() => {
						client.reply(from, 'Nenhuma imagem recebida ou servidor offline, tente mais tarde.', id)
					})
				break


			case 'yaoi':
				const yam = await fetch(`http://api.fdci.se/rep.php?gambar=yaoi`)
				const yaoi = await yam.json()
				let flyaoi = yaoi[Math.floor(Math.random() * yaoi.length) + 1]
				await client.sendFileFromUrl(from, flyaoi, '', 'Tururu...', id)
					.catch(() => {
						client.reply(from, 'Nenhuma imagem recebida ou servidor offline, tente mais tarde.', id)
					})
				break


			case 'life':
				const dia = await axios.get(`https://docs-jojo.herokuapp.com/api/fml`)
				var acon = dia.data.result.fml
				await sleep(5000)
				translate(acon, 'pt')
					.then((lfts) => client.reply(from, lfts, id))
				break


			case 'fox':
				const fox = await axios.get(`https://some-random-api.ml/img/fox`)
				await client.sendFileFromUrl(from, fox.data.link, ``, 'Que raposa lindinha <3', id)
				break


			case 'nasa':
				const nasa = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiNasa}`)
				console.log(nasa.data)
				const nasaTituloTraduzido = await translate(nasa.data.title, 'pt')
				const nasaMateriaTraduzido = await translate(nasa.data.explanation, 'pt')
				await client.sendFileFromUrl(from, `${nasa.data.url}`, '', `Titulo: ${nasaTituloTraduzido}\n\nData: ${nasa.data.date}\n\nAutor: ${nasa.data.copyright}\n\nMateria: ${nasaMateriaTraduzido}`, id)
					.catch(() => {
						client.reply(from, `Titulo: ${nasa.data.title}\n\nData: ${nasa.data.date}\n\nAutor: ${nasa.data.copyright}\n\nMateria: ${nasaMateriaTraduzido}\n\nURL: ${nasa.data.url}`, id)
					})
				break


			case 'ig':
				if (args.length == 0) return client.reply(from, 'Cade o link né?', id)
				const iga = await axios.get(`https://st4rz.herokuapp.com/api/ig?url=${body.slice(11)}`)
				await client.sendFileFromUrl(from, iga.data.result, ``, '~Mas o que diabos foi isso...~', id)
					.catch(() => {
						client.reply(from, 'Essa não! Impediram meu acesso!\nQue desalmados!', id)
					})
				break


			case 'fb':
				if (args.length == 0) return client.reply(from, 'Você esqueceu de inserir um link do facebook?', id)
				const fb = await axios.get(`http://arugaz.herokuapp.com/api/fb?url=${body.slice(4)}`)
				const fbdw = fb.data.result.sd
				await client.sendFileFromUrl(from, fbdw, 'video.mp4', 'Excelente video!\n~Mas o que diabos aconteceu?...~', id)
					.catch(() => {
						client.reply(from, 'Minha nossa, algum tipo de força maligna me impediu de terminar o comando!', id)
					})
				break

			case 'youtube':
				if (arg.length == 0) return client.reply(from, `Preciso que você me envie o título do vídeo`, id);
				axios.get(`https://arugaytdl.herokuapp.com/search?q=${arg}`).then(res => {
					if (res.data[0].uploadDate.endsWith('years ago')) {
						var playre = res.data[0].uploadDate.replace('years ago', 'Anos atrás')
					} else if (res.data[0].uploadDate.endsWith('hours ago')) {
						var playre = res.data[0].uploadDate.replace('hours ago', 'Horas atrás')
					} else if (res.data[0].uploadDate.endsWith('minutes ago')) {
						var playre = res.data[0].uploadDate.replace('minutes ago', 'Minutos atrás')
					} else if (res.data[0].uploadDate.endsWith('day ago')) {
						var playre = res.data[0].uploadDate.replace('day ago', 'Dia atrás')
					} else if (res.data[0].uploadDate.endsWith('months ago')) {
						var playre = res.data[0].uploadDate.replace('months ago', 'Meses atrás')
					} else if (res.data[0].uploadDate.endsWith('seconds ago')) {
						var playre = res.data[0].uploadDate.replace('seconds ago', 'Segundos atrás')
					} else if (res.data[0].uploadDate.endsWith('undefined')) {
						var videore = res.data[0].uploadDate.replace('undefined', 'Indefinido')
					} else if (res.data[0].uploadDate.endsWith('null')) {
						var videore = res.data[0].uploadDate.replace('null', 'Indefinido')
					}

					resp = JSON.parse(JSON.stringify(res.data));
					var content = `*Título:* ${resp[0].title}\n*Duração:* ${resp[0].duration} segundos\n*Enviado por:* ${resp[0].channel.name}\n*Feito a:* ${playre}\n*Visualizações:* ${res.data[0].viewCount}\n\n*Link do canal:* https://youtube.com/channel/${resp[0].channel.id}\n*Link do vídeo:* https://www.youtube.com/watch?v=${resp[0].id}`
					client.sendFileFromUrl(from, resp[0]["thumbnail"], resp[0]["id"] + '.png', content, id);
				});
				break;


			case 'mp3': // eu censurei o acesso pois as apis estão offlines, e fazer isso evita que usem o comando e te de problemas
				if (args.length == 0) return client.reply(from, `Para baixar músicas do youtube\nUso: ${prefix}ytmp3 [link_yt]`, id)
				if (!ytdl.validateURL(args[0])) return client.reply(from, `O url não é válido`, id) //  Verifica se é um url valido do youtube
				var ytmp3ID = args[0].replace('https://m.youtu.be/', '').replace('https://youtu.be/', '').replace('https://www.youtube.com/', '').replace('watch?v=', '') // Remove o link e pega só o ID
				let stream = ytdl(ytmp3ID, {
					quality: 'highestaudio'
				});

				const ytmp3video = await ytdl.getInfo(`https://www.youtube.com/watch?v=${ytmp3ID}`);

				if (ytmp3video.videoDetails.lengthSeconds > 900) {
					return client.reply(from, `O vídeo é longo demais ✋😥`, id)
				}

				const mp3size = await axios.get(`http://st4rz.herokuapp.com/api/ytv?url=https://youtu.be/${ytmp3ID}`)
				const mp3fsize = mp3size.data.filesize.replace(' MB', '').replace('Download  ', 'Impossivel calcular')
				console.log(mp3fsize)
				const mp3impo = mp3size.data.filesize.replace('Download  ', 'um peso muito superior que não posso calcular')
				if (mp3fsize >= 16.0 || mp3size.data.filesize.endsWith('Download  ') || mp3size.data.filesize.endsWith('GB')) {
					return client.reply(from, `Desculpe, para evitar banimentos do WhatsApp, o limite de envio de videos é de 16MB, e esse possui ${mp3impo.replace('    ', ' ')}.`, id)
				}

				await ytdl.getInfo(`https://www.youtube.com/watch?v=${ytmp3ID}`).then((info) => {
					client.reply(from, `Preparando *${info.videoDetails.title}*\nAguarde...`, id)
				})

				ffmpeg(stream)
					.audioBitrate(128)
					.save(`./media/yt/${ytmp3ID}.mp3`)
					.on('end', () => {
						client.sendFile(from, `./media/yt/${ytmp3ID}.mp3`, `${ytmp3ID}.mp3`, null, id).then(f => {
							try {
								fs.unlinkSync(`./media/yt/${ytmp3ID}.mp3`);
								console.log(`successfully deleted ${ytmp3ID}.mp3`);
							} catch (err) {
								// handle the error
								console.log(err);
							}
						})
					});
				break


			case 'mp4':
				if (args.length == 0) return client.reply(from, `Baixe vídeos do youtube\nUso: ${prefix}ytmp4 [link_yt]`, id)
				if (!ytdl.validateURL(args[0])) return client.reply(from, `O url não é válido`, id) //  Verifica se é um url valido do youtube
				const video = await ytdl.getInfo(args[0]);
				var ytmp3ID = args[0].replace('https://m.youtu.be/', '').replace('https://youtu.be/', '').replace('https://www.youtube.com/', '').replace('watch?v=', '') // Remove o link e pega só o ID

				const videoSort = video.formats.sort(
					(a, b) => parseInt(b.height) - parseInt(a.height)
				);

				const videoData = videoSort.filter(
					(format) =>
						format.container === 'mp4' &&
						format.hasAudio === true &&
						format.hasVideo === true
				)[0];

				const mp4size = await axios.get(`http://st4rz.herokuapp.com/api/ytv?url=https://youtu.be/${ytmp3ID}`)
				const mp4fsize = mp4size.data.filesize.replace(' MB', '').replace('Download  ', 'Impossivel calcular')
				console.log(mp4fsize)
				const mp4impo = mp4size.data.filesize.replace('Download  ', 'um peso muito superior que não posso calcular')
				const shortUrl = await urlShortener(videoData.url);
				console.log('Video link: ' + shortUrl);

				if (mp4fsize >= 16.0 || mp4size.data.filesize.endsWith('Download  ') || mp4size.data.filesize.endsWith('GB')) {
					return client.reply(from, `Desculpe, para evitar banimentos do WhatsApp, o limite de envio de videos é de 16MB, e esse possui ${mp4impo.replace('    ', ' ')}.\n\nPorém vou deixar o link para você baixar aqui: ${shortUrl}`, id)
				}

				client.reply(from, `Preparando *${video.videoDetails.title}*\nAguarde...`, id)
				await client.sendFileFromUrl(
					message.chatId,
					videoData.url,
					'youtube.mp4',
					`Link de download: ${shortUrl}`
				);
				break

			case 'video':
				if (args.length == 0) return client.reply(from, 'Você usou incorretamente.', id)
				axios.get(`http://arugaytdl.herokuapp.com/search?q=${body.slice(7)}`)
					.then(async (res) => {
						if (res.data[0].uploadDate.endsWith('years ago')) {
							var videore = res.data[0].uploadDate.replace('years ago', 'Anos atrás')
						} else if (res.data[0].uploadDate.endsWith('hours ago')) {
							var videore = res.data[0].uploadDate.replace('hours ago', 'Horas atrás')
						} else if (res.data[0].uploadDate.endsWith('minutes ago')) {
							var videore = res.data[0].uploadDate.replace('minutes ago', 'Minutos atrás')
						} else if (res.data[0].uploadDate.endsWith('day ago')) {
							var videore = res.data[0].uploadDate.replace('day ago', 'Dia atrás')
						} else if (res.data[0].uploadDate.endsWith('months ago')) {
							var videore = res.data[0].uploadDate.replace('months ago', 'Meses atrás')
						} else if (res.data[0].uploadDate.endsWith('seconds ago')) {
							var videore = res.data[0].uploadDate.replace('seconds ago', 'Segundos atrás')
						} else if (res.data[0].uploadDate.endsWith('undefined')) {
							var videore = res.data[0].uploadDate.replace('undefined', 'Indefinido')
						} else if (res.data[0].uploadDate.endsWith('null')) {
							var videore = res.data[0].uploadDate.replace('null', 'Indefinido')
						}
						const size = await axios.get(`http://st4rz.herokuapp.com/api/ytv?url=https://youtu.be/${res.data[0].id}`)
						const fsize = size.data.filesize.replace(' MB', '').replace('Download  ', 'Impossivel calcular')
						console.log(fsize)
						const impo = size.data.filesize.replace('Download  ', 'um peso muito superior que não posso calcular')
						if (fsize >= 16.0 || size.data.filesize.endsWith('Download  ') || size.data.filesize.endsWith('GB')) {
							return client.reply(from, `Desculpe, para evitar banimentos do WhatsApp, o limite de envio de videos é de 16MB, e esse possui ${impo.replace('    ', ' ')}.`, id)
						} else {
							await client.sendFileFromUrl(from, `${res.data[0].thumbnail}`, ``, `Titulo: ${res.data[0].title}\n\nDuração: ${res.data[0].duration} segundos\n\nFoi feito a: ${videore}\n\nVisualizações: ${res.data[0].viewCount}\n\nPeso: ${size.data.filesize}\n\nEspero que eu tenha acertado e...agora é so esperar! Mas evite usar novamente até que eu termine emm!`, id)
							console.log(res.data[0].title)
							axios.get(`http://st4rz.herokuapp.com/api/ytv2?url=https://youtu.be/${res.data[0].id}`)
								.then(async (rest) => {
									var mp4 = rest.data.result
									var tmp4 = rest.data.title
									await client.sendFileFromUrl(from, mp4, `video.mp4`, tmp4, id)
								})
						}
					})
				break


			case 'play':
				if (args.length == 0) return client.reply(from, 'Você usou incorretamente.', id)
				axios.get(`http://arugaytdl.herokuapp.com/search?q=${body.slice(6)}`)
					.then(async (res) => {
						if (res.data[0].uploadDate.endsWith('years ago')) {
							var playre = res.data[0].uploadDate.replace('years ago', 'Anos atrás')
						} else if (res.data[0].uploadDate.endsWith('hours ago')) {
							var playre = res.data[0].uploadDate.replace('hours ago', 'Horas atrás')
						} else if (res.data[0].uploadDate.endsWith('minutes ago')) {
							var playre = res.data[0].uploadDate.replace('minutes ago', 'Minutos atrás')
						} else if (res.data[0].uploadDate.endsWith('day ago')) {
							var playre = res.data[0].uploadDate.replace('day ago', 'Dia atrás')
						} else if (res.data[0].uploadDate.endsWith('months ago')) {
							var playre = res.data[0].uploadDate.replace('months ago', 'Meses atrás')
						} else if (res.data[0].uploadDate.endsWith('seconds ago')) {
							var playre = res.data[0].uploadDate.replace('seconds ago', 'Segundos atrás')
						} else if (res.data[0].uploadDate.endsWith('undefined')) {
							var videore = res.data[0].uploadDate.replace('undefined', 'Indefinido')
						} else if (res.data[0].uploadDate.endsWith('null')) {
							var videore = res.data[0].uploadDate.replace('null', 'Indefinido')
						}
						const asize = await axios.get(`http://st4rz.herokuapp.com/api/yta?url=http://youtu.be/${res.data[0].id}`)
						const afsize = asize.data.filesize.replace(' MB', '')
						console.log(afsize)
						if (afsize >= 16.0 || asize.data.filesize.endsWith('GB')) {
							client.reply(from, `Desculpe, para evitar banimentos do WhatsApp, o limite de envio de audios é de 16MB, e esse possui ${asize.data.filesize}.`, id)
						} else {
							await client.sendFileFromUrl(from, `${res.data[0].thumbnail}`, ``, `*Titulo:* ${res.data[0].title}\n*Duração:* ${res.data[0].duration} segundos\n*Enviado por:* ${res.data[0].channel.name}\n*Foi feito a:* ${playre}\n*Visualizações:* ${res.data[0].viewCount}\n\nEspero que eu tenha acertado e...agora é so esperar!!\nEvite usar o comando novamente até eu enviar o áudio`, id)

							let stream = ytdl(res.data[0].id, {
								quality: 'highestaudio'
							});

							ffmpeg(stream)
								.audioBitrate(128)
								.save(`./media/yt/${res.data[0].id}.mp3`)
								.on('end', () => {
									client.sendFile(from, `./media/yt/${res.data[0].id}.mp3`, `${res.data[0].id}.mp3`, null, id).then(f => {
										try {
											fs.unlinkSync(`./media/yt/${res.data[0].id}.mp3`);
											console.log(`successfully deleted ${res.data[0].id}.mp3`);
										} catch (err) {
											// handle the error
											console.log(err);
										}
									})
								});
						}
					})
				break


			case 'qr':
				if (args.length == 0) return client.reply(from, `Use: ${prefix}qr <url ou texto>`, id)
				const qrco = body.slice(4)
				await client.sendFileFromUrl(from, `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrco}`, '', 'Sua mensagem foi inserida nesse QRCode 🤖.', id)
				break

			case 'encurtarlink':
			case 'shortlink':
				if (args.length == 0) return client.reply(from, `Use: ${prefix}encurtarlink <url>`, id)
				if (!isUrl(args[0])) return client.reply(from, 'Desculpe, o url que você enviou é inválido.', id)
				const shortlink = await urlShortener(args[0])
				await client.sendText(from, shortlink, id)
					.catch(() => {
						client.reply(from, 'Há um erro!', id)
					})
				break


			case 'send':
				if (args.length == 0) return client.reply(from, 'Você esqueceu de por um link de imagem haha!', id)
				const file = body.slice(6)
				if (file.endsWith('.jpg')) {
					await client.sendFileFromUrl(from, file, '', '', id)
						.catch(() => {
							client.reply(from, 'Ah! Isso não aparenta ser uma imagem, ou pode ser maior que o esperado...', id)
						})
				} else if (file.endsWith('.png')) {
					await client.sendFileFromUrl(from, file, '', '', id)
						.catch(() => {
							client.reply(from, 'Ah! Isso não aparenta ser uma imagem, ou pode ser maior que o esperado...', id)
						})
				} else {
					client.reply(from, 'Desculpa, apenas fotos são permitidas, exclusivamente .jpg e .png ^^', id)
				}
				break


			case 'quote':
				arks = body.trim().split(/ +/).slice(1)
				ark = body.trim().substring(body.indexOf(' ') + 1)
				if (arks.length >= 1) {
					const quotes = ark.split('|')[0]
					const qauth = ark.split('|')[1]
					client.reply(from, 'Entendido! Aguarde a conclusão do comando.!', id)
					const quoteimg = await killo.quote(quotes, qauth)
					console.log(quoteimg)
					await client.sendFileFromUrl(from, quoteimg, '', 'Compreensivel.', id)
						.catch(() => {
							client.reply(from, 'Nossa! Parece que fui negada ao enviar a foto...', id)
						})
				} else {
					client.reply(from, `Você realmente está usando corretamente?`)
				}
				break


			case 'translate':
				if (args.length != 1) return client.reply(from, `Isso é pequeno demais para ser traduzido...`, id)
				if (!quotedMsg) return client.reply(from, `Você esqueceu de marcar a mensagem para tradução.`, id)
				const quoteText = quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : ''
				client.reply(from, mess.wait, id)
				await sleep(5000)
				translate(quoteText, args[0])
					.then((result) => client.reply(from, result, id))
					.catch(() => client.reply(from, 'Bloqueio de IP google, ou erro em tradução...'))
				break


			case 'tts': // Esse é enormeeeee, fazer o que, sou baiano pra jogar noutro js
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
					ttsId.save('./lib/media/tts/resId.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resId.mp3', id)
					})
				} else if (dataBhs == 'en') {
					ttsEn.save('./lib/media/tts/resEn.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resEn.mp3', id)
					})
				} else if (dataBhs == 'jp') {
					ttsJp.save('./lib/media/tts/resJp.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resJp.mp3', id)
					})
				} else if (dataBhs == 'de') {
					ttsDe.save('./lib/media/tts/resDe.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resDe.mp3', id)
					})
				} else if (dataBhs == 'br') {
					ttsBr.save('./lib/media/tts/resBr.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resBr.mp3', id)
					})
				} else if (dataBhs == 'ru') {
					ttsRu.save('./lib/media/tts/resRu.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resRu.mp3', id)
					})
				} else if (dataBhs == 'ar') {
					ttsAr.save('./lib/media/tts/resAr.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resAr.mp3', id)
					})
				} else if (dataBhs == 'pt') {
					ttsPt.save('./lib/media/tts/resPt.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resPt.mp3', id)
					})
				} else if (dataBhs == 'af') {
					ttsAf.save('./lib/media/tts/resAf.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resAf.mp3', id)
					})
				} else if (dataBhs == 'sq') {
					ttsSq.save('./lib/media/tts/resSq.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resSq.mp3', id)
					})
				} else if (dataBhs == 'hy') {
					ttsHy.save('./lib/media/tts/resHy.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resHy.mp3', id)
					})
				} else if (dataBhs == 'ca') {
					ttsCa.save('./lib/media/tts/resCa.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resCa.mp3', id)
					})
				} else if (dataBhs == 'zh') {
					ttsZh.save('./lib/media/tts/resZh.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resZh.mp3', id)
					})
				} else if (dataBhs == 'cn') {
					ttsCn.save('./lib/media/tts/resCn.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resCn.mp3', id)
					})
				} else if (dataBhs == 'tw') {
					ttsTw.save('./lib/media/tts/resTw.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resTw.mp3', id)
					})
				} else if (dataBhs == 'yu') {
					ttsYu.save('./lib/media/tts/resYue.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resYue.mp3', id)
					})
				} else if (dataBhs == 'hr') {
					ttsHr.save('./lib/media/tts/resHr.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resHr.mp3', id)
					})
				} else if (dataBhs == 'cs') {
					ttsCs.save('./lib/media/tts/resCs.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resCs.mp3', id)
					})
				} else if (dataBhs == 'da') {
					ttsDa.save('./lib/media/tts/resDa.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resDa.mp3', id)
					})
				} else if (dataBhs == 'nl') {
					ttsNl.save('./lib/media/tts/resNl.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resNl.mp3', id)
					})
				} else if (dataBhs == 'au') {
					ttsAu.save('./lib/media/tts/resAu.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resAu.mp3', id)
					})
				} else if (dataBhs == 'uk') {
					ttsUk.save('./lib/media/tts/resUk.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resUk.mp3', id)
					})
				} else if (dataBhs == 'us') {
					ttsUs.save('./lib/media/tts/resUs.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resUs.mp3', id)
					})
				} else if (dataBhs == 'eo') {
					ttsEo.save('./lib/media/tts/resEo.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resEo.mp3', id)
					})
				} else if (dataBhs == 'fi') {
					ttsFi.save('./lib/media/tts/resFi.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resFi.mp3', id)
					})
				} else if (dataBhs == 'fr') {
					ttsFr.save('./lib/media/tts/resFr.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resFr.mp3', id)
					})
				} else if (dataBhs == 'el') {
					ttsEl.save('./lib/media/tts/resEl.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resEl.mp3', id)
					})
				} else if (dataBhs == 'ht') {
					ttsHt.save('./lib/media/tts/resJp.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resHt.mp3', id)
					})
				} else if (dataBhs == 'hi') {
					ttsHi.save('./lib/media/tts/resHi.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resHi.mp3', id)
					})
				} else if (dataBhs == 'hu') {
					ttsHu.save('./lib/media/tts/resHu.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resHu.mp3', id)
					})
				} else if (dataBhs == 'is') {
					ttsIs.save('./lib/media/tts/resIs.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resIs.mp3', id)
					})
				} else if (dataBhs == 'it') {
					ttsIt.save('./lib/media/tts/resIt.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resIt.mp3', id)
					})
				} else if (dataBhs == 'ko') {
					ttsKo.save('./lib/media/tts/resKo.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resKo.mp3', id)
					})
				} else if (dataBhs == 'la') {
					ttsLa.save('./lib/media/tts/resLa.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resLa.mp3', id)
					})
				} else if (dataBhs == 'lv') {
					ttsLv.save('./lib/media/tts/resLv.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resLv.mp3', id)
					})
				} else if (dataBhs == 'mk') {
					ttsMk.save('./lib/media/tts/resMk.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resMk.mp3', id)
					})
				} else if (dataBhs == 'no') {
					ttsNo.save('./lib/media/tts/resNo.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resNo.mp3', id)
					})
				} else if (dataBhs == 'pl') {
					ttsPl.save('./lib/media/tts/resPl.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resPl.mp3', id)
					})
				} else if (dataBhs == 'ro') {
					ttsRo.save('./lib/media/tts/resRo.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resRo.mp3', id)
					})
				} else if (dataBhs == 'sr') {
					ttsSr.save('./lib/media/tts/resSr.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resSr.mp3', id)
					})
				} else if (dataBhs == 'sk') {
					ttsSk.save('./lib/media/tts/resSk.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resSk.mp3', id)
					})
				} else if (dataBhs == 'es') {
					ttsEs.save('./lib/media/tts/resEs.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resEs.mp3', id)
					})
				} else if (dataBhs == 'sp') {
					ttsSp.save('./lib/media/tts/resSp.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resSp.mp3', id)
					})
				} else if (dataBhs == 'su') {
					ttsSu.save('./lib/media/tts/resSu.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resSu.mp3', id)
					})
				} else if (dataBhs == 'sw') {
					ttsSw.save('./lib/media/tts/resSw.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resSk.mp3', id)
					})
				} else if (dataBhs == 'sv') {
					ttsSv.save('./lib/media/tts/resSv.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resSv.mp3', id)
					})
				} else if (dataBhs == 'ta') {
					ttsTa.save('./lib/media/tts/resTa.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resTa.mp3', id)
					})
				} else if (dataBhs == 'tr') {
					ttsTr.save('./lib/media/tts/resTr.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resTr.mp3', id)
					})
				} else if (dataBhs == 'vi') {
					ttsVi.save('./lib/media/tts/resVi.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resVi.mp3', id)
					})
				} else if (dataBhs == 'cy') {
					ttsCy.save('./lib/media/tts/resCy.mp3', dataText, function () {
						client.sendPtt(from, './lib/media/tts/resCy.mp3', id)
					})
				} else {
					client.reply(from, `Hmm, '${body.slice(5, 7)}' não é um idioma compativel, para idiomas compativeis digite ${prefix}idiomas.`, id)
				}
				break


			case 'idiomas':
				client.sendText(from, lang, id)
				break


			case 'resposta':
				if (args.length == 0) return client.reply(from, 'Faltou a frase para ser adicionada.', id)
				fs.appendFile('./lib/reply.txt', `\n${body.slice(10)}`)
				await client.reply(from, 'Frase adicionada.', id)
				break

			case 'falar':
			case 'speak':
				const sppt = require('node-gtts')('pt-br')
				try {
					const spiris = await axios.get(`http://simsumi.herokuapp.com/api?text=${body.slice(7)}&lang=pt`)
					const a = spiris.data.success
					if (a == '') {
						console.log('Request falhou, usando respostas locais...')
						let rfua = fs.readFileSync('./lib/reply.txt').toString().split('\n')
						let repy = rfua[Math.floor(Math.random() * rfua.length)]
						let resfl = repy.replace('%name$', '${name}').replace('%battery%', '${lvpc}')
						console.log(resfl)
						sppt.save('./lib/media/tts/resPtm.mp3', resfl, function () {
							client.sendPtt(from, './lib/media/tts/resPtm.mp3', id)
						})
					} else {
						sppt.save('./lib/media/tts/resPtm.mp3', a, function () {
							client.sendPtt(from, './lib/media/tts/resPtm.mp3', id)
						})
					}
				} catch (error) {
					console.log('Request falhou, usando respostas locais...')
					let rfua = fs.readFileSync('./lib/reply.txt').toString().split('\n')
					let repy = rfua[Math.floor(Math.random() * rfua.length)]
					let resfl = repy.replace('%name$', '${name}').replace('%battery%', '${lvpc}')
					console.log(resfl)
					sppt.save('./lib/media/tts/resPtm.mp3', resfl, function () {
						client.sendPtt(from, './lib/media/tts/resPtm.mp3', id)
					})
				}
				break

			case 'c':
			case 'conversa':
				try {
					const iris = await axios.get(`http://simsumi.herokuapp.com/api?text=${body.slice(6)}&lang=pt`)
					if (iris.data.success == '') {
						console.log('Request falhou, usando respostas locais...')
						let rndrl = fs.readFileSync('./lib/reply.txt').toString().split('\n')
						let repl = rndrl[Math.floor(Math.random() * rndrl.length)]
						let resmf = repl.replace('%name$', `${name}`).replace('%battery%', `${lvpc}`)
						console.log(resmf)
						client.reply(from, resmf, id)
					} else {
						await client.reply(from, iris.data.success, id)
					}
				} catch (error) {
					console.log('Request falhou, usando respostas locais...')
					let rndrl = fs.readFileSync('./lib/reply.txt').toString().split('\n')
					let repl = rndrl[Math.floor(Math.random() * rndrl.length)]
					let resmf = repl.replace('%name$', `${name}`).replace('%battery%', `${lvpc}`)
					console.log(resmf)
					client.reply(from, resmf, id)
				}
				break


			case 'wallpaper':
				if (args.length == 0) return client.reply(from, 'Você precisa me dizer do que quer seu wallpaper!', id)
				const quere = body.slice(6)
				const wallp = await wall(quere)
				console.log(wallp)
				await client.sendFileFromUrl(from, wallp, 'wallp.jpg', '', id)
				break


			case 'ping':
				client.sendText(from, `🏓 Pong!\n_Minha velocidade é de ${processTime(t, moment())} segundos._`)
				break

			case 'roll':
				const dice = Math.floor(Math.random() * 6) + 1
				await client.sendStickerfromUrl(from, 'https://www.random.org/dice/dice' + dice + '.png')
				break


			case 'flip':
				const side = Math.floor(Math.random() * 2) + 1
				if (side == 1) {
					client.sendStickerfromUrl(from, 'https://i.ibb.co/LJjkVK5/heads.png')
				} else {
					client.sendStickerfromUrl(from, 'https://i.ibb.co/wNnZ4QD/tails.png')
				}
				break


			case 'poll':
				feature.getpoll(client, message, pollfile, voterslistfile)
				break


			case 'vote':
				feature.voteadapter(client, message, pollfile, voterslistfile)
				break


			case 'newpoll':
				feature.adminpollreset(client, message, message.body.slice(9), pollfile, voterslistfile)
				break


			case 'ins':
				feature.addcandidate(client, message, message.body.slice(5), pollfile, voterslistfile)
				break


			case 'nsfw':
				const isGroupOwner = sender.id === chat.groupMetadata.owner
				if (args.length !== 1) return client.reply(from, 'Defina enable ou disable', id)
				if (isGroupMsg && isGroupOwner) {
					if (args[0].toLowerCase() == 'enable') {
						nsfw_.push(chat.id)
						fs.writeFileSync('./lib/NSFW.json', JSON.stringify(nsfw_))
						client.reply(from, 'Comandos NSFW ativados neste grupo!', id)
					} else if (args[0].toLowerCase() == 'disable') {
						nsfw_.splice(chat.id, 1)
						fs.writeFileSync('./lib/NSFW.json', JSON.stringify(nsfw_))
						client.reply(from, 'Comandos nsfw desativamos para este grupo.', id)
					} else {
						client.reply(from, 'Defina enable ou disable', id)
					}
				} else if (isGroupMsg && isOwner) {
					if (args[0].toLowerCase() == 'enable') {
						nsfw_.push(chat.id)
						fs.writeFileSync('./lib/NSFW.json', JSON.stringify(nsfw_))
						client.reply(from, 'Comandos NSFW ativados neste grupo!', id)
					} else if (args[0].toLowerCase() == 'disable') {
						nsfw_.splice(chat.id, 1)
						fs.writeFileSync('./lib/NSFW.json', JSON.stringify(nsfw_))
						client.reply(from, 'Comandos nsfw desativamos para este grupo.', id)
					} else {
						client.reply(from, 'Defina enable ou disable', id)
					}
				} else if (isGroupMsg) {
					await client.reply(from, 'Desculpe, somente os administradores podem usar esse comando...', id)
				} else {
					await client.reply(from, 'Esse comando apenas pode ser usado em grupos!', id)
				}
				break


			case 'welcome':
				if (!isGroupMsg) return client.reply(from, mess.error.Gp, id)
				if (!isOwner) return client.reply(from, mess.error.Kl, id)
				if (args.length !== 1) return client.reply(from, 'Você esqueceu de colocar se quer ativado [on], ou desativado [off].', id)
				if (args[0] == 'on') {
					welkom.push(chat.id)
					fs.writeFileSync('./lib/welcome.json', JSON.stringify(welkom))
					client.reply(from, 'Feito! As funções de Boas-Vindas e Good-Bye foram acionadas.', id)
				} else if (args[0] == 'off') {
					let welcom = welkom.indexOf(chatId)
					welkom.splice(welcom, 1)
					fs.writeFileSync('./lib/welcome.json', JSON.stringify(welkom))
					client.reply(from, 'Entendido! Desativei as opções de Boas-Vindas e Good-Bye.', id)
				} else {
					client.reply(from, 'Você esqueceu de colocar se quer ativado [on], ou desativado [off].', id)
				}
				break


			case 'macaco':
				var item = ["macaco", "gorila", "chimpanzé", "orangotango", "babuino"]
				var esco = item[Math.floor(Math.random() * item.length)]
				console.log(esco)
				var maca = "https://api.fdci.se/rep.php?gambar=" + esco
				axios.get(maca)
					.then((result) => {
						var mon = JSON.parse(JSON.stringify(result.data))
						var nkey = mon[Math.floor(Math.random() * mon.length)]
						client.sendFileFromUrl(from, nkey, "", "Saldações, sou o Deus macaco e vim abençoar vocês.", id)
					})
				break


			case 'ball':
				const ball = await axios.get('https://nekos.life/api/v2/img/8ball')
				await client.sendFileFromUrl(from, ball.data.url, '', '', id)
				break


			case 'cafune':
				if (double == 1) {
					const cfne = await axios.get('https://nekos.life/api/v2/img/pat')
					await client.sendFileFromUrl(from, cfne.data.url, '', '', id)
				} else if (double == 2) {
					const cfne = await axios.get('https://nekos.life/api/v2/img/cuddle')
					await client.sendFileFromUrl(from, cfne.data.url, '', '', id)
				}
				break


			case 'quack':
				const patu = await axios.get('https://nekos.life/api/v2/img/goose')
				await client.sendFileFromUrl(from, patu.data.url, '', '', id)
				break


			case 'poke':
				const teco = await axios.get('https://nekos.life/api/v2/img/poke')
				await client.sendFileFromUrl(from, teco.data.url, '', '', id)
				break


			case 'cocegas':
				const cocegas = await axios.get('https://nekos.life/api/v2/img/tickle')
				await client.sendFileFromUrl(from, cocegas.data.url, '', '', id)
				break


			case 'feed':
				const feed = await axios.get('https://nekos.life/api/v2/img/tickle')
				await client.sendFileFromUrl(from, feed.data.url, '', '', id)
				break


			case 'baka':
				const baka = await axios.get('https://nekos.life/api/v2/img/baka')
				await client.sendFileFromUrl(from, baka.data.url, '', '', id)
				break


			case 'lizard':
			case 'lagarto':
				const lizard = await axios.get('https://nekos.life/api/v2/img/lizard')
				await client.sendFileFromUrl(from, lizard.data.url, '', '', id)
				break


			case 'google':
				if (args.length == 0) return client.reply(from, `Digite algo para buscar.`, id)
				const googleQuery = body.slice(8)
				google({
					'query': googleQuery
				}).then(results => {
					let vars = `_*Resultados da pesquisa Google de: ${googleQuery}*_\n`
					for (let i = 0; i < results.length; i++) {
						vars += `\n═════════════════\n*Titulo >* ${results[i].title}\n\n*Descrição >* ${results[i].snippet}\n\n*Link >* ${results[i].link}`
					}
					client.reply(from, vars, id)
				}).catch(e => {
					client.reply(from, 'Erro ao pesquisar na google.', id)
				})
				break


			case 'boy':
				var hite = ["eboy", "garoto", "homem", "men", "garoto oriental", "japanese men", "pretty guy", "homem bonito"];
				var hesc = hite[Math.floor(Math.random() * hite.length)];
				var men = "https://api.fdci.se/rep.php?gambar=" + hesc;
				axios.get(men)
					.then((result) => {
						var h = JSON.parse(JSON.stringify(result.data));
						var cewek = h[Math.floor(Math.random() * h.length)];
						client.sendFileFromUrl(from, cewek, "result.jpg", "Homens...", id)
					})
				break


			case 'girl':
				var items = ["garota adolescente", "saycay", "alina nikitina", "belle delphine", "teen girl", "teen cute", "japanese girl", "garota bonita oriental", "oriental girl", "korean girl", "chinese girl", "e-girl", "teen egirl", "brazilian teen girl", "pretty teen girl", "korean teen girl", "garota adolescente bonita", "menina adolescente bonita", "egirl", "cute girl"];
				var cewe = items[Math.floor(Math.random() * items.length)];
				console.log(cewe)
				var girl = "https://api.fdci.se/rep.php?gambar=" + cewe;
				axios.get(girl)
					.then((result) => {
						var b = JSON.parse(JSON.stringify(result.data));
						var cewek = b[Math.floor(Math.random() * b.length)];
						client.sendFileFromUrl(from, cewek, "result.jpg", "Ela é linda não acha?", id)
					})
				break


			case 'anime':
				if (args.length == 0) return client.reply(from, 'Especifique o nome de um anime!', id)
				const keyword = message.body.replace('/anime', '')
				try {
					const data = await fetch(
						`https://api.jikan.moe/v3/search/anime?q=${keyword}`
					)
					const parsed = await data.json()
					if (!parsed) {
						await client.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ É umas pena, não encontrei nenhum resultado...', id)
						console.log("Sent!")
						return null
					}
					const {
						title,
						episodes,
						url,
						synopsis,
						rated,
						score,
						image_url
					} = parsed.results[0]
					const image = await bent("buffer")(image_url)
					const base64 = `data:image/jpg;base64,${image.toString("base64")}`
					client.reply(from, mess.wait, id)
					await sleep(5000)
					translate(synopsis, 'pt')
						.then(async (syno) => {
							const content = `*Anime encontrado!*\n\n✨️ *Titulo:* ${title}\n\n🎆️ *Episodios:* ${episodes}\n\n💌️ *Classificação:* ${rated}\n\n❤️ *Nota:* ${score}\n\n💚️ *Sinopse:* ${syno}\n\n🌐️ *Link*: ${url}`
							await client.sendImage(from, base64, title, content, id)
						})
				} catch (err) {
					console.error(err.message)
					await client.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ É umas pena, não encontrei nenhum resultado...')
				}
				break


			case 'nh':
				if (isGroupMsg) {
					if (!isNsfw) return client.reply(from, mess.error.Ac, id)
					if (args.length == 1) {
						const nuklir = body.split(' ')[1]
						client.reply(from, mess.wait, id)
						const cek = await nhentai.exists(nuklir)
						if (cek === true) {
							try {
								const api = new API()
								const pic = await api.getBook(nuklir).then(book => {
									return api.getImageURL(book.cover)
								})
								const dojin = await nhentai.getDoujin(nuklir)
								const {
									title,
									details,
									link
								} = dojin
								const {
									parodies,
									tags,
									artists,
									groups,
									languages,
									categories
								} = await details
								var teks = `*Titulo* : ${title}\n\n*Parodia de* : ${parodies}\n\n*Tags* : ${tags.join(', ')}\n\n*Artistas* : ${artists.join(', ')}\n\n*Grupos* : ${groups.join(', ')}\n\n*Linguagens* : ${languages.join(', ')}\n\n*Categoria* : ${categories}\n\n*Link* : ${link}`
								client.sendFileFromUrl(from, pic, 'hentod.jpg', teks, id)
							} catch (err) {
								client.reply(from, '[❗] Ops! Deu erro no envio!', id)
							}
						} else {
							client.reply(from, '[❗] Aqui diz que não achou resultados...')
						}
					} else {
						client.reply(from, 'Você usou errado, tente verificar se o comando está correto.')
					}
				} else {
					if (args.length == 1) {
						const nuklir = body.split(' ')[1]
						client.reply(from, mess.wait, id)
						const cek = await nhentai.exists(nuklir)
						if (cek === true) {
							try {
								const api = new API()
								const pic = await api.getBook(nuklir).then(book => {
									return api.getImageURL(book.cover)
								})
								const dojin = await nhentai.getDoujin(nuklir)
								const {
									title,
									details,
									link
								} = dojin
								const {
									parodies,
									tags,
									artists,
									groups,
									languages,
									categories
								} = await details
								var teks = `*Titulo* : ${title}\n\n*Parodia de* : ${parodies}\n\n*Tags* : ${tags.join(', ')}\n\n*Artistas* : ${artists.join(', ')}\n\n*Grupos* : ${groups.join(', ')}\n\n*Linguagens* : ${languages.join(', ')}\n\n*Categoria* : ${categories}\n\n*Link* : ${link}`
								client.sendFileFromUrl(from, pic, 'hentod.jpg', teks, id)
							} catch (err) {
								client.reply(from, '[❗] Ops! Deu erros no envio!', id)
							}
						} else {
							client.reply(from, '[❗] Aqui diz que não achou resultados...')
						}
					} else {
						client.reply(from, 'Você usou errado, tente verificar se o comando está correto.')
					}
				}
				break


			case 'profile':
				if (isGroupMsg) {
					if (!quotedMsg) {
						var pic = await client.getProfilePicFromServer(author)
						var namae = pushname
						var sts = await client.getStatus(author)
						var adm = isGroupAdmins
						const {
							status
						} = sts
						if (pic == undefined) {
							var pfp = errorurl
						} else {
							var pfp = pic
						}
						await client.sendFileFromUrl(from, pfp, 'pfp.jpg', `*Dados do seu perfil..* ✨️ \n\n 🔖️ *Qual sua Usertag? ${namae}*\n\n💌️ *Frase do recado?*\n${status}\n\n 👑️ *Você é administrador? ${adm}*`)
					} else if (quotedMsg) {
						var qmid = quotedMsgObj.sender.id
						var pic = await client.getProfilePicFromServer(qmid)
						var sts = await client.getStatus(qmid)
						const {
							status
						} = sts
						if (pic == undefined) {
							var pfp = errorurl
						} else {
							var pfp = pic
						}
						await client.sendFileFromUrl(from, pfp, 'pfo.jpg', `${status}`)
					}
				}
				break

			case 'store':
				if (args.length == 0) return client.reply(from, 'Especifique um nome de aplicativo que deseja pesquisar.', id)
				client.reply(from, mess.wait, id)
				await sleep(5000)
				const stsp = await search(`${body.slice(7)}`)
				translate(stsp.description, 'pt')
					.then((playst) => client.sendFileFromUrl(from, stsp.icon, '', `*Nome >* ${stsp.name}\n\n*Link >* ${stsp.url}\n\n*Preço >* ${stsp.price}\n\n*Descrição >* ${playst}\n\n*Nota >* ${stsp.rating}/5\n\n*Desenvolvedora >* ${stsp.developer.name}\n\n*Outros>* ${stsp.developer.url}`, id))
				break


			case 'search':
				if (isMedia && type === 'image' || quotedMsg && quotedMsg.type === 'image') {
					if (isMedia) {
						var mediaData = await decryptMedia(message, uaOverride)
					} else {
						var mediaData = await decryptMedia(quotedMsg, uaOverride)
					}
					const fetch = require('node-fetch')
					const imgBS4 = `data:${mimetype};base64,${mediaData.toString('base64')}`
					client.reply(from, 'Pesquisando....\n\nEvite usar isso com fan-mades, desenhos do pinterest ou outros, use apenas com prints de episodios de anime, ok?', id)
					fetch('https://trace.moe/api/search', {
						method: 'POST',
						body: JSON.stringify({
							image: imgBS4
						}),
						headers: {
							"Content-Type": "application/json"
						}
					})
						.then(respon => respon.json())
						.then(resolt => {
							if (resolt.docs && resolt.docs.length <= 0) {
								client.reply(from, 'É como podia acontecer, não há resposta sobre ele.', id)
							}
							const {
								is_adult,
								title,
								title_chinese,
								title_romaji,
								title_english,
								episode,
								similarity,
								filename,
								at,
								tokenthumb,
								anilist_id
							} = resolt.docs[0]
							teks = ''
							if (similarity < 0.92) {
								teks = '*Pode ser ~ou está~ que esteja incorreta...* :\n\n'
							}
							teks += `➸ *Titulo em Japonês* : ${title}\n➸ *Titulo em Chinês* : ${title_chinese}\n➸ *Titulo em Romaji* : ${title_romaji}\n➸ *Title English* : ${title_english}\n`
							teks += `➸ *Ecchi* : ${is_adult}\n`
							teks += `➸ *Episodio* : ${episode.toString()}\n`
							teks += `➸ *Similaridade dos traços* : ${(similarity * 100).toFixed(1)}%\n`
							var video = `https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`;
							client.sendFileFromUrl(from, video, 'nimek.mp4', teks, id).catch(() => {
								client.reply(from, teks, id)
							})
						})
						.catch(() => {
							client.reply(from, 'Ora ora, recebi um erro.', id)
						})
				} else {
					client.sendFile(from, './lib/media/img/tutod.jpg', 'Tutor.jpg', 'Evite usar isso com fan-mades, desenhos do pinterest ou outros, use apenas com prints de episodios de anime, ok?', id)
				}
				break

			case 'link':
				if (!isBotGroupAdmins) return client.reply(from, mess.error.Ba, id)
				if (isGroupMsg) {
					const inviteLink = await client.getGroupInviteLink(groupId);
					client.sendLinkWithAutoPreview(from, inviteLink, `\nAqui está o link do grupo ${name}!`)
				} else {
					client.reply(from, 'Ops, isso é um comando de grupos apenas.', id)
				}
				break

			case 'broad':
				if (!isOwner) return client.reply(from, 'Somente o meu criador tem acesso a este comando.', id)
				let msg = body.slice(6)
				const chatz = await client.getAllChatIds()
				for (let ids of chatz) {
					var cvk = await client.getChatById(ids)
					if (!cvk.isReadOnly) await client.sendText(ids, `[Transmissão]\n\n${msg}`)
				}
				client.reply(from, 'Broadcast Sucedida!', id)
				break


			case 'adms':
				if (!isGroupMsg) return client.reply(from, mess.error.Gp, id)
				let mimin = ''
				for (let admon of groupAdmins) {
					mimin += `- @${admon.replace(/@c.us/g, '')}\n`
				}
				await sleep(2000)
				await client.sendTextWithMentions(from, mimin)
				break


			case 'groupinfo':
				if (!isGroupMsg) return client.reply(from, mess.error.Gp, id)
				var totalMem = chat.groupMetadata.participants.length
				var desc = chat.groupMetadata.desc
				var groupname = name
				let admgp = ''
				for (let admon of groupAdmins) {
					admgp += `- @${admon.replace(/@c.us/g, '')}\n`
				}
				var gpOwner = chat.groupMetadata.owner.replace(/@c.us/g, '')
				var welgrp = welkom.includes(chat.id)
				var ngrp = nsfw_.includes(chat.id)
				var lzex = exsv.includes(chat.id)
				var grouppic = await client.getProfilePicFromServer(chat.id)
				if (grouppic == undefined) {
					var pfp = errorurl
				} else {
					var pfp = grouppic
				}
				await client.sendFileFromUrl(from, pfp, 'group.png', ``, id)
				await client.sendTextWithMentions(from, `*${groupname}*\n\n*🌐️ Membros > ${totalMem}*\n\n*💌️ Welcome|Goodby > ${welgrp}*\n\n*🌙 Anti-Links, Anti-Porno... >  ${lzex}*\n\n*⚜️ Contéudo adulto > ${ngrp}*\n\n*📃️ Descrição >V*\n ${desc}\n\n*🌙 Dono >* @${gpOwner}\n\n*☀️ Administradores >V*\n${admgp}`, id)
				break


			case 'ownergroup':
				if (!isGroupMsg) return client.reply(from, 'Apenas grupos', id)
				const Owner_ = chat.groupMetadata.owner
				await client.sendTextWithMentions(from, `O carinho que criou o grupo foi o @${Owner_}`)
				break


			case 'sip':
				if (args.length == 1) {
					const ip = await axios.get(`http://ipwhois.app/json/${body.slice(5)}`)
					await client.sendLinkWithAutoPreview(from, `http://www.google.com/maps/place/${ip.data.latitude},${ip.data.longitude}`, `\n✪ IP: ${ip.data.ip}\n\n✪ Tipo: ${ip.data.type}\n\n✪ Região: ${ip.data.region}\n\n✪ Cidade: ${ip.data.city}\n\n✪ Latitude: ${ip.data.latitude}\n\n✪ Longitude: ${ip.data.longitude}\n\n✪ Provedor: ${ip.data.isp}\n\n✪ Continente: ${ip.data.continent}\n\n✪ Sigla do continente: ${ip.data.continent_code}\n\n✪ País: ${ip.data.country}\n\n✪ Sigla do País: ${ip.data.country_code}\n\n✪ Capital do País: ${ip.data.country_capital}\n\n✪ DDI: ${ip.data.country_phone}\n\n✪ Países Vizinhos: ${ip.data.country_neighbours}\n\n✪ Fuso Horário: ${ip.data.timezone} ${ip.data.timezone_name} ${ip.data.timezone_gmt}\n\n✪ Moeda: ${ip.data.currency}\n\n✪ Sigla da Moeda: ${ip.data.currency_code}`, id)
				} else {
					await client.reply(from, 'Especifique um IP de tipo IPV4.', id)
				}
				break


			case 'scep':
				if (args.length == 1) {
					const cep = await axios.get(`https://viacep.com.br/ws/${body.slice(6)}/json/`)
					await client.reply(from, `✪ CEP: ${cep.data.cep}\n\n✪ Logradouro: ${cep.data.logradouro}\n\n✪ Complemento: ${cep.data.complemento}\n\n✪ Bairro: ${cep.data.bairro}\n\n✪ Estado: ${cep.data.localidade}\n\n✪ DDD: ${cep.data.ddd}\n\n✪ Sigla do Estado: ${cep.data.uf}\n\n✪ Código IBGE: ${cep.data.ibge}\n\n✪ Código GIA: ${cep.data.gia}\n\n✪ Código Siafi: ${cep.data.siafi}`, id)
				} else {
					await client.reply(from, 'Especifique um CEP.', id)
				}
				break


			case 'everyone':
				if (isGroupMsg && isGroupAdmins) {
					const groupMem = await client.getGroupMembers(groupId)
					let hehe = `Olá! Todos marcados!\nAssunto: ${body.slice(10)}\n\n`
					for (let i = 0; i < groupMem.length; i++) {
						hehe += '- '
						hehe += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
					}
					hehe += '\nObrigado & Amo vocês <3'
					await sleep(2000)
					await client.sendTextWithMentions(from, hehe, id)
				} else if (isGroupMsg && isOwner) {
					const groupMem = await client.getGroupMembers(groupId)
					let hehe = `Olá! Todos marcados!\nAssunto: ${body.slice(10)}\n\n`
					for (let i = 0; i < groupMem.length; i++) {
						hehe += '- '
						hehe += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
					}
					hehe += '\nObrigada & Amo vocês <3'
					await sleep(2000)
					await client.sendTextWithMentions(from, hehe, id)
				} else if (isGroupMsg) {
					await client.reply(from, 'Desculpe, somente os administradores podem usar esse comando...', id)
				} else {
					await client.reply(from, 'Esse comando apenas pode ser usado em grupos!', id)
				}
				break


			case 'random':
				if (!isGroupMsg) return client.reply(from, mess.error.Gp, id)
				const memran = await client.getGroupMembers(groupId)
				const randme = memran[Math.floor(Math.random() * memran.length)]
				console.log(randme.id)
				await client.sendTextWithMentions(from, `Você foi escolhido!\n\n @${randme.id.replace(/@c.us/g, '')}\n\nPara: ${body.slice(8)}`)
				await sleep(2000)
				break


			case 'kickall':
				const isdonogroup = sender.id === chat.groupMetadata.owner
				if (!isGroupMsg) return client.reply(from, mess.error.Gp, id)
				if (!isdonogroup) return client.reply(from, 'Apenas o dono do grupo pode usar isso.', id)
				if (!isBotGroupAdmins) return client.reply(from, 'Preciso ser uma ademira', id)
				const allMem = await client.getGroupMembers(groupId)
				for (let i = 0; i < allMem.length; i++) {
					if (groupAdmins.includes(allMem[i].id)) {
						console.log('Pulei um ADM.')
					} else {
						await client.removeParticipant(groupId, allMem[i].id)
					}
				}
				client.reply(from, 'Todos banidos', id)
				break


			case 'leaveall':
				if (!isOwner) return client.reply(from, 'Somente o meu criador tem acesso a este comando.', id)
				const allChats = await client.getAllChatIds()
				const allGroups = await client.getAllGroups()
				for (let gclist of allGroups) {
					await client.sendText(gclist.contact.id, `Voltamos em breve, ou não haha : ${allChats.length}`)
					await client.leaveGroup(gclist.contact.id)
				}
				client.reply(from, 'Feito, sai de todos os grupos.', id)
				break

			case 'deletartudo':
			case 'dellall':
				if (!isOwner) return client.reply(from, 'Somente o meu criador tem acesso a este comando.', id)
				const allChatz = await client.getAllChats()
				for (let dchat of allChatz) {
					await client.deleteChat(dchat.id)
				}
				client.reply(from, 'Limpei todos os Chats!', id)
				break

			case 'limpartudo':
			case 'clearall':
				if (!isOwner) return client.reply(from, 'Somente o meu criador tem acesso a este comando.', id)
				const clearallallChatz = await client.getAllChats()
				for (let dchat of clearallallChatz) {
					await client.clearChat(dchat.id)
				}
				client.reply(from, 'Limpei todos os Chats!', id)
				break


			case 'add':
				if (!isGroupMsg) return client.reply(from, mess.error.Gp, id)
				if (!isBotGroupAdmins) return client.reply(from, mess.error.Ba, id)
				if (args.length !== 1) return client.reply(from, 'Você precisa especificar o número de telefone.', id)
				try {
					await client.addParticipant(from, `${args[0]}@c.us`)
				} catch {
					client.reply(from, mess.error.Ad, id)
				}
				break



			case '3d':
				if (args.length == 0) client.reply(from, 'Coloca uma mensagem ai!', id)
				client.reply(from, mess.wait, id)
				await client.sendFileFromUrl(from, `https://docs-jojo.herokuapp.com/api/text3d?text=${body.slice(4)}`, '', '', id)
				break


			case 'gaming':
				if (args.length == 0) client.reply(from, 'Coloca um nome ai!', id)
				client.reply(from, mess.wait, id)
				await client.sendFileFromUrl(from, `https://docs-jojo.herokuapp.com/api/gaming?text=${body.slice(8)}`, '', '', id)
				break


			case 'fogareu':
				if (args.length == 0) client.reply(from, 'Coloca um nome ai!', id)
				client.reply(from, mess.wait, id)
				await client.sendFileFromUrl(from, `https://docs-jojo.herokuapp.com/api/epep?text=${body.slice(9)}`, '', '', id)
				break


			case 'thunder':
				if (args.length == 0) client.reply(from, 'Coloca um nome ai!', id)
				client.reply(from, mess.wait, id)
				await client.sendFileFromUrl(from, `https://docs-jojo.herokuapp.com/api/thunder?text=${body.slice(9)}`, '', '', id)
				break


			case 'light':
				if (args.length == 0) client.reply(from, 'Coloca um nome ai!', id)
				client.reply(from, mess.wait, id)
				await client.sendFileFromUrl(from, `https://docs-jojo.herokuapp.com/api/neon_light?text=${body.slice(7)}`, '', '', id)
				break


			case 'wolf':
				arkp = body.trim().substring(body.indexOf(' ') + 1)
				if (args.length >= 2) {
					client.reply(from, mess.wait, id)
					const fisow = arkp.split('|')[0]
					const twosw = arkp.split('|')[1]
					await client.sendFileFromUrl(from, `https://docs-jojo.herokuapp.com/api/wolf?text1=${fisow}&text2=${twosw}`, '', '', id)
				} else {
					await client.reply(from, `Para usar isso, adicione duas frases, separando elas pelo |.`, id)
				}
				break


			case 'neon':
				arkt = body.trim().substring(body.indexOf(' ') + 1)
				if (args.length >= 3) {
					client.reply(from, mess.wait, id)
					const fisot = arkt.split('|')[0]
					const twost = arkt.split('|')[1]
					const trest = arkt.split('|')[1]
					await client.sendFileFromUrl(from, `https://docs-jojo.herokuapp.com/api/neon?text1=${fisot}&text2=${twost}&text3=${trest}`, '', '', id)
				} else {
					await client.reply(from, `Para usar isso, adicione três frases, separando elas pelo |.`, id)
				}
				break


			case 'porn':
				if (isGroupMsg) {
					if (!isNsfw) return client.reply(from, mess.error.Ac, id)
					const porn = await axios.get('https://meme-api.herokuapp.com/gimme/porn')
					client.sendFileFromUrl(from, porn.data.url, '', porn.data.title, id)
				} else {
					const porn = await axios.get('https://meme-api.herokuapp.com/gimme/porn')
					client.sendFileFromUrl(from, porn.data.url, '', porn.data.title, id)
				}
				break

			case 'cosplaylewd':
				if (isGroupMsg) {
					if (!isNsfw) return client.reply(from, mess.error.Ac, id)
					const CosplayLewd = await axios.get('https://meme-api.herokuapp.com/gimme/CosplayLewd')
					client.sendFileFromUrl(from, CosplayLewd.data.url, '', CosplayLewd.data.title, id)
				} else {
					const lesb = await axios.get('https://meme-api.herokuapp.com/gimme/CosplayLewd')
					client.sendFileFromUrl(from, lesb.data.url, '', lesb.data.title, id)
				}
				break

			case 'gonewild':
				if (isGroupMsg) {
					if (!isNsfw) return client.reply(from, mess.error.Ac, id)
					const gonewild = await axios.get('https://meme-api.herokuapp.com/gimme/gonewild')
					client.sendFileFromUrl(from, gonewild.data.url, '', gonewild.data.title, id)
				} else {
					const lesb = await axios.get('https://meme-api.herokuapp.com/gimme/gonewild')
					client.sendFileFromUrl(from, lesb.data.url, '', lesb.data.title, id)
				}
				break

			case 'lesbian':
				if (isGroupMsg) {
					if (!isNsfw) return client.reply(from, mess.error.Ac, id)
					const lesb = await axios.get('https://meme-api.herokuapp.com/gimme/lesbians')
					client.sendFileFromUrl(from, lesb.data.url, '', lesb.data.title, id)
				} else {
					const lesb = await axios.get('https://meme-api.herokuapp.com/gimme/lesbians')
					client.sendFileFromUrl(from, lesb.data.url, '', lesb.data.title, id)
				}
				break

			case 'brasil':
				try {
					const brasil = await axios.get('https://meme-api.herokuapp.com/gimme/brasil')
					client.sendFileFromUrl(from, brasil.data.url, '', brasil.data.title, id)
				} catch (error) {
					client.reply(from, 'Ocorreu um erro 😥', id)
				}
				break


			case 'tits':
				if (isGroupMsg) {
					if (!isNsfw) return client.reply(from, mess.error.Ac, id)
					if (octo == 1) {
						const tits = await axios.get('https://meme-api.herokuapp.com/gimme/tits')
						client.sendFileFromUrl(from, tits.data.url, '', tits.data.title, id)
					} else if (octo == 2) {
						const tits = await axios.get('https://meme-api.herokuapp.com/gimme/BestTits')
						client.sendFileFromUrl(from, tits.data.url, '', tits.data.title, id)
					} else if (octo == 3) {
						const tits = await axios.get('https://meme-api.herokuapp.com/gimme/boobs')
						client.sendFileFromUrl(from, tits.data.url, '', tits.data.title, id)
					} else if (octo == 4) {
						const tits = await axios.get('https://meme-api.herokuapp.com/gimme/BiggerThanYouThought')
						client.sendFileFromUrl(from, tits.data.url, '', tits.data.title, id)
					} else if (octo == 5) {
						const tits = await axios.get('https://meme-api.herokuapp.com/gimme/smallboobs')
						client.sendFileFromUrl(from, tits.data.url, '', tits.data.title, id)
					} else if (octo == 6) {
						const tits = await axios.get('https://meme-api.herokuapp.com/gimme/TinyTits')
						client.sendFileFromUrl(from, tits.data.url, '', tits.data.title, id)
					} else if (octo == 7) {
						const tits = await axios.get('https://meme-api.herokuapp.com/gimme/SmallTitsHugeLoad')
						client.sendFileFromUrl(from, tits.data.url, '', tits.data.title, id)
					} else if (octo == 8) {
						const tits = await axios.get('https://meme-api.herokuapp.com/gimme/amazingtits')
						client.sendFileFromUrl(from, tits.data.url, '', tits.data.title, id)
					}
				} else {
					if (octo == 1) {
						const tits = await axios.get('https://meme-api.herokuapp.com/gimme/tits')
						client.sendFileFromUrl(from, tits.data.url, '', tits.data.title, id)
					} else if (octo == 2) {
						const tits = await axios.get('https://meme-api.herokuapp.com/gimme/BestTits')
						client.sendFileFromUrl(from, tits.data.url, '', tits.data.title, id)
					} else if (octo == 3) {
						const tits = await axios.get('https://meme-api.herokuapp.com/gimme/boobs')
						client.sendFileFromUrl(from, tits.data.url, '', tits.data.title, id)
					} else if (octo == 4) {
						const tits = await axios.get('https://meme-api.herokuapp.com/gimme/BiggerThanYouThought')
						client.sendFileFromUrl(from, tits.data.url, '', tits.data.title, id)
					} else if (octo == 5) {
						const tits = await axios.get('https://meme-api.herokuapp.com/gimme/smallboobs')
						client.sendFileFromUrl(from, tits.data.url, '', tits.data.title, id)
					} else if (octo == 6) {
						const tits = await axios.get('https://meme-api.herokuapp.com/gimme/TinyTits')
						client.sendFileFromUrl(from, tits.data.url, '', tits.data.title, id)
					} else if (octo == 7) {
						const tits = await axios.get('https://meme-api.herokuapp.com/gimme/SmallTitsHugeLoad')
						client.sendFileFromUrl(from, tits.data.url, '', tits.data.title, id)
					} else if (octo == 8) {
						const tits = await axios.get('https://meme-api.herokuapp.com/gimme/amazingtits')
						client.sendFileFromUrl(from, tits.data.url, '', tits.data.title, id)
					}
				}
				break


			case 'pgay':
				if (isGroupMsg) {
					if (!isNsfw) return client.reply(from, mess.error.Ac, id)
					const gay = await axios.get('https://meme-api.herokuapp.com/gimme/gayporn')
					client.sendFileFromUrl(from, gay.data.url, '', gay.data.title, id)
				} else {
					const gay = await axios.get('https://meme-api.herokuapp.com/gimme/gayporn')
					client.sendFileFromUrl(from, gay.data.url, '', gay.data.title, id)
				}
				break


			case 'blackpink':
				if (args.length == 0) client.reply(from, 'Coloca um nome ai!', id)
				client.reply(from, mess.wait, id)
				await client.sendFileFromUrl(from, `https://docs-jojo.herokuapp.com/api/blackpink?text=${body.slice(6)}`, '', '', id)
				break


			case 'pornhub':
				arkp = body.trim().substring(body.indexOf(' ') + 1)
				if (args.length >= 2) {
					client.reply(from, mess.wait, id)
					const fison = arkp.split('|')[0]
					const twoso = arkp.split('|')[1]
					if (fison > 10 || twoso > 10) return client.reply(from, 'Desculpe, maximo de 10 letras.', id)
					await client.sendFileFromUrl(from, `https://docs-jojo.herokuapp.com/api/phblogo?text1=${fison}&text2=${twoso}`, '', '', id)
				} else {
					await client.reply(from, `Para usar isso, adicione duas frases, separando elas pelo |.`, id)
				}
				break



			case 'meme':
				ark = body.trim().substring(body.indexOf(' ') + 1)
				if ((isMedia || isQuotedImage) && args.length >= 2) {
					const top = ark.split('|')[0]
					const bottom = ark.split('|')[1]
					const encryptMedia = isQuotedImage ? quotedMsg : message
					const mediaData = await decryptMedia(encryptMedia, uaOverride)
					const getUrl = await uploadImages(mediaData, false)
					const ImageBase64 = await meme.custom(getUrl, top, bottom)
					client.sendFile(from, ImageBase64, 'image.png', '', null, true)
						.then((serialized) => console.log(`Meme de id: ${serialized} feito em ${processTime(t, moment())}`))
						.catch((err) => console.error(err))
				} else {
					await client.reply(from, `Seu uso está incorreto baka ~idiota~ O.O\nUso correto = /meme frase-de-cima | frase-de-baixo.\nA frase de baixo é opcional, se não quiser deixe em branco, mas use o | ainda assim.`, id)
				}
				break


			case 'kick':
				if (isGroupMsg && isGroupAdmins) {
					if (!isBotGroupAdmins) return client.reply(from, 'Pra isso eu preciso ser parte dos Administradores.', id)
					if (mentionedJidList.length === 0) return client.reply(from, 'Você digitou o comando de forma muito errada, arrume e envie certo.', id)
					await client.sendTextWithMentions(from, `Banindo membro comum:\n${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`).join('\n')}`)
					for (let i = 0; i < mentionedJidList.length; i++) {
						if (groupAdmins.includes(mentionedJidList[i])) return client.reply(from, mess.error.Ki, id)
						await client.removeParticipant(groupId, mentionedJidList[i])
					}
				} else if (isGroupMsg && isOwner) {
					if (!isBotGroupAdmins) return client.reply(from, 'Pra isso eu preciso ser parte dos Administradores.', id)
					if (mentionedJidList.length === 0) return client.reply(from, 'Você digitou o comando de forma muito errada, arrume e envie certo.', id)
					await client.sendTextWithMentions(from, `Banindo membro comum:\n${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`).join('\n')}`)
					for (let i = 0; i < mentionedJidList.length; i++) {
						if (groupAdmins.includes(mentionedJidList[i])) return client.reply(from, mess.error.Ki, id)
						await client.removeParticipant(groupId, mentionedJidList[i])
					}
				} else if (isGroupMsg) {
					await client.reply(from, 'Desculpe, somente os administradores podem usar esse comando...', id)
				} else {
					await client.reply(from, 'Esse comando apenas pode ser usado em grupos!', id)
				}
				break

			case 'sair':
			case 'leave':
				if (isGroupMsg && isGroupAdmins) {
					await client.sendText(from, 'Terei que sair mas tomará que voltemos a nós ver em breve! <3').then(() => client.leaveGroup(groupId))
				} else if (isGroupMsg && isOwner) {
					await client.sendText(from, 'Terei que sair mas tomará que voltemos a nós ver em breve! <3').then(() => client.leaveGroup(groupId))
				} else if (isGroupMsg) {
					await client.reply(from, 'Desculpe, somente os administradores e meu dono podem usar esse comando...', id)
				} else {
					await client.reply(from, 'Esse comando apenas pode ser usado em grupos!', id)
				}
				break


			case 'promote':
				if (isGroupMsg && isGroupAdmins) {
					if (!isBotGroupAdmins) return client.reply(from, mess.error.Ba, id)
					if (mentionedJidList.length == 0) return client.reply(from, 'Você esqueceu de marcar a pessoa que quer tornar administrador.', id)
					if (mentionedJidList.length >= 2) return client.reply(from, 'Desculpe, só posso demitir 1 por vez.', id)
					if (groupAdmins.includes(mentionedJidList[0])) return client.reply(from, 'Bom, ele já é um administrador.', id)
					await client.promoteParticipant(groupId, mentionedJidList[0])
					await client.sendTextWithMentions(from, `Promovendo membro comum @${mentionedJidList[0]} a administrador de bar.`)
				} else if (isGroupMsg && isOwner) {
					if (!isBotGroupAdmins) return client.reply(from, mess.error.Ba, id)
					if (mentionedJidList.length == 0) return client.reply(from, 'Você esqueceu de marcar a pessoa que quer tornar administrador.', id)
					if (mentionedJidList.length >= 2) return client.reply(from, 'Desculpe, só posso demitir 1 por vez.', id)
					if (groupAdmins.includes(mentionedJidList[0])) return client.reply(from, 'Bom, ele já é um administrador.', id)
					await client.promoteParticipant(groupId, mentionedJidList[0])
					await client.sendTextWithMentions(from, `Promovendo membro comum @${mentionedJidList[0]} a administrador de bar.`)
				} else if (isGroupMsg) {
					await client.reply(from, 'Desculpe, somente os administradores podem usar esse comando...', id)
				} else {
					await client.reply(from, 'Esse comando apenas pode ser usado em grupos!', id)
				}
				break


			case 'demote':
				if (isGroupMsg && isGroupAdmins) {
					if (!isBotGroupAdmins) return client.reply(from, mess.error.Ba, id)
					if (mentionedJidList.length == 0) return client.reply(from, 'Você esqueceu de marcar a pessoa que quer demitir.', id)
					if (mentionedJidList.length >= 2) return client.reply(from, 'Desculpe, só posso demitir 1 por vez.', id)
					if (!groupAdmins.includes(mentionedJidList[0])) return client.reply(from, 'Bom, ele não é um administrador.', id)
					await client.demoteParticipant(groupId, mentionedJidList[0])
					await client.sendTextWithMentions(from, `Demitindo administrador do bar @${mentionedJidList[0]}.`)
				} else if (isGroupMsg && isOwner) {
					if (!isBotGroupAdmins) return client.reply(from, mess.error.Ba, id)
					if (mentionedJidList.length == 0) return client.reply(from, 'Você esqueceu de marcar a pessoa que quer demitir.', id)
					if (mentionedJidList.length >= 2) return client.reply(from, 'Desculpe, só posso demitir 1 por vez.', id)
					if (!groupAdmins.includes(mentionedJidList[0])) return client.reply(from, 'Bom, ele não é um administrador.', id)
					await client.sendTextWithMentions(from, `Demitindo administrador do bar @${mentionedJidList[0]}.`)
					await client.demoteParticipant(groupId, mentionedJidList[0])
				} else if (isGroupMsg) {
					await client.reply(from, 'Desculpe, somente os administradores podem rebaixar membros pelo bot.', id)
				} else {
					await client.reply(from, 'Esse comando apenas pode ser usado em grupos!', id)
				}
				break

			case 'status':
			case 'botstatus':
			case 'botstat':
				const loadedMsg = await client.getAmountOfLoadedMessages()
				const chatIds = await client.getAllChatIds()
				const groups = await client.getAllGroups()
				client.sendText(from, `Status :\n- *${loadedMsg}* Mensagens recebidas após ligar\n- *${groups.length}* Conversas em grupo\n- *${chatIds.length - groups.length}* Conversas no PV\n- *${chatIds.length}* Total de conversas`)
				break


			case 'entrar':
			case 'join':
				if (args.length == 0) return client.reply(from, 'Sei la, tem algo errado nisso ai!', id)
				const gplk = body.slice(6)
				const tGr = await client.getAllGroups()
				const isLink = gplk.match(/(https:\/\/chat.whatsapp.com)/gi)
				const check = await client.inviteInfo(gplk)
				if (!isLink) return client.reply(from, 'Link errado', id)

				if (from.startsWith('5555')) { // entra em grupos que tenham ddd 55, independentemente da quantidade de membros ou grupos
					if (check.status === 200) {
						await client.joinGroupViaLink(gplk)
						await client.reply(from, 'Entrando no grupo...')
					} else {
						await client.reply(from, 'Link invalido', id)
					}
				}
				else {
					if (tGr.length > groupLimit) return client.reply(from, 'Já estou no maximo de grupos, desculpe.', id)
					if (check.size < memberMinimum) return client.reply(from, 'Só posso funcionar em grupos com mais de 30 pessoas.', id)
					if (check.status === 200) {
						await client.joinGroupViaLink(gplk)
						await client.reply(from, 'Entrando no grupo...')
					} else {
						await client.reply(from, 'Link invalido', id)
					}
				}
				break


			case 'delete':
			case 'del':
				if (isGroupMsg && isGroupAdmins) {
					if (!quotedMsg) return client.reply(from, 'Você precisa marcar a mensagem que deseja deletar, obviamente, uma minha.', id)
					if (!quotedMsgObj.fromMe) return client.reply(from, 'Só posso deletar minhas mensagens!', id)
					await client.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
				} else if (isGroupMsg && isOwner) {
					if (!quotedMsg) return client.reply(from, 'Você precisa marcar a mensagem que deseja deletar, obviamente, uma minha.', id)
					if (!quotedMsgObj.fromMe) return client.reply(from, 'Só posso deletar minhas mensagens!', id)
					await client.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
				} else if (isGroupMsg) {
					if (!quotedMsgObj.fromMe) return client.reply(from, 'Só posso deletar minhas mensagens!', id)
					await client.reply(from, 'Desculpe, somente meu dono e os administradores podem deletar minhas mensagens.', id)
				} else {
					await client.reply(from, 'Esse comando apenas pode ser usado em grupos!', id)
				}
				break


			case 'tela':
				if (!isOwner) return client.reply(from, 'Esse comando é apenas para meu criador', id)
				const sesPic = await client.getSnapshot()
				client.sendFile(from, sesPic, 'session.png', 'Aqui está a minha visão...', id)
				break


			case 'enviar':
				const arka = body.trim().substring(body.indexOf(' ') + 1)
				if (args.length == 0 || args.length == 1) return client.reply(from, 'Defina o número e então uma mensagem, separando eles por |, por exemplo...\n\n/enviar <numero> | <mensagem>.', id)
				if (isGroupMsg && isGroupAdmins) {
					await client.sendText(`${args[0]}` + '@c.us', `${arka.split('|')[1]}`)
					await client.sendText(from, 'Mensagem enviada.')
				} else if (isGroupMsg && isOwner) {
					await client.sendText(`${args[0]}` + '@c.us', `${arka.split('|')[1]}`)
					await client.sendText(from, 'Mensagem enviada.')
				} else if (isGroupMsg) {
					await client.reply(from, mess.error.Ga, id)
				} else {
					await client.reply(from, mess.error.Gp, id)
				}
				break


			case 'blocks':
				if (!isOwner) return client.reply(from, 'Somente o meu criador tem acesso a este comando.', id)
				let hih = `Lista de bloqueados\nTotal : ${blockNumber.length}\n`
				for (let i of blockNumber) {
					hih += `➸ @${i.replace(/@c.us/g, '')}\n`
				}
				client.sendTextWithMentions(from, hih, id)
				break


			case 'encerrar':
				if (!isOwner) return client.reply(from, 'Somente o meu criador tem acesso a este comando.', id)
				client.reply(from, 'Pedido recebido!\nIrei me desligar em 5 segundos.', id)
				await sleep(5000)
				await client.kill()
				break

			case 'loli':
				const onefive = Math.floor(Math.random() * 145) + 1
				client.sendFileFromUrl(from, `https://media.publit.io/file/Twintails/${onefive}.jpg`, 'loli.jpg', 'Vejo que você é um homem/mulher de cultura.', id)
				break


			case 'hug':
				if (double == 1) {
					const hug1 = await axios.get(`https://nekos.life/api/v2/img/hug`)
					await client.sendFileFromUrl(from, hug1.data.url, ``, `Abraço fofinho...`, id)
				} else if (double == 2) {
					const hug = await randomNimek('hug')
					await client.sendFileFromUrl(from, hug, ``, '<3', id)
				}
				break

			case 'baguette':
				const baguette = await randomNimek('baguette')
				await client.sendFileFromUrl(from, baguette, ``, '', id)
				break


			case 'dva':
				const dva1 = await randomNimek('dva')
				await client.sendFileFromUrl(from, dva1, ``, `Que ~gostosa~ linda!`, id)
				break


			case 'waifu':
				if (triple == 1) {
					const total = fs.readFileSync('./lib/waifu.json')
					const parsew = JSON.parse(total)
					const organi = Math.floor(Math.random() * parsew.length)
					const finale = parsew[organi]
					await client.sendFileFromUrl(from, finale.image, 'waifu.jpg', finale.teks, id)
				} else if (triple == 2) {
					const waifu1 = await axios.get(`http://arugaz.herokuapp.com/api/waifu`)
					client.sendFileFromUrl(from, waifu1.data.image, ``, `*Nome:* ${waifu1.data.name}\n\n*Descrição > *\n${waifu1.data.desc}`, id)
				} else if (triple == 3) {
					const waifu3 = await axios.get(`https://nekos.life/api/v2/img/waifu`)
					await client.sendFileFromUrl(from, waifu3.data.url, '', 'Não sei nada dela...', id)
				}
				break


			case 'husb':
				const diti = fs.readFileSync('./lib/husbu.json')
				const ditiJsin = JSON.parse(diti)
				const rindIndix = Math.floor(Math.random() * ditiJsin.length)
				const rindKiy = ditiJsin[rindIndix]
				client.sendFileFromUrl(from, rindKiy.image, 'Husbu.jpg', rindKiy.teks, id)
				break


			case 'iecchi':
				if (isGroupMsg) {
					if (!isNsfw) return client.reply(from, mess.error.Ac, id)
					if (triple == 1) {
						const ecchi = await axios.get('https://nekos.life/api/v2/img/erok')
						await client.sendFileFromUrl(from, ecchi.data.url, id)
					} else if (triple == 2) {
						const ecchi1 = await axios.get('https://nekos.life/api/v2/img/erokemo')
						await client.sendFileFromUrl(from, ecchi1.data.url, '', '', id)
					} else if (triple == 3) {
						const ecchi3 = await axios.get('https://nekos.life/api/v2/img/ero')
						await client.sendFileFromUrl(from, ecchi3.data.url, '', '', id)
					}
				} else {
					if (triple == 1) {
						const ecchi = await axios.get('https://nekos.life/api/v2/img/erok')
						await client.sendFileFromUrl(from, ecchi.data.url, '', '', id)
					} else if (triple == 2) {
						const ecchi1 = await axios.get('https://nekos.life/api/v2/img/erokemo')
						await client.sendFileFromUrl(from, ecchi1.data.url, '', '', id)
					} else if (triple == 3) {
						const ecchi3 = await axios.get('https://nekos.life/api/v2/img/ero')
						await client.sendFileFromUrl(from, ecchi3.data.url, '', '', id)
					}
				}
				break


			case 'blowjob':
			case 'boquete':
				if (isGroupMsg) {
					if (!isNsfw) return client.reply(from, mess.error.Ac, id)
					if (double == 1) {
						const blowjob = await axios.get('https://nekos.life/api/v2/img/bj')
						await client.sendFileFromUrl(from, blowjob.data.url, '', '', id)
					} else if (double == 2) {
						const blowjobs = await axios.get('https://nekos.life/api/v2/img/blowjob')
						await client.sendFileFromUrl(from, blowjobs.data.url, '', '', id)
					}
				} else {
					const blowjob1 = await axios.get('https://nekos.life/api/v2/img/erok')
					await client.sendFileFromUrl(from, blowjob1.data.url, '', '', id)
				}
				break

			case 'feet':
				if (isGroupMsg) {
					if (!isNsfw) return client.reply(from, mess.error.Ac, id)
					const pezin = await axios.get('https://nekos.life/api/v2/img/feet')
					await client.sendFileFromUrl(from, pezin.data.url, '', '', id)
				} else {
					const pezin = await axios.get('https://nekos.life/api/v2/img/feet')
					await client.sendFileFromUrl(from, pezin.data.url, '', '', id)
				}
				break


			case 'feetg':
				if (isGroupMsg) {
					if (!isNsfw) return client.reply(from, mess.error.Ac, id)
					if (double == 1) {
						const feet = await axios.get('https://nekos.life/api/v2/img/feetg')
						await client.sendFileFromUrl(from, feet.data.url, '', '', id)
					} else if (double == 2) {
						const feets = await axios.get('https://nekos.life/api/v2/img/erofeet')
						await client.sendFileFromUrl(from, feets.data.url, '', '', id)
					}
				} else {
					if (double == 1) {
						const feet = await axios.get('https://nekos.life/api/v2/img/feetg')
						await client.sendFileFromUrl(from, feet.data.url, '', '', id)
					} else if (double == 2) {
						const feets = await axios.get('https://nekos.life/api/v2/img/erofeet')
						await client.sendFileFromUrl(from, feets.data.url, '', '', id)
					}
				}
				break


			case 'hard':
				if (isGroupMsg) {
					if (!isNsfw) return client.reply(from, mess.error.Ac, id)
					const hard = await axios.get('https://nekos.life/api/v2/img/spank')
					await client.sendFileFromUrl(from, hard.data.url, '', '', id)
				} else {
					const hard = await axios.get('https://nekos.life/api/v2/img/spank')
					await client.sendFileFromUrl(from, hard.data.url, '', '', id)
				}
				break


			case 'boobs':
				if (isGroupMsg) {
					if (!isNsfw) return client.reply(from, mess.error.Ac, id)
					if (double == 1) {
						const bobis = await axios.get('https://nekos.life/api/v2/img/boobs')
						await client.sendFileFromUrl(from, bobis.data.url, '', '', id)
					} else if (double == 2) {
						const tits = await axios.get('https://nekos.life/api/v2/img/tits')
						await client.sendFileFromUrl(from, tits.data.url, '', '', id)
					}
				} else {
					if (double == 1) {
						const bobis = await axios.get('https://nekos.life/api/v2/img/boobs')
						await client.sendFileFromUrl(from, bobis.data.url, '', '', id)
					} else if (double == 2) {
						const tits = await axios.get('https://nekos.life/api/v2/img/tits')
						await client.sendFileFromUrl(from, tits.data.url, '', '', id)
					}
				}
				break


			case 'lick':
				if (isGroupMsg) {
					if (!isNsfw) return client.reply(from, mess.error.Ac, id)
					if (double == 1) {
						const lick = await axios.get('https://nekos.life/api/v2/img/kuni')
						await client.sendFileFromUrl(from, lick.data.url, '', '', id)
					} else if (double == 2) {
						const les = await axios.get('https://nekos.life/api/v2/img/les')
						await client.sendFileFromUrl(from, les.data.url, '', '', id)
					}
				} else {
					if (double == 1) {
						const lick = await axios.get('https://nekos.life/api/v2/img/kuni')
						await client.sendFileFromUrl(from, lick.data.url, '', '', id)
					} else if (double == 2) {
						const les = await axios.get('https://nekos.life/api/v2/img/les')
						await client.sendFileFromUrl(from, les.data.url, '', '', id)
					}
				}
				break


			case 'femdom':
				if (isGroupMsg) {
					if (!isNsfw) return client.reply(from, mess.error.Ac, id)
					if (triple == 1) {
						const femdom = await axios.get('https://nekos.life/api/v2/img/femdom')
						await client.sendFileFromUrl(from, femdom.data.url, '', '', id)
					} else if (triple == 2) {
						const femdom1 = await axios.get('https://nekos.life/api/v2/img/yuri')
						await client.sendFileFromUrl(from, femdom1.data.url, '', '', id)
					} else if (triple == 3) {
						const femdom2 = await axios.get('https://nekos.life/api/v2/img/eroyuri')
						await client.sendFileFromUrl(from, femdom2.data.url, '', '', id)
					}
				} else {
					if (triple == 1) {
						const femdom = await axios.get('https://nekos.life/api/v2/img/femdom')
						await client.sendFileFromUrl(from, femdom.data.url, '', '', id)
					} else if (triple == 2) {
						const femdom1 = await axios.get('https://nekos.life/api/v2/img/yuri')
						await client.sendFileFromUrl(from, femdom1.data.url, '', '', id)
					} else if (triple == 3) {
						const femdom2 = await axios.get('https://nekos.life/api/v2/img/eroyuri')
						await client.sendFileFromUrl(from, femdom2.data.url, '', '', id)
					}
				}
				break


			case 'futanari':
				if (isGroupMsg) {
					if (!isNsfw) return client.reply(from, mess.error.Ac, id)
					const futanari = await axios.get('https://nekos.life/api/v2/img/futanari')
					await client.sendFileFromUrl(from, futanari.data.url, '', '', id)
				} else {
					const futanari = await axios.get('https://nekos.life/api/v2/img/futanari')
					await client.sendFileFromUrl(from, futanari.data.url, '', '', id)
				}
				break


			case 'masturb':
				if (isGroupMsg) {
					if (!isNsfw) return client.reply(from, mess.error.Ac, id)
					if (triple == 1) {
						const solog = await axios.get('https://nekos.life/api/v2/img/solog')
						await client.sendFileFromUrl(from, solog.data.url, '', '', id)
					} else if (triple == 2) {
						const pwank = await axios.get('https://nekos.life/api/v2/img/solog')
						await client.sendFileFromUrl(from, pwank.data.url, '', '', id)
					} else if (triple == 3) {
						const solour = await axios.get('https://nekos.life/api/v2/img/solo')
						await client.sendFileFromUrl(from, solour.data.url, '', '', id)
					}
				} else {
					if (triple == 1) {
						const solog = await axios.get('https://nekos.life/api/v2/img/solog')
						await client.sendFileFromUrl(from, solog.data.url, '', '', id)
					} else if (triple == 2) {
						const pwank = await axios.get('https://nekos.life/api/v2/img/solog')
						await client.sendFileFromUrl(from, pwank.data.url, '', '', id)
					} else if (triple == 3) {
						const solour = await axios.get('https://nekos.life/api/v2/img/solo')
						await client.sendFileFromUrl(from, solour.data.url, '', '', id)
					}
				}
				break


			case 'anal':
				if (isGroupMsg) {
					if (!isNsfw) return client.reply(from, mess.error.Ac, id)
					if (double == 1) {
						const solog = await axios.get('https://nekos.life/api/v2/img/cum')
						await client.sendFileFromUrl(from, solog.data.url, '', '', id)
					} else if (double == 2) {
						const anal = await axios.get('https://nekos.life/api/v2/img/cum_jpg')
						await client.sendFileFromUrl(from, anal.data.url, '', '', id)
					}
				} else {
					if (double == 1) {
						const solog = await axios.get('https://nekos.life/api/v2/img/cum')
						await client.sendFileFromUrl(from, solog.data.url, '', '', id)
					} else if (double == 2) {
						const anal = await axios.get('https://nekos.life/api/v2/img/cum_jpg')
						await client.sendFileFromUrl(from, anal.data.url, '', '', id)
					}
				}
				break


			case 'randomloli':
				if (isGroupMsg) {
					if (!isNsfw) return client.reply(from, mess.error.Ac, id)
					const loliz = await axios.get('https://nekos.life/api/v2/img/keta')
					await client.sendFileFromUrl(from, loliz.data.url, '', '', id)
				} else {
					const loliz = await axios.get('https://nekos.life/api/v2/img/keta')
					await client.sendFileFromUrl(from, loliz.data.url, '', '', id)
				}
				break


			case 'nsfwicon':
				if (isGroupMsg) {
					if (!isNsfw) return client.reply(from, mess.error.Ac, id)
					const icon = await axios.get('https://nekos.life/api/v2/img/nsfw_avatar')
					await client.sendFileFromUrl(from, icon.data.url, '', '', id)
				} else {
					const icon = await axios.get('https://nekos.life/api/v2/img/nsfw_avatar')
					await client.sendFileFromUrl(from, icon.data.url, '', '', id)
				}
				break


			case 'truth':
				const memean = await axios.get('https://nekos.life/api/v2/img/gecg')
				await client.sendFileFromUrl(from, memean.data.url, '', '', id)
				break


			case 'icon':
				const avatarz = await axios.get('https://nekos.life/api/v2/img/avatar')
				await client.sendFileFromUrl(from, avatarz.data.url, '', '', id)
				break


			case 'face':
				const gasm = await axios.get('https://nekos.life/api/v2/img/gasm')
				await client.sendFileFromUrl(from, gasm.data.url, '', '', id)
				break


			case 'ihentai':
				const selnum = Math.floor(Math.random() * 6) + 1
				if (isGroupMsg) {
					if (!isNsfw) return client.reply(from, mess.error.Ac, id)
					if (selnum == 1) {
						const clas = await axios.get('https://nekos.life/api/v2/img/classic')
						await client.sendFileFromUrl(from, clas.data.url, ``, '', id)
					} else if (selnum == 2) {
						const hentai = await randomNimek('hentai')
						await client.sendFileFromUrl(from, hentai, ``, 'Ui ui, hentai essa hora?', id)
					} else if (selnum == 3) {
						const hentai3 = await axios.get('https://nekos.life/api/v2/img/Random_hentai_gif')
						await client.sendFileFromUrl(from, hentai3, ``, 'Espero que curta o hentai e.e', id)
					} else if (selnum == 4) {
						const hentai4 = await axios.get('https://nekos.life/api/v2/img/pussy_jpg')
						await client.sendFileFromUrl(from, hentai4.data.url, ``, 'Espero que curta o hentai e.e', id)
					} else if (selnum == 5) {
						const hentai5 = await axios.get('https://nekos.life/api/v2/img/hentai')
						await client.sendFileFromUrl(from, hentai5.data.url, ``, 'Hentaizinho bom...', id)
					} else if (selnum == 6) {
						const hentai6 = await axios.get('https://nekos.life/api/v2/img/pussy')
						await client.sendFileFromUrl(from, hentai6.data.url, ``, 'Hentaizinho bom...', id)
					}
				} else {
					if (selnum == 1) {
						const hentai1 = await axios.get('https://nekos.life/api/v2/img/Random_hentai_gif')
						await client.sendFileFromUrl(from, hentai1, ``, 'Espero que curta o hentai e.e', id)
					} else if (selnum == 2) {
						const hentai2 = await axios.get('https://nekos.life/api/v2/img/pussy_jpg')
						await client.sendFileFromUrl(from, hentai2.data.url, ``, 'Espero que curta o hentai e.e', id)
					} else if (selnum == 3) {
						const clas = await axios.get('https://nekos.life/api/v2/img/classic')
						await client.sendFileFromUrl(from, clas.data.url, ``, '', id)
					} else if (selnum == 4) {
						const hentai4 = await axios.get('https://nekos.life/api/v2/img/hentai')
						await client.sendFileFromUrl(from, hentai4.data.url, ``, 'Hentaizinho bom...', id)
					} else if (selnum == 5) {
						const hentai5 = await axios.get('https://nekos.life/api/v2/img/pussy')
						await client.sendFileFromUrl(from, hentai5.data.url, ``, 'Hentaizinho bom...', id)
					} else if (selnum == 6) {
						const hentai6 = await randomNimek('hentai')
						await client.sendFileFromUrl(from, hentai6, ``, 'Ui ui, hentai essa hora?', id)
					}
				}
				break


			case 'yuri':
				const yuri1 = await randomNimek('yuri')
				console.log(yuri1)
				await client.sendFileFromUrl(from, yuri1, ``, ``, id)
				break


			case 'randomneko':
				if (isGroupMsg) {
					if (!isNsfw) return client.reply(from, mess.error.Ac, id)
					if (seven == 1) {
						const nekons = await axios.get('https://nekos.life/api/v2/img/nsfw_neko_gif')
						await client.sendFileFromUrl(from, nekons.data.url, ``, '', id)
					} else if (seven == 2) {
						const nsfwneko = await randomNimek('nsfw')
						await client.sendFileFromUrl(from, nsfwneko, ``, '', id)
					} else if (seven == 3) {
						const hololwk = await axios.get('https://nekos.life/api/v2/img/hololewd')
						await client.sendFileFromUrl(from, hololwk.data.url, ``, 'Neko gostosa...', id)
					} else if (seven == 4) {
						const lwkd = await axios.get('https://nekos.life/api/v2/img/lewdk')
						await client.sendFileFromUrl(from, lwkd.data.url, ``, '', id)
					} else if (seven == 5) {
						const lwkdk = await axios.get('https://nekos.life/api/v2/img/lewdkemo')
						await client.sendFileFromUrl(from, lwkdk.data.url, ``, '', id)
					} else if (seven == 6) {
						const eron = await axios.get('https://nekos.life/api/v2/img/eron')
						await client.sendFileFromUrl(from, eron.data.url, ``, '', id)
					} else if (seven == 7) {
						const holoero = await axios.get('https://nekos.life/api/v2/img/holoero')
						await client.sendFileFromUrl(from, holoero.data.url, ``, '', id)
					}
				} else {
					if (seven == 1) {
						const nekons = await axios.get('https://nekos.life/api/v2/img/nsfw_neko_gif')
						await client.sendFileFromUrl(from, nekons.data.url, ``, '', id)
					} else if (seven == 2) {
						const nsfwneko = await randomNimek('nsfw')
						await client.sendFileFromUrl(from, nsfwneko, ``, '', id)
					} else if (seven == 3) {
						const hololwk = await axios.get('https://nekos.life/api/v2/img/hololewd')
						await client.sendFileFromUrl(from, hololwk.data.url, ``, 'Neko gostosa...', id)
					} else if (seven == 4) {
						const lwkd = await axios.get('https://nekos.life/api/v2/img/lewdk')
						await client.sendFileFromUrl(from, lwkd.data.url, ``, '', id)
					} else if (seven == 5) {
						const lwkdk = await axios.get('https://nekos.life/api/v2/img/lewdkemo')
						await client.sendFileFromUrl(from, lwkdk.data.url, ``, '', id)
					} else if (seven == 6) {
						const eron = await axios.get('https://nekos.life/api/v2/img/eron')
						await client.sendFileFromUrl(from, eron.data.url, ``, '', id)
					} else if (seven == 7) {
						const holoero = await axios.get('https://nekos.life/api/v2/img/holoero')
						await client.sendFileFromUrl(from, holoero.data.url, ``, '', id)
					}
				}
				break


			case 'trap':
				if (isGroupMsg) {
					if (!isNsfw) return client.reply(from, mess.error.Ac, id)
					if (double == 1) {
						const tapr = await axios.get('https://nekos.life/api/v2/img/trap')
						await client.sendFileFromUrl(from, tapr.data.url, '', '', id)
					} else if (double == 2) {
						const trap = await randomNimek('trap')
						client.sendFileFromUrl(from, trap, ``, '', id)
					}
				} else {
					const tapr = await axios.get('https://nekos.life/api/v2/img/trap')
					await client.sendFileFromUrl(from, tapr.data.url, '', '', id)
				}
				break


			case 'randomwall':
				const walnime = await axios.get('https://nekos.life/api/v2/img/wallpaper')
				await client.sendFileFromUrl(from, walnime.data.url, '', '', id)
				break


			case 'dog':
				if (double == 1) {
					const list = await axios.get('http://shibe.online/api/shibes')
					const doguin = list.data[0]
					await client.sendFileFromUrl(from, doguin, '', 'doguinho', id)
				} else if (double == 2) {
					const doug = await axios.get('https://nekos.life/api/v2/img/woof')
					await client.sendFileFromUrl(from, doug.data.url, '', 'doguinho', id)
				}
				break

			case 'aww':
				const aww = await axios.get('https://meme-api.herokuapp.com/gimme/aww')
				client.sendFileFromUrl(from, aww.data.url, '', aww.data.title, id)
				break


			case 'look':
				const smug = await axios.get('https://nekos.life/api/v2/img/smug')
				await client.sendFileFromUrl(from, smug.data.url, '', '', id)
				break


			case 'holo':
				const holo = await axios.get('https://nekos.life/api/v2/img/holo')
				await client.sendFileFromUrl(from, holo.data.url, '', '', id)
				break


			case 'rolette':
				if (double == 1) {
					await client.reply(from, 'Bang, ela disparou e você morreu, é game over.', id)
				} else if (double == 2) {
					await client.reply(from, 'Você continua vivo, passe a vez.', id)
				}
				break


			case 'kisu':
				const kisu = await axios.get('https://nekos.life/api/v2/img/kiss')
				await client.sendFileFromUrl(from, kisu.data.url, '', '', id)
				break


			case 'tapa':
				const tapi = await axios.get('https://nekos.life/api/v2/img/slap')
				await client.sendFileFromUrl(from, tapi.data.url, '', '', id)
				break


			case 'gato':
			case 'cat':
				if (double == 1) {
					q2 = Math.floor(Math.random() * 900) + 300;
					q3 = Math.floor(Math.random() * 900) + 300;
					client.sendFileFromUrl(from, 'https://placekitten.com/' + q3 + '/' + q2, 'neko.png', 'Neko ')
				} else if (double == 2) {
					const catu = await axios.get('https://nekos.life/api/v2/img/meow')
					await client.sendFileFromUrl(from, catu.data.url, id)
				}
				break


			case 'pokemon':
				q7 = Math.floor(Math.random() * 890) + 1;
				await client.sendFileFromUrl(from, 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + q7 + '.png', 'Pokemon.png', '', id)
				break


			case 'screenshot':
				const _query = body.slice(12)
				if (!_query.match(isUrl)) return client.reply(from, mess.error.Iv, id)
				if (args.length == 0) return client.reply(from, 'Sinto cheiro de ortografia incorreta [faltou https:// ?]!', id)
				await ss(_query)
				await sleep(4000)
				await client.sendFile(from, './lib/media/img/screenshot.jpeg', 'ss.jpeg', 'Se certifique de evitar usar isso com pornografia.', id)
					.catch(() => client.reply(from, `Erro na screenshot do site ${_query}`, id))
				break


			case 'ship':
				lvak = body.trim().split(' ')
				if (args.length == 2) {
					await client.sendTextWithMentions(from, '❤️ ' + lvak[1] + ' tem um chance de ' + lvpc + '% de namorar ' + lvak[2] + '. 👩‍❤️‍👨')
				} else {
					await client.reply(from, 'Faltou marcar o casal de pombinhos!', id)
				}
				break


			case 'gay':
				gaak = body.trim().split(' ')
				var lgbt = ["lésbica", "gay", "bissexual", "transgenero", "queer", "intersexual", "pedro-sexual", "negrosexual", "helicoptero sexual", "ageneros", "androgino", "assexual", "macaco-sexual", "dedo-sexual", "Sexo-Inexplicavel", "predio-sexual", "sexual-não-sexual", "pansexual", "kink", "incestuoso", "comedor-de-casadas", "unicornio-sexual", "maniaco-sexual"]
				var guei = lgbt[Math.floor(Math.random() * lgbt.length)]
				if (args.length == 1) {
					await client.sendTextWithMentions(from, gaak[1] + ' é ' + lvpc + '% ' + guei + '.')
				} else {
					await client.reply(from, `Você é ` + lvpc + '% ' + guei + '.', id)
				}
				break


			case 'chance':
				if (args.length == 0) return client.reply(from, 'Defina algo para analisar.', id)
				await client.reply(from, `_De acordo com meus calculos super avançados de ~gato femea~ robô a chance de..._ \n\n*"${body.slice(8)}"*\n\n_...ser realidade é de_ *${lvpc}%.*`, id)
				break


			case 'kiss':
				arqa = body.trim().split(' ')
				if (args.length == 1) {
					const persona = author.replace('@c.us', '')
					client.sendTextWithMentions(from, 'Minha nossa! @' + persona + ' deu um beijo em ' + arqa[1] + ' !')
					if (double == 1) {
						await client.sendGiphyAsSticker(from, 'https://media.giphy.com/media/vUrwEOLtBUnJe/giphy.gif')
					} else {
						await client.sendGiphyAsSticker(from, 'https://media.giphy.com/media/1wmtU5YhqqDKg/giphy.gif')
					}
				} else {
					await client.reply(from, 'Marque ~apenas uma~ a pessoa quem você quer beijar hihihi', id)
				}
				break

			case 'slap':
				arq = body.trim().split(' ')
				const person = author.replace('@c.us', '')
				await client.sendGiphyAsSticker(from, 'https://media.giphy.com/media/S8507sBJm1598XnsgD/source.gif')
				client.sendTextWithMentions(from, '@' + person + ' *deu um tapa em* ' + arq[1])
				break

			case 'getmeme':
				const response = await axios.get('https://meme-api.herokuapp.com/gimme/memesbrasil');
				const {
					postlink, title, subreddit, url, nsfw, spoiler
				} = response.data
				client.sendFileFromUrl(from, `${url}`, 'meme.jpg', `${title}`, id)
				break

			case 'date':
				const timeda = moment(t * 1000).format('DD/MM/YY HH:mm:ss')
				await client.reply(from, 'Agora são exatamente\n"' + timeda + '"', id)
				break

			case 'menu':
				const timed = moment(t * 1000).format('DD/MM/YY HH:mm:ss')
				const allin = `Olá  @${sender.id}!\n`
				client.sendTextWithMentions(from, allin + help, id)
				client.reply(from, `De outros comandos temos...\n\n*${prefix}Admins* _é para administradores._\n\n*${prefix}Kill* _é apenas para meu dono._\n\n*${prefix}Adult* _é o menu de comandos adultos._\n\n*${prefix}Down* _é o menu de download de músicas e videos._`, id)
				break

			case 'admins':
				if (!isGroupMsg) return client.reply(from, mess.error.Gp, id)
				if (!isGroupAdmins) return client.reply(from, mess.error.Ga, id)
				await client.sendText(from, admins, id)
				break


			case 'adult':
				client.sendText(from, adult, id)
				break

			case 'kill':
				if (!isOwner) return client.reply(from, mess.error.Kl, id)
				client.sendText(from, owner, id)
				break

			case 'down':
				client.sendText(from, down, id)
				break

			case 'readme':
				client.reply(from, readme, id)
				break

			case 'meia-noite':
				try {
					client.sendPtt(from, './media/meia-noite.mp3', id)
				} catch (err) {
					client.reply(from, err, id)
				}
				break

			case 'yamete':
				try {
					client.sendPtt(from, './media/yamete.mp3', id)
				} catch (err) {
					client.reply(from, err, id)
				}
				break

			case 'banido':
				try {
					client.sendPtt(from, './media/banido.mp3', id)
				} catch (err) {
					client.reply(from, err, id)
				}
				break

			case 'hamerti':
				try {
					client.sendPtt(from, './media/hamerti.mp3', id)
				} catch (err) {
					client.reply(from, err, id)
				}
				break


			case 'mac':
				if (args.length == 0) return client.reply(from, 'Desculpe, mas você precisa especificar qual MAC deseja puxar.', id)
				await client.reply(from, 'Aguarde, essa operação leva cerca de 6 segundos por conta da limitação de tempo.', id)
				await sleep(3000)
				const maclk = await axios.get(`https://api.macvendors.com/${body.slice(5)}`)
				console.log(`{body.slice(5)}`)
				const macre = maclk.data
				await client.reply(from, `O telefone é da ${macre}.`, id)
				break


		}
	} catch (err) {
		console.log(color('[ERRO]', 'red'), err)
		client.forceRefocus()
	}
}
