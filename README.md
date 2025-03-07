# Íris Bot - Assistente Virtual para WhatsApp

Íris é um chatbot de WhatsApp desenvolvido para a Corretora PlansCoop, oferecendo diversas funcionalidades de atendimento ao cliente através de um sistema de menus interativos.

## 📋 Visão Geral

O Íris Bot é um assistente virtual que permite aos usuários:
- Gerar tokens
- Consultar beneficiários
- Consultar orçamentos
- Consultar CNPJs
- Obter informações sobre planos odontológicos
- Acessar tabelas de preços
- Verificar a rede de atendimento
- Acessar links úteis
- Visualizar treinamentos
- Obter suporte
- Cadastrar-se como parceiro
- Calcular cotações

## 🔧 Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript
- **Baileys**: Framework para WhatsApp Web API
- **Express**: Framework web (dependência)
- **Estrutura modular**: Organização por funcionalidades em módulos separados

## 🗂️ Estrutura do Projeto

```
iris-bot/
├── assets/
│   └── auth/
│       └── baileys/         # Arquivos de autenticação
├── src/
│   ├── commands/            # Comandos do bot
│   │   ├── index.js         # Registro de comandos
│   │   ├── menu.js          # Menu principal
│   │   ├── menuToken.js     # Submenu de Tokens
│   │   └── ...              # Outros submenus
│   ├── middlewares/
│   │   └── messageHandler.js # Manipulador de mensagens
│   ├── connection.js        # Configuração da conexão WhatsApp
│   └── index.js             # Ponto de entrada
├── index.js                 # Inicialização do bot
└── package.json             # Dependências e scripts
```

## 🚀 Como Instalar e Executar

### Pré-requisitos
- Node.js 16.x ou superior
- NPM ou Yarn

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seuusuario/iris-bot.git
   cd iris-bot
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o bot:
   ```bash
   npm start
   ```

4. Para desenvolvimento com reinicialização automática:
   ```bash
   npm run dev
   ```

5. Escaneie o código QR que aparecerá no terminal para autenticar o WhatsApp.

## 🔄 Fluxo de Funcionamento

1. O usuário envia uma mensagem para o número do bot
2. O sistema verifica se é um usuário novo ou existente
3. O bot apresenta o menu principal ou submenu correspondente
4. O usuário navega pelos menus através de opções numéricas
5. Cada módulo de menu processa a entrada do usuário e retorna uma resposta adequada
6. Após 4 minutos de inatividade, a sessão é encerrada

## 📚 Documentação dos Módulos

Cada módulo de menu segue uma estrutura padrão:

- `execute(userInput, state)`: Processa a entrada do usuário e atualiza o estado
- `getMenu()`: Retorna o texto do menu para exibição
- `resetState(state)`: Reinicia o estado para voltar ao menu principal
- `formatMenu(menuData)`: Formata a exibição do menu

## 🔒 Segurança

- Sistema de bloqueio de números implementado
- Mecanismo de timeout para sessões inativas
- Proteção contra mensagens duplicadas

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está licenciado sob a licença [MIT](./LICENSE) - veja o arquivo LICENSE para detalhes.