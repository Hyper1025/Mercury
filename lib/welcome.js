const fs = require('fs-extra')
const { sleep } = require('./functions')

module.exports = welcome = async (client, event) => {
	const welkom = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
	const bklist = JSON.parse(fs.readFileSync('./database/group/anti.json'))
	const anti = JSON.parse(fs.readFileSync('./database/group/blacklist.json'))
	const fks = JSON.parse(fs.readFileSync('./database/group/fake.json'))
	const isWelkom = welkom.includes(event.chat)
	const fknm = event.who
	const { prefix, DddCountryAllowed } = JSON.parse(fs.readFileSync('./settings/settings.json'))
	const isFake = fks.includes(event.chat)
	const fake = fknm.startsWith(DddCountryAllowed)
	const isAnti = anti.includes(event.chat)
	const fuck = bklist.includes(event.who)
	const gChat = await client.getChatById(event.chat)
	const { contact, groupMetadata, name } = gChat
	try {
		if (event.action == 'add' && isWelkom && !fuck && fake) {
			await client.sendTextWithMentions(event.chat, `Olá @${event.who.replace('@c.us', '')}! 🥰 \n\nSeja bem vindo ao ${name} 😎 \n\nDesejamos que se divirta e obviamente que siga nossas regras! ✅ \n\nCaso precise, chame um Administrador.\n Se quiser ver meus comandos use ${prefix}menu 👨🏻‍💻`)
		} else if (event.action == 'add' && isAnti && fuck) {
			await client.sendText(event.chat, `E TU TA AQUI MENÓ?! TU TA AQUI DNV MENÓ??`)
			await sleep(2000)
			await client.removeParticipant(event.chat, event.who)
		} else if (event.action == 'add' && isFake && !fake) {
			await client.sendTextWithMentions(event.chat, `Olá @${event.who.replace('@c.us', '')}, como parte do nosso sistema de segurança, números de fora do Brasil são banidos, se você não for alguém mal e quiser estar no grupo pacificamente, por favor contate os administradores 😉.\n\nHello @${event.who.replace('@c.us', '')}, as part of our security system, numbers outside Brazil are banned, if you are not someone bad and want to be in the group peacefully, please contact the administrators 😉.\n\nHalo @${event.who.replace('@c.us', '')}, sebagai bagian dari sistem keamanan kami, nomor di luar Brasil dilarang, jika Anda bukan orang jahat dan ingin berada di grup dengan damai, silakan hubungi administrator 😉.`)
			await sleep(4000)
			await client.removeParticipant(event.chat, event.who)
		}
		if (event.action == 'remove' && isWelkom && !fuck && fake) {
			var profile = await client.getProfilePicFromServer(event.who)
			if (profile == '' || profile == undefined) profile = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQcODjk7AcA4wb_9OLzoeAdpGwmkJqOYxEBA&usqp=CAU'
			await client.sendFileFromUrl(event.chat, profile, 'profile.jpg', '')
			await client.sendTextWithMentions(event.chat, `Mais um membro saiu, sentiremos falta do @${event.who.replace('@c.us', '')} ...`)
		}
	} catch (err) {
		console.log(err)
	}
}