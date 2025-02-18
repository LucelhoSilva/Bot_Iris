// messageHandler.js
const commands = require('../commands');

class MessageHandler {
    constructor(sock) {
        this.sock = sock;
        this.userStates = new Map();
        this.userTimers = new Map();
        this.messageHistory = new Map();
        this.TIMEOUT_DURATION = 4 * 60 * 1000;
        
        // Lista de números bloqueados
        this.blockedNumbers = new Set([
            '558182687275@s.whatsapp.net',
            '553186977393@s.whatsapp.net',
            '554499090895@s.whatsapp.net',
            '553171632221@s.whatsapp.net',
            '5531997428235@s.whatsapp.net',
            '5531997087192@s.whatsapp.net',
            '5537999712076@s.whatsapp.net',
        ]);
    }

    initialize() {
        this.sock.ev.on('messages.upsert', async (m) => {
            try {
                await this.handleMessage(m);
            } catch (error) {
                console.error('Erro no handler de mensagens:', error);
            }
        });
    }

    async handleMessage({ messages }) {
        try {
            const msg = messages[0];
            
            if (!msg.message || msg.key.fromMe) return;

            const userMessage = msg.message.conversation || 
                              msg.message.extendedTextMessage?.text || '';
            const from = msg.key.remoteJid;
            const messageId = msg.key.id;

            // Verifica se o número está bloqueado
            if (this.isNumberBlocked(from)) {
                console.log(`Mensagem bloqueada do número: ${from}`);
                return;
            }

            if (this.messageHistory.has(messageId)) {
                return;
            }

            this.messageHistory.set(messageId, true);

            if (this.messageHistory.size > 100) {
                const oldestKey = this.messageHistory.keys().next().value;
                this.messageHistory.delete(oldestKey);
            }

            this.resetUserTimer(from);

            if (!this.userStates.has(from)) {
                this.initializeUserState(from);
            }

            try {
                const response = await commands.menu.execute(userMessage, this.userStates.get(from));
                await this.sock.sendMessage(from, { text: response });
            } catch (error) {
                console.error('Erro ao processar comando:', error);
                await this.sock.sendMessage(from, { 
                    text: 'Desculpe, ocorreu um erro ao processar sua solicitação.' 
                });
            }
        } catch (error) {
            console.error('Erro no processamento da mensagem:', error);
            throw error;
        }
    }

    isNumberBlocked(number) {
        return this.blockedNumbers.has(number);
    }

    blockNumber(number) {
        // Garante que o número está no formato correto
        const formattedNumber = number.includes('558182687275@s.whatsapp.net') 
            ? number 
            : `${number}@s.whatsapp.net`;
        this.blockedNumbers.add(formattedNumber);
    }

    unblockNumber(number) {
        const formattedNumber = number.includes('@s.whatsapp.net') 
            ? number 
            : `${number}@s.whatsapp.net`;
        this.blockedNumbers.delete(formattedNumber);
    }

    initializeUserState(userId) {
        this.userStates.set(userId, {
            currentMenu: 'main',
            hasShownWelcome: false,
            selectedCity: null
        });
    }

    resetUserTimer(userId) {
        if (this.userTimers.has(userId)) {
            clearTimeout(this.userTimers.get(userId));
        }

        const timer = setTimeout(async () => {
            try {
                await this.sock.sendMessage(userId, { 
                    text: '⚠️ Tempo de atividade esgotado, encerrando sessão... ⚠️' 
                });

                this.userStates.delete(userId);
                this.userTimers.delete(userId);
            } catch (error) {
                console.error('Erro ao encerrar sessão:', error);
            }
        }, this.TIMEOUT_DURATION);

        this.userTimers.set(userId, timer);
    }
}

module.exports = MessageHandler;