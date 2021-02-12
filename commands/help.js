const { readdir } = require("fs");
const fsExtra = require('fs-extra');
const { prefix } = JSON.parse(fsExtra.readFileSync('./settings/settings.json'));
const availableCommands = new Set();

exports.run = (client, message, args) => {
    let tmpFile = {};
    readdir("./commands/", (e, files) => {
        if (e) console.error(e);

        files.forEach((jsFile) => {
            const cmdFile = require(`./${jsFile}`);
            tmpFile[jsFile.replace(".js", "")] = {};
            tmpFile[jsFile.replace(".js", "")].name = cmdFile.help.name;
            tmpFile[jsFile.replace(".js", "")].description = cmdFile.help.description;
            tmpFile[jsFile.replace(".js", "")].usage = cmdFile.help.usage;
            availableCommands.add(jsFile.replace('.js', ''))
        });

        // Se não passar argumentos responde com a lista de comandos completa
        if (!args[0]) {
            // prettier-ignore
            client.sendText(message.from, `*Comandos disponíveis:*\n${Object.keys(tmpFile).join(", ")}\n\nvocê pode user *${prefix}help* _Nome do comando_ para informações avançadas.`);
        } else {
            // Se passar argumento, procura pelo comando e envia com descrição bonitinha
            const commandName = args[0];

            // Verifica se o comando existe, se existir continua o código, do contrário retorna dizendo que o comando solicitado não existe
            if (!availableCommands.has(commandName)) {
                return client.sendText(message.from, `O comando *${prefix}${commandName}* não existe\nTalvez você tenha digitado algo errado 🤔`);
            }

            const { name, description, usage } = require(`./${commandName}.js`).help;
            client.sendText(message.from, `*${name}*\n*Descrição:* ${description}\n*Uso:* ${usage}`);

        };
    });
};

exports.help = {
    name: "Help",
    description: "Mostra lista de comandos do bot",
    usage: "help"
};