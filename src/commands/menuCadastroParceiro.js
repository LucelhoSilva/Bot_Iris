class MenuParceiro {
    static async execute(userInput, state) {
        const lowerCaseUserInput = userInput.toLowerCase();

        if (lowerCaseUserInput === 'q') {
            return this.resetAndReturnToMain(state);
        }

        if (state.currentMenu === 'parceiro') {
            switch (lowerCaseUserInput) {
                case 's':
                    return "💼 **Cadastro de Parceiro:**\n Acesse: *www.example.com/partner/new_partner* e faça seu cadastro!";
                case 'n':
                    return this.resetState(state);
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

    static getMenu() {
        return "Deseja cadastrar um parceiro? [s/n]: ";
    }
}
module.exports = MenuParceiro;