class MenuTreinamento {
    static async execute(userInput, state) {
        if (userInput.toLowerCase() === 'q') {
            return this.resetAndReturnToMain(state);
        }

        const trainingInfos = [
            {
                title: "Treinamento 1",
                description: "Descrição do Treinamento 1",
                link: "https://www.example.com/treinamento1"
            },
            {
                title: "Treinamento 2",
                description: "Descrição do Treinamento 2",
                link: "https://www.example.com/treinamento2"
            },
            {
                title: "Treinamento 3",
                description: "Descrição do Treinamento 3",
                link: "https://www.example.com/treinamento3"
            }
        ];

        // Se não houver input, exibe o menu
        if (!userInput) {
            return this.getMenu();
        }

        const option = parseInt(userInput);

        if (!isNaN(option) && option >= 1 && option <= trainingInfos.length) {
            const training = trainingInfos[option - 1];
            return `📘 Você selecionou *${training.title}*\n\n${this.formatTrainingInfo(training)}\n\nDigite *Q* para voltar ao menu principal.`;
        } else {
            return `⚠️ Opção inválida. Por favor, selecione uma opção entre 1 e 4.\n\n${this.getMenu()}`;
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
            title: "📚 *Menu de Treinamentos*",
            options: {
                '1': "Treinamento 1",
                '2': "Treinamento 2",
                '3': "Treinamento 3",
                'Q': "Voltar ao menu principal ⬅"
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

    static formatTrainingInfo(training) {
        return `📝 *Descrição:* ${training.description}\n🔗 *Acesse aqui:* ${training.link}\n\n'`;
    }
}

module.exports = MenuTreinamento;
