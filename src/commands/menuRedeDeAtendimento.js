class MenuRedeDeAtendimento {
    static execute(userInput, state) {
        // Se o usuário digitar "Q" em qualquer submenu, retorna ao menu principal
        if (userInput.toLowerCase() === 'q') {
            return this.resetAndReturnToMain(state);
        }

        // Lida com a seleção de uma cidade pelo usuário no menu "rede". Atualiza o estado com a cidade selecionada e retorna as informações da rede para a cidade selecionada.
        if (state.currentMenu === "rede") {
            switch (userInput) {
                case '1':
                    state.selectedCity = 'São Paulo - SP';
                    return "📌 Você selecionou São Paulo - SP. \n Sobre a Unidade:" + this.networkInfos();
                case '2':
                    state.selectedCity = 'Rio de Janeiro - RJ';
                    return "📌 Você selecionou Rio de Janeiro - RJ. \n Sobre a Unidade:" + this.networkInfos();
                case '3':
                    state.selectedCity = 'Brasília - DF';
                    return "📌 Você selecionou Brasília - DF. \n Sobre a Unidade:" + this.networkInfos();
                case '4':
                    state.selectedCity = 'Fortaleza - CE';
                    return "📌 Você selecionou Fortaleza - CE. \n Sobre a Unidade:" + this.networkInfos();
                case '5':
                    state.selectedCity = 'Belo Horizonte - MG';
                    return "📌 Você selecionou Belo Horizonte - MG. \n Sobre a Unidade:" + this.networkInfos();
                case '6':
                    state.selectedCity = 'Cascavel - PR';
                    return "📌 Você selecionou Cascavel - PR. \n Sobre a Unidade:" + this.networkInfos();
                case '7':
                    state.selectedCity = 'Porto Alegre - RS';
                    return "📌 Você selecionou Porto Alegre - RS. \n Sobre a Unidade:" + this.networkInfos();
                case '8':
                    state.selectedCity = 'Salvador - BA';
                    return "📌 Você selecionou Salvador - BA. \n Sobre a Unidade:" + this.networkInfos();
                case '9':
                    state.selectedCity = 'Recife - PE';
                    return "📌 Você selecionou Recife - PE. \n Sobre a Unidade:" + this.networkInfos();
                case '10':
                    state.selectedCity = 'Manaus - AM';
                    return "📌 Você selecionou Manaus - AM. \n Sobre a Unidade:" + this.networkInfos();
                case '11':
                    return this.resetAndReturnToMain(state);
                default:
                    return "⚠️ Opção inválida. Por favor, escolha uma opção válida:\n\n" + this.getMenu();
            }
        }
    }

    static networkInfos() {
        state.currentMenu = null;
        return this.formatMenu({
            title: ".",
            options: {
            '*': "Endereço: Rua Qualquer Brasileira - N° 123 - [UF]",
            '*': "Horário de funcionamento: Seg-Sex das 00:00 às 23:59",
            '*': "Contato: (00)123456789",
            '*': "Serviços disponíveis: Serviço X, Y e Z",
            'Q': "Voltar ao Menu Principal ↩️"
            }
        });
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
            title: "Temos unidades nas seguintes cidades. Selecione sua cidade (ou a mais próxima de você). ",
            options: {
            1: "São Paulo - SP",
            2: "Rio de Janeiro - RJ",
            3: "Brasília - DF",
            4: "Fortaleza - CE",
            5: "Belo Horizonte - MG",
            6: "Cascavel - PR",
            7: "Porto Alegre - RS",
            8: "Salvador - BA",
            9: "Recife - PE",
            10: "Manaus - AM",
            11: "Voltar ao menu principal"
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

module.exports = MenuRedeDeAtendimento;