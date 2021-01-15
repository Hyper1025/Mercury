<p align="center">
<img src="https://imgur.com/Kt7tgvj.png" width="256" height="256"/>
</p>

### Introdução
Esse bot é baseado na Íris, bot feito pela Legião Z do WhatsApp, com algumas melhorias e refatorações. Principalmente na relação a downloads e play de mídia do YouTube. Também há melhorias na criação de stickers, podendo o usuário fazer stickers mantendo as proporções originais da imagem.

Posteriormente pretendo implementar bibliotecas de inteligência artificial para diversas funções. Incluindo a detecção de materiais NSFW para ajudar na administração de grupos do WhatsApp.

Caso queira ver o projeto original, é só clicar [aqui](https://github.com/KillovSky/iris)

### Agradecimentos
-  [WA-Automate](https://github.com/open-wa/wa-automate-nodejs)
-  [KillovSky](https://github.com/KillovSky/iris)
-  [ArugaZ](https://github.com/ArugaZ/whatsapp-bot)
-  [MhankBarBar](https://github.com/MhankBarBar/whatsapp-bot)

### Clonando o repositório e instalando dependências
Você precisa ter esse repositório, é simples, rode os comandos abaixo.

```bash
> git clone https://github.com/Hyper1025/Mercury.git
> cd Mercury
> npm i
> npm install gify-cli gify
> npm install --save @ffmpeg-installer/ffmpeg
```
## Opcional:
Caso já queira deixar o bot preparado para o uso de IA
Se você tiver GPU`s que comportem CUDA, use o *GPU TensorFlow.js for Node:*

CPU TensorFlow.js for Node:
```bash
> npm install @tensorflow/tfjs-node
```

 GPU TensorFlow.js for Node:
 ```bash
 > npm install @tensorflow/tfjs-node-gpu
 ```
 
### Configurando
Na raiz desse projeto procure pela pasta **settings**, e então lá você deve criar dois arquivos, o **api.json** e o **settings.json**

Copie isso para o arquivo que você nomeou como **api.json** e altere as ‘strings’
```json
{
"apiRemoveBg": "APIKeyHere",
"apiImgBB":"APIKeyHere",
"apiNasa":"APIKeyHere",
"apiAlphaCoders":"APIKeyHere",
"apiFlash":"APIKeyHere"
}
```
Aqui estão os sites onde você deve obter as chaves de API: 
- [RemoveBg](https://www.remove.bg/pt-br/api)
- [ImgBB](https://api.imgbb.com)
- [Nasa](https://api.nasa.gov)
- [AlphaCoders](https://wall.alphacoders.com/api_signup.php)
- [ApiFlash](https://apiflash.com)

Copie isso para o arquivo que você nomeou como **settings.json** e altere as ‘strings’
```json
{
"ownerNumber": "55xxxxxxxxxx",
"prefix": "#",
"botName": "Bot",
"memberLimit": 100,
"memberMinimum": 5,
"groupLimit": 8
}
```

### Iniciar
Localize o diretório do projeto com:
```bash
> cd <insire o diretório do projeto aqui>
```
Exemplo:
```bash
> cd C:\GitHub\Mercury
```
O console de comando deve ir para o diretório especificado no comando anterior. 

Agora é só inicializar com:
```bash
> npm start
```
Agora escaneie o QRCode.

### Ver todos os comandos

Digite no seu chat a mensagem:
```bash
> #menu
```
Por padrão o prefixo dos comandos é **#**. Isso pode ser alterado no arquivo de configuração conforme mostrado anteriormente.

### Crie seus comandos

Abra o arquivo **msgHandler.js** e ache um lugarzinho em branco bonito, darei um exemplo de resposta simples, vá testando como quiser

```bash
case  'Nome do comando sem espaços':
await kill.reply(from, 'Sua mensagem', id)
break
```
Caso  queira ver tudo que o WA-Automate consegue fazer, entre [aqui](https://docs.openwa.dev/classes/client.html)