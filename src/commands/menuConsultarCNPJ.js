class MenuConsultarCNPJ {
  static async execute(userInput, state) {
      switch (state.currentMenu) {
          case 'cnpj':
              return this.handleOrcamentoInput(userInput, state);
          default:
              return this.getMenu();
      }
  }

  static handleOrcamentoInput(userInput, state) {
      // Verifica se usuário quer sair
      if (userInput.toLowerCase() === 'q') {
          return this.resetAndReturnToMain(state);
      }

      // Remove espaços e caracteres especiais
      const codigo = userInput.replace(/[^\d]/g, '');

      // Valida se o código não está vazio
      if (!codigo) {
          return "⚠️ Por favor, digite um código válido ou 'Q' para sair:";
      }

      // Aqui você implementaria a lógica real de consulta do orçamento
      return `Consultando informações do orçamento: ${codigo}...`;
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
      return "Certo, me diga o CNPJ que deseja consultar (digite Q para sair):";
  }

  // Mantemos o formatMenu para consistência com outros módulos
  static formatMenu(menuData) {
      let response = `${menuData.title}\n\n`;
      Object.entries(menuData.options).forEach(([key, value]) => {
          response += `${key} - ${value}\n`;
      });
      return response;
  }
}

module.exports = MenuConsultarCNPJ;