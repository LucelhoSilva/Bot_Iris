# Documentação da API e Componentes do Íris Bot

Esta documentação fornece detalhes sobre a API e os componentes do Íris Bot, um chatbot WhatsApp para a Corretora PlansCoop.

## Índice

- [Estrutura de Diretórios](#estrutura-de-diretórios)
- [Módulo Core](#módulo-core)
  - [Connection](#connection)
  - [MessageHandler](#messagehandler)
- [Sistema de Comandos](#sistema-de-comandos)
  - [Interface de Comando](#interface-de-comando)
  - [Menu Principal](#menu-principal)
  - [Submenus](#submenus)
- [Utilitários](#utilitários)
- [Fluxos de Usuário](#fluxos-de-usuário)
- [Referência da API](#referência-da-api)

## Estrutura de Diretórios

```
src/
├── commands/           # Comandos e submenus
│   ├── index.js        # Registro de comandos
│   ├── menu.js         # Menu principal
│   └── menu*.js        # Submenus específicos
├── middlewares/        # Intermediários de processamento
│   └── messageHandler.js # Manipulador de mensagens
├── connection.js       # Gerenciamento de conexão WhatsApp
└── index.js            # Ponto de entrada
```

## Módulo Core

### Connection

**Arquivo**: `connection.js`

Responsável pela configuração e gerenciamento da conexão com a API do WhatsApp.

#### Métodos Principais

```javascript
// Inicializa a conexão com o WhatsApp
static async initialize()

// Configura os manipuladores de eventos de conexão
static setupConnectionHandlers(sock, saveCreds)
```

#### Eventos Tratados

- `connection.update`: Gerencia o estado da conexão e reconexão
- `creds.update`: Salva as credenciais de autenticação

#### Exemplo de Uso

```javascript
const sock = await WhatsAppConnection.initialize();
// sock é o objeto de conexão que pode ser usado para enviar mensagens
```

### MessageHandler

**Arquivo**: `middlewares/messageHandler.js`

Gerencia o recebimento e processamento de mensagens.

#### Propriedades

- `sock`: Objeto de conexão Baileys
- `userStates`: Map contendo os estados de cada usuário
- `userTimers`: Map contendo os timers de inatividade
- `messageHistory`: Map para controle de mensagens duplicadas
- `blockedNumbers`: Set contendo números bloqueados

#### Métodos Principais

```javascript
// Inicializa o handler e configura os listeners
initialize()

// Processa mensagens recebidas
async handleMessage({ messages })

// Verifica se um número está bloqueado
isNumberBlocked(number)

// Bloqueia um número
blockNumber(number)

// Desbloqueia um número
unblockNumber(number)

// Inicializa o estado de um usuário
initializeUserState(userId)

// Reseta o timer de inatividade
resetUserTimer(userId)
```

#### Exemplo de Uso

```javascript
const messageHandler = new MessageHandler(sock);
messageHandler.initialize();
messageHandler.blockNumber('5531999999999@s.whatsapp.net');
```

## Sistema de Comandos

### Interface de Comando

Cada comando ou submenu implementa a seguinte interface:

```javascript
class MenuExample {
    // Processa a entrada do usuário e retorna uma resposta
    static async execute(userInput, state)
    
    // Reinicia o estado para o menu principal
    static resetState(state)
    
    // Obtém o texto do menu para exibição
    static getMenu()
    
    // Formata o menu com título e opções
    static formatMenu(menuData)
}
```

### Menu Principal

**Arquivo**: `commands/menu.js`

Coordena todos os submenus e serve como ponto central de navegação.

#### Propriedades

- `MENU_MODULES`: Objeto que mapeia números de opção para módulos de submenu

#### Métodos Principais

```javascript
// Processa a entrada do usuário e gerencia navegação
static async execute(userInput, state)

// Reinicia o estado para o menu principal
static resetState(state)

// Gerencia seleções no menu principal
static handleMainMenu(userInput, state)

// Obtém o texto do menu principal
static getMainMenu()

// Formata o menu com título e opções
static formatMenu(menuData)
```

### Submenus

Cada submenu segue o mesmo padrão básico com personalizações específicas.

#### Exemplo: MenuToken

**Arquivo**: `commands/menuToken.js`

```javascript
// Processa a entrada do usuário no contexto de tokens
static async execute(userInput, state)

// Gerencia a seleção de cidades
static handleTokenMenu(userInput, state)

// Gerencia a confirmação de token
static handleTokenConfirmation(userInput, state)

// Gerencia a entrada de código de orçamento
static handleBudgetCode(userInput, state)

// Reseta o estado e retorna ao menu principal
static resetAndReturnToMain(state)

// Obtém o texto do menu de tokens
static getMenu()

// Obtém o texto do menu de confirmação
static getTokenConfirmationMenu()

// Formata o menu com título e opções
static formatMenu(menuData)
```

## Utilitários

### InvalidParameterError

**Arquivo**: `InvalidParameterError.js`

Classe de erro personalizada para parâmetros inválidos.

```javascript
class InvalidParameterError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidParameterError';
    }
}
```

## Fluxos de Usuário

### Fluxo Básico

1. Usuário inicia conversa → Exibe menu principal
2. Usuário seleciona opção → Navega para submenu
3. Interação no submenu → Processa ação específica
4. Usuário digita "Q" → Retorna ao menu principal
5. Inatividade por 4 minutos → Encerra sessão

### Exemplo: Fluxo de Token

1. Usuário seleciona "1" no menu principal → Mostra lista de cidades
2. Usuário seleciona uma cidade → Mostra opções de token
3. Usuário escolhe criar novo token → Processa criação
4. Usuário escolhe reenviar token → Solicita código de orçamento
5. Usuário fornece código → Processa reenvio

## Referência da API

### Estado do Usuário

```javascript
{
    currentMenu: string,    // Menu atual ('main', 'token', etc.)
    hasShownWelcome: boolean, // Indica se já mostrou boas-vindas
    selectedCity: string | null, // Cidade selecionada (contexto)
    previousInput: string | null, // Entrada anterior (contexto)
    hasSeenTable: boolean   // Indica se já viu tabela (específico)
}
```

### Formato de Menu

```javascript
{
    title: string,          // Título do menu
    options: {              // Opções do menu
        key: string         // Chave: texto da opção
    }
}
```

### Respostas

- **Texto**: String contendo a resposta
- **Imagem**: Objeto `{ image: { url: string }, caption: string }`
- **Reset**: `null` para indicar retorno ao menu principal

### Tratamento de Erros

- Erros de execução são capturados e reportados ao usuário
- Timeout de inatividade é acionado após 4 minutos
- Proteção contra mensagens duplicadas via IDs de mensagem
- Sistema de bloqueio de números para prevenção de spam

### Estendendo o Bot

Para adicionar um novo submenu:

1. Crie um arquivo `menuNovafuncionalidade.js` seguindo o padrão existente
2. Adicione a entrada no objeto `MENU_MODULES` em `menu.js`:

```javascript
MENU_MODULES = {
    // ... outras entradas
    novoNumero: { path: './menuNovaFuncionalidade', name: 'novafuncionalidade' }
}
```

3. Atualize o menu principal em `getMainMenu()` para incluir a nova opção