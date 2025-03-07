# Guia de Instalação e Configuração do Íris Bot

Este guia fornece instruções detalhadas para instalar, configurar e executar o Íris Bot em diferentes ambientes.

## Índice
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Autenticação](#autenticação)
- [Execução](#execução)
- [Implantação em Produção](#implantação-em-produção)
- [Solução de Problemas](#solução-de-problemas)

## Pré-requisitos

Antes de instalar o Íris Bot, certifique-se de que seu sistema atende aos seguintes requisitos:

- **Node.js**: Versão 16.x ou superior
  - Verificar versão: `node -v`
  - Download: [nodejs.org](https://nodejs.org/)

- **NPM**: Versão 8.x ou superior (geralmente instalado com Node.js)
  - Verificar versão: `npm -v`

- **Sistema Operacional**: Windows, macOS ou Linux

- **Conexão com a Internet**: Necessária para conectar à API do WhatsApp

## Instalação

### Passo 1: Clonar o Repositório

```bash
# Clonar o repositório
git clone https://github.com/seuusuario/iris-bot.git

# Entrar no diretório do projeto
cd iris-bot
```

### Passo 2: Instalar Dependências

```bash
# Usando NPM
npm install

# OU usando Yarn
yarn install
```

Este comando instalará todas as dependências necessárias, incluindo:
- `baileys`: API não oficial do WhatsApp Web
- `@hapi/boom`: Tratamento de erros HTTP
- `pino`: Sistema de logs
- `qrcode-terminal`: Exibição de QR Code no terminal
- `express`: Servidor web (opcional, para futuras extensões)

## Configuração

### Estrutura de Diretórios

Certifique-se de que os seguintes diretórios existam no projeto:

```bash
# Criar diretório para armazenar dados de autenticação
mkdir -p assets/auth/baileys
```

### Números Bloqueados (Opcional)

Para configurar os números bloqueados, edite o arquivo `src/middlewares/messageHandler.js`:

```javascript
// Lista de números bloqueados
this.blockedNumbers = new Set([
    '5511999999999@s.whatsapp.net',
    // Adicione mais números conforme necessário
]);
```

### Timeout de Sessão (Opcional)

Para ajustar o tempo de inatividade antes de encerrar uma sessão, modifique a constante `TIMEOUT_DURATION` no arquivo `src/middlewares/messageHandler.js`:

```javascript
this.TIMEOUT_DURATION = 4 * 60 * 1000; // 4 minutos em milissegundos
```

## Autenticação

O Íris Bot usa autenticação via QR Code para se conectar ao WhatsApp. Este processo precisa ser realizado apenas uma vez (ou quando as credenciais expirarem).

### Processo de Autenticação

1. Inicie o bot pela primeira vez:
   ```bash
   npm start
   ```

2. Um QR Code será exibido no terminal.

3. Escaneie o QR Code com seu WhatsApp:
   - Abra o WhatsApp no seu celular
   - Toque em Menu (ou Configurações) > WhatsApp Web
   - Escaneie o QR Code exibido no terminal

4. Após a autenticação bem-sucedida, as credenciais serão armazenadas no diretório `assets/auth/baileys/`.

**Nota**: As credenciais armazenadas permitem que o bot se reconecte sem precisar escanear o QR Code novamente em execuções futuras.

## Execução

### Modo de Desenvolvimento

Para executar o bot em modo de desenvolvimento com reinicialização automática quando os arquivos são alterados:

```bash
npm run dev
```

### Modo de Produção

Para execução em ambiente de produção:

```bash
npm start
```

## Implantação em Produção

### Preparando para Produção

1. **Configuração de Ambiente**:
   - Recomendamos usar PM2 para gerenciar o processo em produção
   - Instale o PM2 globalmente: `npm install -g pm2`

2. **Arquivo de Configuração PM2**:
   Crie um arquivo `ecosystem.config.js` na raiz do projeto:

   ```javascript
   module.exports = {
     apps: [{
       name: "iris-bot",
       script: "./index.js",
       env: {
         NODE_ENV: "production",
       },
       instances: 1,
       autorestart: true,
       watch: false,
       max_memory_restart: "1G"
     }]
   };
   ```

3. **Iniciar com PM2**:
   ```bash
   pm2 start ecosystem.config.js
   ```

4. **Configurar Inicialização Automática**:
   ```bash
   pm2 startup
   pm2 save
   ```

### Considerações de Segurança

- Mantenha as credenciais de autenticação (`assets/auth/`) seguras
- Considere usar variáveis de ambiente para configurações sensíveis
- Implemente logs e monitoramento adequados para detectar problemas

## Solução de Problemas

### Problemas Comuns

#### QR Code não aparece
- Verifique se o terminal suporta a exibição de QR Code
- Tente usar um terminal diferente ou uma biblioteca alternativa de QR Code

#### Erro de Conexão
- Verifique sua conexão com a internet
- Confirme se as credenciais não expiraram
- Exclua a pasta `assets/auth/baileys` e reconecte, escaneando o QR Code novamente

#### Mensagens não são enviadas/recebidas
- Verifique se o WhatsApp está conectado (telefone online)
- Confirme se o número não está bloqueado no sistema
- Verifique os logs para erros específicos

#### Erros de Dependências
- Remova o diretório `node_modules` e o arquivo `package-lock.json`
- Execute `npm install` novamente para reinstalar as dependências

### Logs e Depuração

Para habilitar logs mais detalhados, modifique o nível de log no arquivo `src/connection.js`:

```javascript
const sock = makeWASocket({
    printQRInTerminal: true,
    auth: state,
    logger: P({ level: 'debug' }), // Altere 'silent' para 'debug'
});
```

### Suporte

Se você encontrar problemas não cobertos neste guia, entre em contato com [seu contato de suporte aqui] ou abra uma issue no repositório do projeto.