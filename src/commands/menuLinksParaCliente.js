class MenuLinksParaCliente {
    static execute(userInput, state) {
        // Verifica se o usuário deseja voltar ao menu principal
        if (userInput.toLowerCase() === 'q') {
            return this.resetAndReturnToMain(state);
        }

        // Verifica se o usuário já está neste menu e enviou 's' (para mostrar o menu novamente)
        if (state.currentMenu === 'links' &&  userInput.toLowerCase() === 's') {
            return this.getMenu();
        }else if (state.currentMenu === 'links' && userInput.toLowerCase() === 'n') {
            return ("OK. Obrigado por usar o nosso serviço. Até a próxima!", this.resetAndReturnToMain(state))
        }

        // Verifica se o usuário escolheu alguma opção do menu de links
        if (state.currentMenu === "links") {
            switch (userInput) {
                case '1':
                    return "Link para o site: https://www.example.com.br/\n\n Deseja ver o menu de links novamente ? [s/n]";
                case '2':
                    return "Link para pagamento de fatura: https://www.example.com.br/pagamento-de-fatura\n\n Deseja ver o menu de links novamente ? [s/n]";
                case '3':
                    return "Link nossas redes sociais: https://www.linktr.ee/example\n\n Deseja ver o menu de links novamente ? [s/n]";
                case '4':
                    return "Link para o e-mail: https://www.example.com.br/contato/emails\n\n Deseja ver o menu de links novamente ? [s/n]";
                case '5':
                    return this.resetAndReturnToMain(state);
                default:
                    return "⚠️ Opção inválida. Por favor, escolha uma opção válida:\n\n" + this.getMenu();

            }
        }
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
            title: "Selecione uma opção:",
            options: {
                1: "Link para o site",
                2: "Link para pagamento de fatura",
                3: "Link nossas redes sociais",
                4: "Link para o e-mail",
                5: "Voltar ao menu principal"
            }
        })
    }

    static formatMenu(menuData) {
        let response = `${menuData.title}\n\n`;
        Object.entries(menuData.options).forEach(([key, value]) => {
            response += `${key} - ${value}\n`;
        });
        return response;
    }

}

module.exports = MenuLinksParaCliente;