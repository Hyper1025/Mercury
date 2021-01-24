const fs = require('fs-extra')

const {
    prefix,
    botName
} = JSON.parse(fs.readFileSync('./settings/settings.json'))

// NÃO REMOVA OS CREDITOS POR FAVOR, LEVOU MUITO TEMPO PRA SE FAZER UM BOT ASSIM!
exports.help = help()
function help() {
    return `*Lista de comandos 🤖*

*-${prefix}sticker*
_Faço suas imagens virarem sticker rapidinho!_

*-${prefix}stickercover*
_Mesma coisa que o anterior, porém corta a imagem para que preencha o canvas sticker._

*-${prefix}stickerNoBG*
_Isso é pra fazer stickers sem o fundo da imagem._

*-${prefix}gif*
_Com isso você pode fazer stickers com Gifs ou MP4 também!_

*-${prefix}img <marque um sticker>*
_Se quiser pegar a foto de um sticker, posso converte-la para você._

*-${prefix}Giphy <Link do site giphy>*
_Faça stickers por link usando o site giphy, ele é muito bom._

*-${prefix}ttp <frase>*
_Transforme frases em stickers._

*-${prefix}makesticker <pesquisa>*
_Faço um sticker baseado na sua pesquisa_

*-${prefix}Frase*
_Nesse comando eu te envio frases de anime ou inspiradoras._

*-${prefix}conversa (mensagem)*
_Quer conversar um pouco?_

*-${prefix}falar <mensagem>*
_E que tal conversar por voz?_

*-${prefix}Resposta <frase>*
_Adicione respostas no bot, para o banco de dados das conversas._

*-${prefix}tts (sigla de idioma) [frase]*
_Leio uma frase ou texto pra você!_

*-${prefix}idiomas*
_Lista de siglas de idiomas para o comando de cima._

*-${prefix}youtube*
_Pesquise vídeos no YouTube_

*-${prefix}msg <frase>*
_Mando o texto que você mandou de volta?_

*-${prefix}dog*
_Envio fotos de doguinhos pra você_

*-${prefix}gato*
_Gatos, simplesmente gatos._

*-${prefix}fox*
_Raposinhas bonitas, e não, eu não estou falando do Kurama, e sim das de verdade!_

*-${prefix}macaco*
_Pegue umas fotos de macacos aqui._

*-${prefix}aww*
_aww_

*-${prefix}ping*
_Bem, isso é pra medir o meu tempo de resposta._

*-${prefix}botstatus*
_Eu coloco aqui diversas informações minhas sobre mensagens._

*-${prefix}ID*
_Retorna a ID do chat._

*-${prefix}qr <url ou texto>*
_Retorna a QRCode pra você._

*-${prefix}nasa*
_Algo sobre o espaço (de acordo com a nasa)._

*-${prefix}profile*
_Mostro dados do seu perfil_

*-${prefix}groupinfo*
_Veja algumas informações desse grupo._

*-${prefix}add (numero)*
_Com isso você pode adicionar seus amigos sem pedir ao administrador._

*-${prefix}ownerGroup*
_Quer conhecer o dono do grupo mas tem preguiça de anotar os números? Use isso!_

*-${prefix}link*
_Se quiser obter o link do grupo, é só usar este comando._

*-${prefix}adms*
_Com isso eu chamo e te mostro quem são os ADMS do grupo._

*-${prefix}anime [nome]*
_Com isso você pesquisa um anime._

*-${prefix}randomAnime*
_Envio fotos aleatórias de anime._

*-${prefix}loli*
_Lolis são pra dar amor e carinho..._

*-${prefix}waifu*
_Com isso eu mando foto de waifus lindas._

*-${prefix}neko*
_Bom...uma neko as vezes cai bem né?_

*-${prefix}Husb*
_Essa e a mesma coisa da waifu, mas em versão homem._

*-${prefix}light <Frase>*
_Uma logo de neon em luz._

*-${prefix}wallpaper (Nome)*
_Quer obter uns wallpapers? Deixe comigo!_

*-${prefix}randomwall*
_Mais wallpapers de anime, mas desse vez são de personagens._

*-${prefix}quote*
_Que tal criar sua própria frase inspiradora?_

*-${prefix}search (pesquise uma foto)*
_Com isso você pode pesquisar fotos para achar o nome do anime._

*-${prefix}pokemon*
_Quer ver fotos de pokemon's?_

*-${prefix}Flip*
_O velho joguinho de cara e coroa..._

*-${prefix}Roll*
_Esse é o famoso jogo do par ou impar, ou seja, dados._

*-${prefix}poll*
_Verifique enquetes ativas._

*-${prefix}vote (número)*
_Vote numa enquete, se estiver tendo uma..._

*-${prefix}newpoll (nome)*
_Crie uma enquete para os outros votarem._

*-${prefix}ins (nome)*
_Adicione opções de voto na enquete._

*-${prefix}dva*
_Isso e pra obter fotos da DVA do OverWatch_

*-${prefix}Baguette*
_Já é hora do meu pãozinho?!_

*-${prefix}Yuri*
_Caso você goste de algo mais lésbico em anime, aqui está._

*-${prefix}girl*
_Caso você seja feio, pode obter fotos de garotas bonitas por aqui._

*-${prefix}Math <expressão>*
_Realiza cálculos matemáticos._

*-${prefix}screenshot*
_Tem medo de acessar sites? Use isso e eu mostro pra você o que tem dentro!_

*-${prefix}Life*
_Que tal se a gente stalkear alguém aleatório do mundo hoje?_

*-${prefix}Random <assunto>*
_Se usar isso, vou escolher alguém aleatório do grupo._

*-${prefix}make <frase>*
_Escrevo pra você em um caderno._

*-${prefix}slogan <Nome>*
_Posso fazer uns slogans bonitinhos para você._

*-${prefix}send <link de imagem>* 
_Caso queira, posso enviar as fotos de um link._

*-${prefix}slap @marque_alguém*
_Irei de ajudar a descer um tapasso nos outros._

*-${prefix}ship <@pessoa @pessoa>*
_Quer saber o quanto seus amigos combinam?_

*-${prefix}kiss @marque_uma_Pessoa*
_Você dá um beijinho em alguém!_

*-${prefix}rolette*
_Roleta hussarda_

*-${prefix}baka*
_"Bakaaa!"_

*-${prefix}sip <Digite um IP>*
_Posso conseguir algumas informações de um IP._

*-${prefix}scep <Digite o CEP>*
_Se quiser pode me pedir pra pesquisar sobre um CEP._

*-${prefix}Mac <número do MAC>*
_Com isso eu irei pesquisar de onde é o MAC._

*-${prefix}genero <nome>*
_Se quiser saber sobre o nome de alguém use isso._

*-${prefix}Death <nome>*
_Calcularei a idade que você vai morrer baseando-me nas ultimas mortes registradas._

*-${prefix}chance <texto>*
_Digo pra você a chance de que algo aconteça_

*-${prefix}oculto*
_Shhhhh, eu não saberia se fosse você_

*-${prefix}detector*
_Já ta apitando pipipipi_

*-${prefix}getmeme*
_Por que não curtir uns memes né?_

*-${prefix}image <nome>*
_Está sem internet fora do WhatsApp? Posso ajudar mandando fotos do Pinterest._

*-${prefix}simg <Use numa foto>*
_Posso pesquisar imagens na internet usando esse comando._

*-${prefix}upimg <Use numa foto>*
_Se usar esse comando, irei fazer upload de suas imagens com duração de 1 dia._

*-${prefix}store <nome>*
_Obter informações de apps da PlayStore? Com isso eu posso te ajudar._

*-${prefix}contar <mensagem>*
_Quer contas as letras que tem em um texto?_

*-${prefix}inverter <frase>*
_Se quiser inverter as palavras temos isso._

*-${prefix}Google <termo>*
_Pesquise coisas no Google._

*-${prefix}ball*
_8 Ball de frases aleatórias._

*-${prefix}cocegas*
_Hmmm, cocegas em anime eu acho..._

*-${prefix}lizard*
_Fotinhas de lagarto nerr._

*-${prefix}feed*
_Eventos que tem haver com comida em animes._

*-${prefix}quack*
_Ui ui, vai uns patos ~gansos~ ou sei la...?_

*-${prefix}poke*
_Tome uns petelecos!_

*-${prefix}cafune*
_Todos amamos cafune..._

*-${prefix}Kisu*
_Umas fotinhos de beijo..._

*-${prefix}tapa*
_Fotos de tapinhas!_

*-${prefix}hug*
_É aqui que eu boto fotos fofinhas que tem um abraço entre personagens de anime._

*-${prefix}truth*
_Algumas verdades sobre o universo dos animes._

*-${prefix}icon*
_Ícones para por no perfil._

*-${prefix}yaoi*
_Yaoi sem hentai._

*-${prefix}face*
_Icon do rosto de garotas de anime._

*-${prefix}look*
_Olhos na tela eheheh_

*-${prefix}holo*
_Fotinhos da personagem Holo._

*-${prefix}pornhub <texto 1 | texto 2>*
_Crie sua propriá logo do PornHub._

*-${prefix}neon <Frase1|Frase2|Frase3>*
_Uma logo de neon estilo hackerman._

*-${prefix}3D <texto>*
_Crie textos em 3D._

*-${prefix}gaming <nome>*
_Crie logos de jogador._

*-${prefix}fogareu <Nick>*
_Crie logos do fogo gratuito._

*-${prefix}thunder <frase>*
_Uma logo do céu com trovões._

*-${prefix}blackpink <nome>*
_Crie logos em preto e pink._

*-${prefix}wolf <Frase1|Frase2>*
_Logo de Lobos._`
}

