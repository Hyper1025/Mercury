const { evaluate } = require("mathjs");

exports.run = async (client, message, args) => {
    if (args.length == 0) {
        client.sendText(message.from, 'Você não especificou nenhum cálculo ')
    }
    try {
        const expressions = args.join(" ");
        console.log(expressions);
        const answer = evaluate(expressions);
        console.log(answer);
        client.sendText(message.from, `O resultado para *${expressions}* é *${answer.toString()}*`);
    } catch (error) {
        client.sendText(message.from, 'Algo deu errado 😨');
    }
};

exports.help = {
    name: "Calc",
    description: "Calcule algo",
    usage: "Calc _expressão_"
};