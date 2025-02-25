class MenuTabelas {
    static execute(userInput, state, conn, from) {

        if (userInput && state.currentMenu === 'tabelas') {
            const menu = this.getMenu();
            conn.sendMessage(from, menu); // conn = conexão Baileys, jid = número do destinatário
        }
    }
    
    static getMenu() {
        return {
            image: { url: 'https://example.com/imagem.jpg' },
            caption: 'Aqui está a tabela com nossos planos.\n\nDigite qualquer coisa para voltar ao menu principal!'
        };
    }
}
module.exports = MenuTabelas;