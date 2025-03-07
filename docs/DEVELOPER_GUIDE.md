# Guia de Desenvolvimento do Íris Bot

Este guia fornece instruções para desenvolvedores que desejam estender ou modificar o Íris Bot, incluindo a adição de novos comandos, a modificação de fluxos existentes e as práticas recomendadas para desenvolvimento.

## Índice

- [Arquitetura do Sistema](#arquitetura-do-sistema)
- [Adicionando Novos Comandos](#adicionando-novos-comandos)
- [Modificando Fluxos Existentes](#modificando-fluxos-existentes)
- [Gerenciamento de Estado](#gerenciamento-de-estado)
- [Testes e Depuração](#testes-e-depuração)
- [Padrões de Código](#padrões-de-código)
- [Contribuindo](#contribuindo)

## Arquitetura do Sistema

O Íris Bot segue uma arquitetura modular com os seguintes componentes principais:

1. **Core**: Gerenciamento de conexão e mensagens
2. **Comandos**: Módulos que implementam funcionalidades específicas
3. **Estado**: Sistema para manter o contexto da conversa por usuário

Cada comando segue um padrão comum que permite fácil integração com o sistema principal.

## Adicionando Novos Comandos

### Criando um Novo Submenu

Para adicionar um novo submenu (por exemplo, `menuNovidades`):

#### Passo 1: Criar o arquivo do submenu

Crie um arquivo `menuNovidades.js` na pasta `src/commands/`:

```javascript
class MenuNovidades {
    static async execute(userInput, state) {
        // Verifica se o usuário quer sair
        if (userInput.toLowerCase() === 'q') {
            return this.resetAndReturnToMain(state);
        }

        if (state.currentMenu === 'novidades') {
            switch (userInput) {
                case '1':
                    return "🆕 Novidade 1: Descrição da novidade...";
                case '2':
                    return "🔥 Novidade 2: Descrição da novidade...";
                case '3':
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
            title: "🔔 Novidades Recentes",
            options: {
                1: "Ver novidade 1",
                2: "Ver novidade 2",
                3: "Voltar ao menu principal"
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

module.exports = MenuNovidades;
```

#### Passo 2: Registrar o novo submenu

Edite o arquivo `menu.js` para incluir o novo submenu no objeto `MENU_MODULES`:

```javascript
const MENU_MODULES = {
    // ... módulos existentes
    14: { path: './menuNovidades', name: 'novidades' }, //NOVO
};
```

#### Passo 3: Adicionar ao menu principal

Edite o método `getMainMenu()` em `menu.js` para adicionar a nova opção:

```javascript
static getMainMenu() {
    return this.formatMenu({
        title: "Como posso te ajudar? Verifique as opções abaixo!",
        options: {
            // ... opções existentes
            14: "Veja nossas novidades 🆕",
        }
    });
}
```

### Criando uma Nova Funcionalidade Complexa

Para funcionalidades mais complexas que requerem múltiplos estados ou integrações externas:

1. **Defina os estados necessários**:
   ```javascript
   // Em seu novo módulo
   if (!state.novidadesContext) {
       state.novidadesContext = {
           step: 'initial',
           selectedOption: null,
           userData: {}
       };
   }
   ```

2. **Implemente o fluxo em etapas**:
   ```javascript
   switch (state.novidadesContext.step) {
       case 'initial':
           // Primeira etapa
           break;
       case 'details':
           // Segunda etapa
           break;
       // ...
   }
   ```

3. **Adicione validações de entrada**:
   ```javascript
   // Validação de entrada
   if (!/^\d+$/.test(userInput)) {
       return "⚠️ Por favor, digite apenas números.";
   }
   ```

## Modificando Fluxos Existentes

### Alterando um Submenu Existente

Para modificar um submenu existente:

1. Localize o arquivo do submenu em `src/commands/`
2. Faça as alterações necessárias seguindo o padrão existente
3. Teste as mudanças para garantir que não quebraram outros fluxos

### Exemplo: Adicionando uma Opção a um Submenu

Para adicionar uma nova opção ao submenu de suporte:

```javascript
// Em menuSuporte.js
static async execute(userInput, state) {
    if (userInput && userInput.toLowerCase() === 'q') {
        return this.resetAndReturnToMain(state);
    }

    if (userInput && state.currentMenu === 'suporte') {
        switch(userInput) {
            // ... casos existentes
            case '6': // Nova opção
                return "📊 Estatísticas de Atendimento: Nosso tempo médio de resposta é de 15 minutos.";
            // ...
        }
    }
}

static getMenu() {
    return this.formatMenu({
        title: "🎧 Menu de Suporte",
        options: {
            // ... opções existentes
            '6': "📊 Estatísticas de Atendimento",
            // ...
        }
    });
}
```

## Gerenciamento de Estado

O estado do usuário é crucial para manter o contexto da conversa. Aqui estão as práticas recomendadas:

### Estrutura de Estado

```javascript
{
    // Estado básico
    currentMenu: 'main',      // Menu atual
    hasShownWelcome: true,    // Flag para mensagem de boas-vindas
    
    // Estados específicos de contexto
    selectedCity: null,       // Cidade selecionada
    previousInput: null,      // Entrada anterior
    
    // Estados específicos de módulo (adicione conforme necessário)
    tokenContext: {
        // Dados específicos do módulo de token
    }
}
```

### Boas Práticas para Gerenciamento de Estado

1. **Inicialização de Estado**:
   ```javascript
   // Verifique se o contexto existe antes de usar
   if (!state.yourModuleContext) {
       state.yourModuleContext = { /* estado inicial */ };
   }
   ```

2. **Limpeza de Estado**:
   ```javascript
   // Limpe estados específicos ao sair do módulo
   delete state.yourModuleContext;
   ```

3. **Transição de Estado**:
   ```javascript
   // Para transição entre módulos
   state.currentMenu = 'newMenu';
   state.previousInput = null; // Limpe contextos específicos
   ```

## Testes e Depuração

### Depuração Local

1. **Logs de Depuração**:
   ```javascript
   console.log('Estado atual:', state);
   console.log('Entrada do usuário:', userInput);
   ```

2. **Ativar Logs Detalhados**:
   Edite `connection.js` para habilitar logs detalhados:
   ```javascript
   const sock = makeWASocket({
       printQRInTerminal: true,
       auth: state,
       logger: P({ level: 'debug' }), // Altere de 'silent' para 'debug'
   });
   ```

### Testes de Fluxo

Crie um roteiro de teste para cada novo módulo ou funcionalidade:

1. Navegue até o menu do módulo
2. Teste cada opção disponível
3. Verifique comportamento com entradas inválidas
4. Teste o retorno ao menu principal
5. Verifique a persistência do estado conforme esperado

## Padrões de Código

Para manter a consistência e facilitar a manutenção:

### Nomenclatura

- **Arquivos**: Use `camelCase` para nomes de arquivos (ex: `menuSuporte.js`)
- **Classes**: Use `PascalCase` para nomes de classes (ex: `MenuSuporte`)
- **Métodos**: Use `camelCase` para métodos (ex: `getMenu()`)
- **Constantes**: Use `UPPER_SNAKE_CASE` para constantes (ex: `MENU_MODULES`)

### Formatação

- Use 4 espaços para indentação
- Use ponto e vírgula no final das declarações
- Coloque espaços ao redor de operadores

### Comentários

- Adicione comentários para explicar a lógica complexa
- Use comentários de bloco (`/* */`) para documentar métodos
- Use comentários de linha (`//`) para explicações pontuais

```javascript
/**
 * Processa a entrada do usuário no submenu de novidades.
 * @param {string} userInput - Entrada do usuário
 * @param {object} state - Estado atual do usuário
 * @returns {string|null} Resposta para o usuário ou null para voltar
 */
static async execute(userInput, state) {
    // Verificação de saída
    if (userInput.toLowerCase() === 'q') {
        return this.resetAndReturnToMain(state);
    }
    
    // Lógica principal...
}
```

## Contribuindo

### Fluxo de Trabalho Git

1. **Crie uma Branch**: 
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```

2. **Faça Commits Atômicos**:
   ```bash
   git commit -m "Adiciona menu de novidades"
   ```

3. **Teste suas Alterações**:
   Certifique-se de que todas as funcionalidades estão operando corretamente

4. **Solicite um Pull Request**:
   Descreva detalhadamente as alterações feitas e o propósito

### Revisão de Código

Antes de enviar seu código para revisão:

- Verifique se segue os padrões de código estabelecidos
- Verifique se não há erros ou warnings
- Teste todos os fluxos afetados pelas mudanças
- Documente novas funcionalidades ou alterações significativas

### Comunicação

Mantenha a equipe informada sobre:

- Mudanças que afetam múltiplos módulos
- Adição de novas dependências
- Alterações em interfaces públicas
- Problemas encontrados durante o desenvolvimento