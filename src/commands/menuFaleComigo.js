class MenuFaleComigo {
    static async execute(userInput, state) {
        if (userInput.toLowerCase() === 'q') {
            this.resetState(state);
            return "⬅ Voltando ao menu principal...";
        }

        if (state.previousInput && userInput) {
            switch (state.previousInput) {
                case 'email':
                    this.resetState(state);
                    return `✉️ **E-mail enviado com sucesso!**\n*Obrigado por entrar em contato conosco. Em breve, um de nossos atendentes entrará em contato com você.*\n\n⬅ Voltando ao menu principal...`;
                case 'telefone':
                    this.resetState(state);
                    return `📞 **Ligação agendada com sucesso!**\n*Obrigado por entrar em contato conosco. Em breve, um de nossos atendentes entrará em contato com você.*\n\n⬅ Voltando ao menu principal...`;
                case 'sac':
                    this.resetState(state);
                    return `📞 **Ligação agendada com sucesso!**\n*Obrigado por entrar em contato conosco. Em breve, um de nossos atendentes entrará em contato com você.*\n\n⬅ Voltando ao menu principal...`;
                default:
                    return "⚠️ Opção inválida. Por favor, escolha uma opção válida.";
            }
        }

        if (state.currentMenu === 'falecomigo') {
            switch (userInput) {
                case '1':
                    state.previousInput = 'email'; // Salva o contexto
                    return "💌 **Envie uma mensagem:**\n\n*Digite o seu nome e o seu e-mail para que possamos entrar em contato com você.*";
                case '2':
                    state.previousInput = 'telefone'; // Salva o contexto
                    return "📞 **Ligue para nós:**\n\n*Digite o seu nome e o seu telefone para que possamos entrar em contato com você.*";
                case '3':
                    state.previousInput = 'sac'; // Salva o contexto
                    return "☎️ **SAC:**\n\n*Digite o seu nome e o seu telefone para que possamos entrar em contato com você.*";
                case '4':
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
            hasShownWelcome: true, // Mantém como true para evitar dupla mensage
            selectedCity: null,
            previousInput: null
        });
    }

    static getMenu() {
        return this.formatMenu({
            title: "💬 **Fale comigo:**",
            options: {
                1: "💌 Envie uma mensagem",
                2: "📞 Ligue para nós",
                3: "☎️ SAC",
                4: "🔙 Voltar"
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
module.exports = MenuFaleComigo;