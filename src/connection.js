const { default: makeWASocket, DisconnectReason, useMultiFileAuthState } = require('baileys'); // Correção do caminho da biblioteca
const P = require('pino');
const { Boom } = require('@hapi/boom');
const MessageHandler = require('./middlewares/messageHandler');

class WhatsAppConnection {
    static async initialize() {
        const { state, saveCreds } = await useMultiFileAuthState('./assets/auth/baileys');
        
        const sock = makeWASocket({
            printQRInTerminal: true,
            auth: state,
            logger: P({ level: 'silent' }),
        });

        this.setupConnectionHandlers(sock, saveCreds);
        return sock;
    }

    static setupConnectionHandlers(sock, saveCreds) {
        sock.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect } = update;

            if (connection === 'close') {
                const shouldReconnect = (lastDisconnect?.error instanceof Boom)?.output?.statusCode !== DisconnectReason.loggedOut;

                if (shouldReconnect) {
                    this.initialize();
                }
            }
        });

        sock.ev.on('creds.update', saveCreds);
        
        // Inicializa o handler de mensagens
        const messageHandler = new MessageHandler(sock);
        messageHandler.initialize();
    }
}

module.exports = WhatsAppConnection;