exports.down = down()
function down() {
    return `*Downloads*

*-${prefix}Play <nome>*
_Baixe musicas pelo nome._

*-${prefix}Video <nome>*
_Baixe videos pelo nome._

*-${prefix}Mp3 <link do YouTube>*
_Baixe audios por link._

*-${prefix}Mp4 <link do YouTube>*
_Baixe videos por link._

*-${prefix}fb <link facebook>*
_Baixe videos do facebook._

*-${prefix}ig <link instagram>*
_Baixe videos do instagram._`
}

exports.adult = adult()
function adult() {
    return `Comandos do PV - Grupos NSFW

*-${prefix}RandomNeko*
_Temos hentai de nekos por aqui e.e_

*-${prefix}iHentai*
_Mas se nõ gostar, temos aleatórios também!_

*-${prefix}nh (codigo)*
_Seja feliz vendo NHentai comigo e.e_

*-${prefix}trap*
_Se você gosta de traps, isso é pra você e.e_

*-${prefix}blowjob*
_Fotinhas de blowjob em anime._

*-${prefix}iecchi*
_Umas fotos de ecchi que tenho aqui..._

*-${prefix}feet*
_Hentai para os amantes de pezinho._

*-${prefix}feetg*
_Mesmo que o de cima, porém diferente_

*-${prefix}Lick*
_"Lambidinha..."_

*-${prefix}Femdom*
_Meio que um yuri...hentai..._

*-${prefix}futanari*
_Vai uma futanari?_

*-${prefix}boobs*
_Olha a tetinhaaa..._

*-${prefix}masturb*
_Hmmm, garotas solo..._

*-${prefix}Anal*
_Hentai "padrão" de anal claro._

*-${prefix}randomLoli*
_Hentai do tipo Lolicon._

*-${prefix}Hard*
_Hentai de disciplinação, por exemplo, hentai de tapas na bunda._

*-${prefix}nsfwicon*
_Foto de perfil +18 por aqui..._

*-${prefix}Pezinho*
_Fotos de pezinho._

*-${prefix}Porn*
_Pron real._

*-${prefix}Lesbian*
_Lesbicas reais se pegando._

*-${prefix}gonewild*
_Seja livre._

*-${prefix}cosplaylewd*
_Cosplays sensuais._

*-${prefix}Pgay*
_Pornografia gay para quem curte._
`
}

