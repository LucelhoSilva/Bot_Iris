const commands = require('../commands');

class MessageHandler {
    constructor(sock) {
        this.sock = sock;
    }

    initialize() {
        this.sock.ev.on('messages.upsert', this.handleMessage.bind(this));
    }

    async handleMessage({ messages }) {
        const msg = messages[0];
        
        if (!msg.message || msg.key.fromMe) return;

        const userMessage = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
        const from = msg.key.remoteJid;

        try {
            const response = await commands.menu.execute(userMessage);
            await this.sock.sendMessage(from, { text: response });
        } catch (error) {
            console.error('Erro ao processar mensagem:', error);
            await this.sock.sendMessage(from, { 
                text: 'Desculpe, ocorreu um erro ao processar sua solicitação.' 
            });
        }
    }
}

module.exports = MessageHandler;