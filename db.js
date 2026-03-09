const messages = [
    {
        id: 1,
        text: "Hi there!",
        user: "Amando",
        added: new Date().toLocaleDateString('fr')
    },
    {
        id: 2,
        text: "Hello World!",
        user: "Charles",
        added: new Date().toLocaleDateString('fr')
    }
];

async function getMessageById(messageId) {
    messages.find(message => message.id === messageId)
}

module.exports = { messages, getMessageById }