exports.owner = owner()
function owner() {
    return `*⚠ [Meu dono Apenas] ⚠*

*-${prefix}clearall*
_Com isso todas as mensagens são limpas._

*-${prefix}dellall*
_Deleto todos os meus chats_

*-${prefix}Broad (mensagem)*
_Posso enviar uma mensagem para todos usando._

*-${prefix}leaveall*
_Se desejar saio de todos os grupos._

*-${prefix}tela*
_Peça-me um print da tela._

*-${prefix}blocks*
_Saiba quem tentou me ligar, atacar ou floodar._

*-${prefix}welcome [enable|disable]*
_Me faz dar Boas-Vindas e Good-Bye._

*-${prefix}encerrar*
_Faz com que eu me desligue._

*-${prefix}kickall*
_Remova todos os membros._`
}

exports.admins = admins()
function admins() {
    return `*⚠ [Administradores Apenas] ⚠*
_Comandos que apenas os ademiros podem usar!_

*-${prefix}kick @user*
_Expulse alguém (pode mencionar vários)._

*-${prefix}promote @user*
_Faça alguém virarem administradores._

*-${prefix}leave*
_Se quiser eu saio do grupinho._

*-${prefix}demote @user*
_Isso é pra você demitir administradores do grupinho._

*-${prefix}everyone <assunto>*
_Marque todos os membros_

*-${prefix}del [Marque a mensagem do BOT]*
_Se precisar deletar minhas mensagens, use isso._

*-${prefix}onlyadms [on|off]*
_Fecho o grupo e deixo que só os administradores consigam falar, ou não._

*-${prefix}setimage*
_Altero a imagem do grupo_

*-${prefix}revoke*
_Se usar isso, eu irei reiniciar o link do grupo._

*-${prefix}blacklist <on/off>*
_Bane quem tiver nela quando entrarem no grupo._

*-${prefix}fake <on/off>*
_Bane números de fora do seu país._
`
}

