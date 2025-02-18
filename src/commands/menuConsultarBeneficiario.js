class MenuConsultarBeneficiario {
    static async execute(userInput, state) {
        switch (state.currentMenu) {
            case 'beneficiario':
                return this.handleConsultaMenu(userInput, state);
            case 'consultaCPF':
                return this.handleConsultaCPF(userInput, state);
            case 'consultaNome':
                return this.handleConsultaNome(userInput, state);
            default:
                return this.getMenu();
        }
    }

    static handleConsultaMenu(userInput, state) {
        const option = parseInt(userInput);

        switch (option) {
            case 1:
                state.currentMenu = 'consultaCPF';
                return "Certo, me diga o CPF que deseja consultar [sem traços, pontos ou espaço] (digite Q para sair):";
            case 2:
                state.currentMenu = 'consultaNome';
                return "Entendi, me diga o nome que deseja consultar: (digite Q para sair):";
            case 3:
                return this.resetAndReturnToMain(state);
            default:
                return "⚠️ Opção inválida. Por favor, escolha uma opção válida:\n\n" + this.getMenu();
        }
    }

    static handleConsultaCPF(userInput, state) {
        // Verifica se usuário quer sair
        if (userInput.toLowerCase() === 'q') {
            return this.resetAndReturnToMain(state);
        }

        // Remove caracteres especiais do CPF
        const cpf = userInput.replace(/[^\d]/g, '');

        // Valida se o CPF tem 11 dígitos
        if (cpf.length !== 11) {
            return "⚠️ CPF inválido. Por favor, digite um CPF válido com 11 dígitos (apenas números) ou 'Q' para sair:";
        }

        // Formatação do CPF para exibição
        const cpfFormatado = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        
        // Aqui você implementaria a lógica real de consulta do CPF
        return `Consultando informações do CPF: ${cpfFormatado}...`;
    }

    static handleConsultaNome(userInput, state) {
        // Verifica se usuário quer sair
        if (userInput.toLowerCase() === 'q') {
            return this.resetAndReturnToMain(state);
        }

        // Valida o tamanho do nome
        if (userInput.length < 3) {
            return "⚠️ Nome muito curto. Por favor, digite um nome válido (mínimo 3 caracteres) ou 'Q' para sair:";
        }

        // Aqui você implementaria a lógica real de consulta do nome
        return `Consultando informações para o nome: ${userInput}...`;
    }

    static resetAndReturnToMain(state) {
        // Reseta o estado
        Object.assign(state, {
            currentMenu: 'main',
            hasShownWelcome: false,
            selectedCity: null
        });
        
        // Retorna null para indicar que deve mostrar mensagem de boas-vindas
        return null;
    }

    static getMenu() {
        return this.formatMenu({
            title: "Qual tipo de informação deseja consultar?",
            options: {
                1: "CPF",
                2: "Nome e data de nascimento",
                3: "Voltar ao menu principal"
            }
        });
    }

    static formatMenu(menuData) {
        let response = `${menuData.title}\n\n`;
        Object.entries(menuData.options).forEach(([key, value]) => {
            response += `${key} - ${value}\n`;
        });
        return response;
    }
}

module.exports = MenuConsultarBeneficiario;