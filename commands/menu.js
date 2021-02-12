exports.run = (client, message) => {
    try {
        client.sendText(message.from, `Menu não existe mais, use #help`)
    } catch (error) {
        console.log(error);
    }
};

exports.help = {
    name: "TEMPORÁRIO",
    description: "Sugere usar #help",
    usage: "#help"
};