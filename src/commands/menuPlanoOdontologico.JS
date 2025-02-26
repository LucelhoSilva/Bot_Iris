class MenuPlanoOdontologico {
    // Função principal que executa a lógica com base na entrada do usuário
    static async execute(userInput, state) {
        // Se o usuário digitar "Q" em qualquer submenu, retorna ao menu principal
        if (userInput.toLowerCase() === 'q') {
            return this.resetAndReturnToMain(state);
        }

        // Lógica de navegação para diferentes submenus com base no estado atual
        switch (state.currentMenu) {
            case 'odontologico':
                return this.handleConsultaMenu(userInput, state);
            case 'realizar':
                return this.handleRealizarPlano(userInput, state);
            case 'pagar':
                return this.handlePagarPlano(userInput, state);
            default:
                return this.getMenu();
        }
    }

    // Lida com a seleção do menu de consulta do plano odontológico
    static handleConsultaMenu(userInput, state) {
        const option = toLowerCase(userInput); // Converte a entrada para minúsculas

        switch (option) {
            case '1':
                state.currentMenu = 'consultar'; // Muda para o submenu de consulta
                return "Certo, me diga o CPF cadastrado no Plano Odontológico [sem traços, pontos ou espaço]:";
            case '2':
                state.currentMenu = 'realizar'; // Muda para o submenu de realizar cadastro
                return "Entendi, vamos te cadastrar no Plano Odontológico!";
            case '3':
                state.currentMenu = 'pagar'; // Muda para o submenu de pagamento
                return "Ok, vou gerar seu código de pagamento! Só um segundo...";
            case 'q':
                return this.resetAndReturnToMain(state); // Volta ao menu principal
            default:
                return "⚠️ Opção inválida. Por favor, escolha uma opção válida:\n\n" + this.getMenu();
        }
    }

    // Função de cadastro no plano odontológico (a ser implementada conforme necessidade)
    static handleRealizarPlano(userInput, state) {
        // Lógica de cadastro no plano odontológico (exemplo)
        return "Você foi cadastrado no plano odontológico com sucesso!";
    }

    // Função de pagamento do plano odontológico (a ser implementada conforme necessidade)
    static handlePagarPlano(userInput, state) {
        // Lógica de pagamento (exemplo)
        return "Seu código de pagamento foi gerado com sucesso!";
    }

    // Reseta o estado e retorna ao menu principal
    static resetAndReturnToMain(state) {
        // Reseta o estado do menu, retornando ao menu principal
        Object.assign(state, {
            currentMenu: 'main',
            hasShownWelcome: false,
            selectedCity: null,
        });

        // Mensagem para indicar que o usuário foi redirecionado ao menu principal
        return "Você foi redirecionado ao menu principal. " + this.getMenu();
    }

    // Gera o menu principal com as opções disponíveis
    static getMenu() {
        return this.formatMenu({
            title: "Selecione o que deseja (ou digite Q para sair):",
            options: {
                1: "Consultar Plano Odontológico",
                2: "Realizar Plano Odontológico",
                3: "Pagar Plano Odontológico",
                'Q': "Digite Q para voltar ao menu principal"
            }
        });
    }

    // Formata o menu com título e opções numeradas
    static formatMenu(menuData) {
        let response = `${menuData.title}\n\n`; // Inicia a resposta com o título
        Object.entries(menuData.options).forEach(([key, value]) => {
            // Adiciona cada opção ao menu formatado
            response += `${key} - ${value}\n`;
        });
        return response; // Retorna o menu completo
    }
}

module.exports = MenuPlanoOdontologico;
