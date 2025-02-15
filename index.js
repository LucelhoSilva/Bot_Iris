const WhatsAppConnection = require('./src/connection');

async function startBot() {
    try {
        await WhatsAppConnection.initialize();
        console.log('Bot iniciado com sucesso!');
    } catch (error) {
        console.error('Erro ao iniciar o bot:', error);
        process.exit(1);
    }
}

startBot();