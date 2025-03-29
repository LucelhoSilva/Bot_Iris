const { default: makeWASocket, DisconnectReason, useMultiFileAuthState } = require('baileys');
const P = require('pino');
const { Boom } = require('@hapi/boom');
const MessageHandler = require('./middlewares/messageHandler');
const qrcode = require('qrcode-terminal'); // 🔹 Biblioteca para exibir QR code no terminal

class WhatsAppConnection {
    static async initialize() {
        const { state, saveCreds } = await useMultiFileAuthState('./assets/auth/baileys');
        
        const sock = makeWASocket({
            auth: state,
            logger: P({ level: 'silent' }),
        });

        this.setupConnectionHandlers(sock, saveCreds);
        return sock;
    }

    static setupConnectionHandlers(sock, saveCreds) {
        sock.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect, qr } = update;

            // ✅ Exibir QR Code manualmente quando necessário
            if (qr) {
                console.log("📌 Escaneie o QR Code abaixo para conectar:");
                qrcode.generate(qr, { small: true });
            }

            if (connection === 'close') {
                const shouldReconnect = (lastDisconnect?.error instanceof Boom)?.output?.statusCode !== DisconnectReason.loggedOut;

                if (shouldReconnect) {
                    console.log("🔄 Tentando reconectar...");
                    this.initialize();
                } else {
                    console.log("🚫 Desconectado permanentemente. É necessário excluir a autenticação e conectar novamente.");
                }
            }

            if (connection === 'open') {
                console.log("✅ Bot conectado com sucesso!");
            }
        });

        sock.ev.on('creds.update', saveCreds);
        
        // Inicializa o handler de mensagens
        const messageHandler = new MessageHandler(sock);
        messageHandler.initialize();
    }
}

module.exports = WhatsAppConnection;
