class MenuCalcularCotacao {
    static async execute(userInput, state) {
        const lowerCaseUserInput = userInput.toLowerCase();

        if (lowerCaseUserInput === 'q') {
            this.resetState(state);
            return "⬅ Voltando ao menu principal...";
        }

        // Se estiver no submenu de cotações
        if (state.currentMenu === 'cotacao' && state.previousInput === null) {
            switch (lowerCaseUserInput) {
                case '1':
                    return this.calcularCotacaoSaude(state);
                case '2':
                    return this.calcularCotacaoOdontologico(state);
                case '3':
                    return this.consultarHistorico(state);
                default:
                    return "⚠️ Opção inválida. Por favor, escolha uma opção válida:\n\n" + this.getMenu();
            }
        }

        // Se estiver no submenu de cotações e já tiver selecionado uma opção
        if (state.currentMenu === 'cotacao' && state.previousInput !== null) {
            switch (state.previousInput) {
                case 'saude':
                    return "Estamos implementando  essa funcionalidade. Por favor, volte mais tarde.\n\n *Digite Q para voltar ao menu principal.*";
                case 'odontologico':
                    return "Estamos implementando  essa funcionalidade. Por favor, volte mais tarde.\n\n *Digite Q para voltar ao menu principal.*";
                case 'historico':
                    return "Estamos implementando  essa funcionalidade. Por favor, volte mais tarde.\n\n *Digite Q para voltar ao menu principal.*";
                default:
                    return "⚠️ Opção inválida. Por favor, escolha uma opção válida:\n\n" + this.getMenu();
            }
        }
    }

    static resetState(state) {
        Object.assign(state, {
            currentMenu: 'main',
            hasShownWelcome: true, // Mantém como true para evitar dupla mensagem
            selectedCity: null,
            previousInput: null
        });
    }

    static calcularCotacaoSaude(state) {
        // Lógica para calcular cotação de saúde
        state.previousInput = 'saude'; // Salva o contexto
        return this.formatMenu({
            title: "💊 **Cotação de Plano de Saúde:**\nPor favor informe:",
            options: {
                1: "Número de beneficiários",
                2: "Faixa etária de cada beneficiário",
                3: "Tipo de plano (enfermaria, apartamento, VIP)",
                4: "Região de atendimento",
                "Q": "Voltar ao menu principal"
            },
        }) + "\n\n***Exemplo: 2 beneficiários, 30 e 35 anos, apartamento, São Paulo.***";
    }

    static calcularCotacaoOdontologico(state) {
        // Lógica para calcular cotação de plano odontológico
        state.previousInput = 'odontologico'; // Salva o contexto
        return this.formatMenu({
            title: "🦷 **Cotação de Plano Odontológico:**\nPor favor informe:",
            options: {
                1: "Número de beneficiários",
                2: "Tipo de cobertura (básico, médio, completo)",
                3: "Rede de atendimento preferida",
                "Q": "Voltar ao menu principal"
            }
        }) + "\n\n***Exemplo de resposta: 2 beneficiários, completo, OdontoCompany.***";
    }

    static consultarHistorico(state) {
        // Lógica para consultar histórico de cotações
        //code...
        state.previousInput = 'historico'; // Salva o contexto  
        return this.formatMenu({
            title: "📋 **Histórico de Cotações**\nAqui estão suas cotações anteriores:",
            options: {
                1: "Plano de Saúde - R$ 500,00/mês",
                2: "Plano Odontológico - R$ 150,00/mês",
                "Q": "Voltar ao menu principal"
            }
        }) + "\n\n*Deseja solicitar uma nova cotação? [s/n]*";
    }

    static getMenu() {
        return this.formatMenu({
            title: "📈 **Menu de Cotações:**",
            options: {
                '1': "Calcular cotação de plano de saúde 💼",
                '2': "Calcular cotação de plano odontológico 🦷",
                '3': "Consultar histórico de cotações 📋",
                "Q": "Voltar ao menu principal"
            }
        }) + "\n\nDigite 'q' a qualquer momento para voltar ao menu principal.";
    }
    static formatMenu(menuData) {
        let response = `${menuData.title}\n\n`;
        Object.entries(menuData.options).forEach(([key, value]) => {
            response += `${key} - ${value}\n`;
        });
        return response;
    }
    
}

module.exports = MenuCalcularCotacao;