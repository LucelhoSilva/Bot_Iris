class MenuTabelas {
    static async execute(userInput, state) {
        // Se o usuário digitar "Q" em qualquer submenu, retorna ao menu principal
        if (userInput && userInput.toLowerCase() === 'q') {
            return this.resetAndReturnToMain(state);
        }

        // Verifica se o usuário já viu a tabela e deseja voltar ao menu principal
        if (state.currentMenu === 'tabelas' && userInput && state.hasSeenTable) {
            return this.resetAndReturnToMain(state);
        }

        // Para qualquer interação no menu tabelas, mostra a imagem
        return this.getMenu();
    }

    static resetAndReturnToMain(state) {
        // Reseta o estado
        Object.assign(state, {
            currentMenu: 'main',
            hasShownWelcome: false,
            selectedCity: null,
            hasSeenTable: false
        });
        
        // Retorna null para indicar que deve mostrar mensagem de boas-vindas
        return null;
    }

    static getMenu() {
        // Retorna um objeto de imagem diretamente no formato que o Baileys espera
        return {
            // IMAGEM MERAMENTE ILUSTRATIVA E NÃO REPRESENTA O PREÇO REAL DE QUALQUER PRODUTO OU SERVIÇO.
            image: { url: 'https://img.freepik.com/vetores-gratis/tabela-de-precos_52683-8998.jpg' },
            caption: '📊 Exibindo tabela de preços...\n\nApós visualizar, digite "Q" para sair.'
        };
    }

    // Mantemos o formatMenu para consistência com outros módulos
    static formatMenu(menuData) {
        let response = `${menuData.title}\n\n`;
        Object.entries(menuData.options).forEach(([key, value]) => {
            response += `${key} - ${value}\n`;
        });
        return response;
    }
}

module.exports = MenuTabelas;