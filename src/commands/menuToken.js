class MenuToken {
  static async execute(userInput, state) {
      switch (state.currentMenu) {
          case 'token':
              return this.handleTokenMenu(userInput, state);
          case 'tokenConfirmation':
              return this.handleTokenConfirmation(userInput, state);
          case 'waitingBudgetCode':
              return this.handleBudgetCode(userInput, state);
          default:
              return this.getMenu();
      }
  }

  static handleTokenMenu(userInput, state) {
      const option = parseInt(userInput);

      if (option === 13) {
          return this.resetAndReturnToMain(state);
      }

      if (option >= 1 && option <= 12) {
          const cities = {
              1: "Anápolis",
              2: "Recife",
              3: "Uberlândia",
              4: "Belém",
              5: "Fortaleza",
              6: "Feira de Santana",
              7: "João Pessoa",
              8: "Salvador",
              9: "Goiânia",
              10: "Juazeiro",
              11: "Brasília",
              12: "Belo Horizonte"
          };
          
          state.selectedCity = cities[option];
          state.currentMenu = 'tokenConfirmation';
          return this.getTokenConfirmationMenu();
      }

      return "⚠️ Opção inválida. Por favor, escolha uma opção válida:\n\n" + this.getMenu();
  }

  static handleTokenConfirmation(userInput, state) {
      const option = parseInt(userInput);

      switch (option) {
          case 1:
              return `Processando novo token para ${state.selectedCity}...`;
          case 2:
              state.currentMenu = 'waitingBudgetCode';
              return "💸 Digite o código do orçamento (Caso não tenha código com a SL91 digite 0) (Q para sair):";
          case 3:
              state.currentMenu = 'token';
              return this.getMenu();
          case 4:
              return this.resetAndReturnToMain(state);
          default:
              return "⚠️ Opção inválida. Por favor, escolha uma opção válida:\n\n" + this.getTokenConfirmationMenu();
      }
  }

  static handleBudgetCode(userInput, state) {
      if (userInput.toLowerCase() === 'q') {
          return this.resetAndReturnToMain(state);
      }

      const code = parseInt(userInput);
      if (isNaN(code) && userInput !== '0') {
          return "⚠️ Por favor, digite um código válido ou 'Q' para sair:";
      }

      return `Processando reenvio de token para código ${userInput}...`;
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
          title: "Qual a praça que deseja gerar seu token?",
          options: {
              1: "Anápolis",
              2: "Recife",
              3: "Uberlândia",
              4: "Belém",
              5: "Fortaleza",
              6: "Feira de Santana",
              7: "João Pessoa",
              8: "Salvador",
              9: "Goiânia",
              10: "Juazeiro",
              11: "Brasília",
              12: "Belo Horizonte",
              13: "Voltar ao menu principal"
          }
      });
  }

  static getTokenConfirmationMenu() {
      return this.formatMenu({
          title: "Você já tem um código do orçamento ou token ativo?",
          options: {
              1: "Desejo criar um novo Token",
              2: "Desejo reenviar token (Se você já gerou o Token mas o cliente não respondeu, e deseja reenviá-lo)",
              3: "Voltar ao menu anterior",
              4: "Voltar ao menu principal"
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

module.exports = MenuToken;