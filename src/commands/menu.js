const menuOptions = {
  main: {
      title: "Como posso te ajudar? Escolha uma opção:",
      options: {

        1: "Quero gerar um token ✅",
        2: "Consultar Beneficiário 👤",
        3: "Consultar Orçamento 💸",
        4: "Consultar CNPJ",
        5: "Plano odontológico 🦷",
        6: "Tabelas 📉",
        7: "Rede de atendimento 🏥",
        8: "Links para seu cliente",
        9: "Treinamento 💻",
        10: "Suporte 🧑‍🔧",
        11: "Cadastre-se para ser um parceiro da SL-91 💜",
        12: "Calcular cotação 📈",
        13: "Fale comigo 💜",
        14: "Sair",
      }
  },
  1: {
      title: "Gerar token - Escolha o tipo:",
      options: {
          1: "Token de acesso",
          2: "Token temporário",
          3: "Token de administrador",
          4: "Voltar ao menu principal"
      }
  },
  2: {
      title: "Consultar Beneficiário - Escolha o tipo:",
      options: {
          1: "Por CPF",
          2: "Por Cartão Nacional de Saúde",
          3: "Por Cartão do Beneficiário",
      }
  },
};

class MenuCommand {
  static async execute(userInput) {
      const option = parseInt(userInput);
      
      if (!isNaN(option) && menuOptions.main.options[option]) {
          if (menuOptions[option]) {
              let response = `${menuOptions[option].title}\n\n`;
              Object.entries(menuOptions[option].options).forEach(([key, value]) => {
                  response += `${key} - ${value}\n`;
              });
              return response;
          } else {
              return `Você selecionou: ${menuOptions.main.options[option]}\n\nPor favor, aguarde enquanto processo sua solicitação.`;
          }
      }

      return this.getMainMenu();
  }

  static getMainMenu() {
      let response = `${menuOptions.main.title}\n\n`;
      Object.entries(menuOptions.main.options).forEach(([key, value]) => {
          response += `${key} - ${value}\n`;
      });
      return response;
  }
}

module.exports = MenuCommand;