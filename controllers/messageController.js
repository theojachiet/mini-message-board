const db = require("../db");

async function getMessageById(req, res) {
    const { messageId } = req.params;

    try {
        const message = await db.getMessageById(Number(messageId));

        if (!message) {
            throw new Error('Message not found');
        }

        res.render('../views/message', { message: message });
    } catch (error) {
        console.error('Error while retrieving message: ', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { getMessageById };