exports.readme = readme()
function readme() {
    return `Veja aqui: https://github.com/Hyper1025/Mercury#readme`
}

exports.donate = donate()
function donate() {
    return ``
}

exports.lang = lang()
function lang() {
    return `
Linguas do comando de Voz
Use sem os ' ' 
	
'af' =  'Africano'

'ar' =  'Arabico'

'au' =  'Inglês da Australia'

'br' =  'Português do Brasil'

'ca' =  'Catalã (Catalonia)'

'cn' =  'Chinês (Mandarin/China)'

'cs' =  'Tcheca'

'cy' =  'Galês'

'da' =  'Dinamarquês'

'de' =  'Germânico/Alemão'

'el' =  'Grega'

'en' =  'Inglês'

'eo' =  'Esperanto'

'es' =  'Espanhol'

'fi' =  'Finlandês'

'fr' =  'Francês'

'hi' =  'Hindi'

'hr' =  'Croácio'

'ht' =  'Haitiano'

'hu' =  'Húngaro'

'hy' =  'Armênico'

'id' =  'Indonésio'

'is' =  'islandês'

'it' =  'Italiano'

'jp' =  'Japonês'

'ko' =  'Coreano'

'la' =  'Latim'

'lv' =  'Letonês'

'mk' =  'Macedônio'

'nl' =  'Holandês'

'no' =  'Norueguês'

'pl' =  'Polonês'

'pt' =  'Português de Portugal'

'ro' =  'Romeno'

'ru' =  'Russo'

'sk' =  'Eslovaco'

'sp' =  'Espanhol da Espanha'

'sq' =  'Albanês'

'sr' =  'Servia'

'su' =  'Espanhol dos Estados Unidos'

'sv' =  'Sueco'

'sw' =  'Suaíli'

'ta' =  'Tamil'

'th' =  'Tailandês'

'tr' =  'Turco'

'tw' =  'Chinês (Mandarin/Taiwan)'

'uk' =  'Inglês do Reino Unido)'

'us' =  'Inglês dos Estados Unidos'

'vi' =  'Vietnamita'

'yu' =  'Chinês (Cantonesa)'

'zh' =  'Chinês'`
}
