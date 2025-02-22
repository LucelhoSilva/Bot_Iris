class MenuSuporte {

    /*
        IMPORTANTE: ===============================
        ESSE ARQUIVO FOI DESENVOLVIDO EM TEMPO LIMITADO E RESTRITO DE TESTES
        VERSÃO À QUAL FOI IMPLEMENTADO O ESTE CÓDIGO SEM TESTES: v0.9.0 (https://github.com/LucelhoSilva/WppChatBot/releases/tag/v0.9.0)
        VERSÃO ATUAL: v0.9.0 (https://github.com/LucelhoSilva/WppChatBot/releases/tag/v0.9.0)
        DATA DE HOJE: 22-02-2025
        ASS: JOÃO PEDRO DE BRITO MONTEIRO - DESENVOLVEDOR CONTRIBUINTE DO PROJETO
        =========================================
    */

    static async execute(userInput, state) {
        if (userInput && userInput.toLowerCase() === 'q') {
            state.currentMenu = 'main';
            return "⬅ Voltando ao menu principal...";
        }

        if (userInput && state.currentMenu === 'suporte') {
            switch(userInput) {
                case '1':
                    return "📞 Atendimento ao Cliente:\n Ligue para *(11) 99999-9999* e receba seu atendimento com qualidade.";
                case '2':
                    return "💰 Orçamento de Planos: \n Apenas pelo site: *www.example.com/criar_plano*";
                case '3':
                    return "⏰ Horário de Atendimento:\n Segunda a Sexta-feira, das 9h às 18h.";
                case '4':
                    return "Volte ao menu principal e acesse \"Links para seu cliente\" para ter acesso a todos os links.";
                case '5':
                    return "Acesse *www.example.com* para suporte completo e pesonalizado.";
                case '6':
                    this.resetState(state);
                    return "⬅ Voltando ao menu principal...";
                default:
                    return "⚠️ Opção inválida. Por favor, escolha uma opção válida:\n\n" + this.getMenu();
            }
        }
        
    }

    static resetState(state) {
        Object.assign(state, {
            currentMenu: 'main',
            hasShownWelcome: true,
            selectedCity: null,
            previousInput: null
        });
    }

    static getMenu() {
        return this.formatMenu({
            title: "🎧 Menu de Suporte",
            options: {
                1: "📞 Atendimento ao Cliente",
                2: "💰 Orçamento de Planos",
                3: "⏰ Horário de Atendimento",
                4: "🔗 Links para o Cliente",
                5: "🌐 Nosso Site (Suporte completo e personalizado)",
                6: "🔙 Voltar ao Menu Principal"
            }
        });
    }

    static formatMenu(menuData) {
        let response = `${menuData.title}\n\n`;
        Object.entries(menuData.options).forEach(([key, value]) => {
            response += `*${key}* - ${value}\n`;
        });
        return response;
    }
}
module.exports = MenuSuporte;