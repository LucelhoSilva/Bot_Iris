// menu.js
const MENU_MODULES = {
    1: { path: './menuToken', name: 'token' },                          //FEITO
    2: { path: './menuConsultarBeneficiario', name: 'beneficiario' },   //FEITO
    3: { path: './menuConsultarOrcamento', name: 'orcamento' },         //FEITO
    4: { path: './menuConsultarCNPJ', name: 'cnpj' },                   //FEITO
    5: { path: './menuPlanoOdontologico', name: 'odontologico' },       //FEITO
    6: { path: './menuTabelas', name: 'tabelas' },
    7: { path: './menuRedeDeAtendimento', name: 'rede' },               //FEITO
    8: { path: './menuLinksParaCliente', name: 'links' },               //FEITO
    9: { path: './menuTreinamento', name: 'treinamento' },              //FEITO
    10: { path: './menuSuporte', name: 'suporte' },                     //FEITO
    11: { path: './menuCadastroParceiro', name: 'parceiro' },           //FEITO
    12: { path: './menuCalcularCotacao', name: 'cotacao' },             //FEITO
    13: { path: './menuFaleComigo', name: 'faleComigo' }                //FEITO
};

class Menu {
    static async execute(userInput, state) {
        //Bloqueia o bot para não responder para grupos
        if (userInput.from && userInput.from.endsWith('@g.us')) {
            return;
        }
        if (state.from && state.from.endsWith('@g.us')) {
            return;
        }
        
        // Se for a primeira interação ou estado resetado, mostra mensagem de boas-vindas
        if (!state.hasShownWelcome) {
            state.hasShownWelcome = true;
            return "Oi, sou a Íris, assistente virtual da Corretora PlansCoop 🤖💜\n\n" + this.getMainMenu();
        }

        // Se estiver em algum submenu e digitar Q
        if (state.currentMenu !== 'main' && userInput.toLowerCase() === 'q') {
            this.resetState(state);
            return "Oi, sou a Íris, assistente virtual da Corretora PlansCoop 🤖💜\n\n" + this.getMainMenu();
        }

        // Se estiver em algum submenu
        if (state.currentMenu !== 'main') {
            try {
                const currentModule = Object.values(MENU_MODULES).find(m => 
                    state.currentMenu.startsWith(m.name)
                );

                if (currentModule) {
                    const menuModule = require(currentModule.path);
                    const response = await menuModule.execute(userInput, state);
                    
                    // Se o módulo retornar null, significa que devemos mostrar a mensagem de boas-vindas
                    if (response === null) {
                        this.resetState(state);
                        return "Oi, sou a Íris, assistente virtual da Corretora PlansCoop 🤖💜\n\n" + this.getMainMenu();
                    }
                    return response;
                }
            } catch (error) {
                console.error('Erro ao executar módulo:', error);
                return "⚠️ Desculpe, ocorreu um erro ao processar sua solicitação.";
            }
        }

        return this.handleMainMenu(userInput, state);
    }

    static resetState(state) {
        Object.assign(state, {
            currentMenu: 'main',
            hasShownWelcome: true, // Mantém como true para evitar dupla mensagem
            selectedCity: null,
            previousInput: null
        });
    }

    static handleMainMenu(userInput, state) {
        const option = parseInt(userInput);

        if (isNaN(option) || option < 1 || option > 14) {
            return "⚠️ Opção inválida. Por favor, escolha uma opção válida:\n\n" + this.getMainMenu();
        }

        if (option === 14) {
            this.resetState(state);
            state.hasShownWelcome = false; // Força mostrar boas-vindas na próxima interação
            return "👋 Obrigado por usar nossos serviços. Até logo!";
        }

        const menuModule = MENU_MODULES[option];
        if (menuModule) {
            try {
                const module = require(menuModule.path);
                state.currentMenu = menuModule.name;
                return module.getMenu();
            } catch (error) {
                console.error('Erro ao carregar módulo:', error);
                return "⚠️ Desculpe, esta opção está temporariamente indisponível.";
            }
        }

        return "Esta funcionalidade será implementada em breve.";
    }

    static getMainMenu() {
        return this.formatMenu({
            title: "Como posso te ajudar? Verifique as opções abaixo!",
            options: {
                1: "Quero gerar um token ✅",
                2: "Consultar Beneficiário 👤",
                3: "Consultar Orçamento 💸",
                4: "Consultar CNPJ",
                5: "Plano odontológico 🦷",
                6: "Tabelas 📉",
                7: "Rede de atendimento 🏥",
                8: "Links para seu cliente ✔",
                9: "Treinamento 💻",
                10: "Suporte 🧑‍🔧",
                11: "Cadastre-se para ser um parceiro da SL-91 💜",
                12: "Calcular cotação 📈",
                13: "Fale comigo 💜",
                14: "Sair"
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

module.exports = Menu;