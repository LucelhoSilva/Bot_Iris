# Arquitetura do Íris Bot

Este documento descreve a arquitetura técnica do Íris Bot, um chatbot WhatsApp para a Corretora PlansCoop.

## Visão Geral da Arquitetura

O Íris Bot segue uma arquitetura modular baseada em comandos e estados. A aplicação é composta por:

1. **Core do Sistema**: Responsável pela conexão com a API do WhatsApp e gerenciamento de mensagens
2. **Sistema de Menus**: Estrutura hierárquica de menus e submenus
3. **Gerenciador de Estados**: Mantém o estado da conversa para cada usuário
4. **Manipulador de Mensagens**: Processa mensagens de entrada e direciona para os comandos apropriados

```
┌────────────────────────┐
│     WhatsApp API       │
└───────────┬────────────┘
            │
┌───────────▼────────────┐
│    Connection Module   │
└───────────┬────────────┘
            │
┌───────────▼────────────┐
│   Message Handler      │
└───────────┬────────────┘
            │
┌───────────▼────────────┐
│   Commands Registry    │
└───────────┬────────────┘
            │
┌───────────▼────────────┐
│     Menu System        │
└────────────────────────┘
```

## Componentes Principais

### 1. Conexão WhatsApp (connection.js)

Este módulo gerencia a conexão com a API do WhatsApp usando a biblioteca Baileys.

- **Autenticação**: Usa `useMultiFileAuthState` para gerenciar a autenticação
- **Reconexão**: Implementa lógica para reconectar em caso de desconexão
- **Eventos**: Escuta eventos de conexão e credenciais

### 2. Manipulador de Mensagens (messageHandler.js)

Responsável por receber e processar mensagens do WhatsApp.

- **Mapeamento de Estado**: Mantém um mapa de estados para cada usuário (`userStates`)
- **Timeout**: Implementa sistema de timeout para encerrar sessões inativas (`userTimers`)
- **Controle de Duplicação**: Evita processamento de mensagens duplicadas (`messageHistory`)
- **Bloqueio**: Sistema para bloquear números específicos (`blockedNumbers`)

### 3. Sistema de Comandos (commands/index.js)

Registra e gerencia todos os comandos disponíveis no bot.

- **Registro**: Centraliza o registro de comandos no sistema
- **Delegação**: Direciona comandos para os módulos apropriados

### 4. Sistema de Menus (menu.js e submenus)

Implementa a navegação e interação com o usuário através de menus.

#### Menu Principal (menu.js)
- Ponto de entrada para todas as interações
- Gerencia a transição entre o menu principal e submenus
- Implementa a lógica de formatação e exibição dos menus

#### Submenus (menuToken.js, menuConsultarBeneficiario.js, etc.)
- Cada submenu é implementado como um módulo independente
- Segue um padrão comum com métodos `execute`, `getMenu` e `resetState`
- Gerencia seu próprio estado e navegação interna

## Fluxo de Dados

1. **Recebimento de Mensagem**:
   - A mensagem é recebida através do evento `messages.upsert` da API Baileys
   - O `MessageHandler` processa a mensagem e verifica duplicação/bloqueio

2. **Processamento de Comando**:
   - A mensagem é enviada para o comando `menu.execute`
   - Com base no estado atual, o comando principal decide se processa diretamente ou delega para um submenu

3. **Atualização de Estado**:
   - O estado do usuário é atualizado com base na interação
   - Pode mudar entre menus/submenus ou manter o contexto dentro de um submenu

4. **Geração de Resposta**:
   - O comando retorna uma resposta baseada na entrada do usuário e estado atual
   - A resposta é enviada de volta ao usuário via WhatsApp

5. **Timeout e Limpeza**:
   - Após período de inatividade, a sessão é encerrada
   - Os recursos associados ao usuário são liberados

## Modelo de Estado

Cada usuário tem um objeto de estado associado que mantém o contexto da conversa:

```javascript
{
    currentMenu: 'main', // Menu atual (main, token, beneficiario, etc.)
    hasShownWelcome: false, // Se já mostrou mensagem de boas-vindas
    selectedCity: null, // Contexto específico (ex: cidade selecionada)
    previousInput: null // Entrada anterior para contextualizar
}
```

Este estado é passado para cada comando e atualizado conforme necessário.

## Extensibilidade

O sistema foi projetado para ser facilmente extensível:

1. **Novos Comandos**: 
   - Criar novo arquivo de módulo no diretório `commands`
   - Registrar no arquivo `commands/index.js`

2. **Novos Submenus**:
   - Criar novo arquivo seguindo o padrão dos submenus existentes
   - Registrar no objeto `MENU_MODULES` em `menu.js`

3. **Novas Funcionalidades**:
   - O sistema de estado permite adicionar novos contextos conforme necessário
   - A estrutura modular facilita a adição de novos fluxos de interação