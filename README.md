# APS - Sistema de Comunicação Criptografada

Uma aplicação web moderna para criptografia e descriptografia usando a **Cifra de Vigenère**.

![Vigenère Cipher](https://img.shields.io/badge/Cipher-Vigen%C3%A8re-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=flat&logo=bootstrap&logoColor=white)

## 🌟 Características

- ✨ **Interface moderna** e responsiva
- 🔒 **Criptografia/Descriptografia** com Cifra de Vigenère
- 🎨 **Design atrativo** com gradiente animado
- 📱 **Totalmente responsiva** (desktop, tablet, mobile)
- ⚡ **Validação em tempo real** dos campos
- 📋 **Copiar resultado** com um clique
- 🎯 **Atalhos de teclado** para produtividade
- 💬 **Notificações toast** informativos

## 🚀 Como usar

### Executar a aplicação
Simplesmente abra o arquivo `index.html` em qualquer navegador moderno. Não é necessário servidor web!

### Criptografar uma mensagem
1. Selecione "Criptografar"
2. Digite sua mensagem (até 128 caracteres)
3. Digite a palavra-chave (apenas letras)
4. Clique em "Criptografar Mensagem"

### Descriptografar uma mensagem
1. Selecione "Descriptografar"
2. Digite a mensagem criptografada
3. Digite a mesma palavra-chave usada na criptografia
4. Clique em "Descriptografar Mensagem"

## 📁 Estrutura do projeto

```
aps-crypto/
├── index.html          # Página principal
├── styles.css          # Estilos customizados
├── vigenere-web.js     # Lógica da cifra de Vigenère
├── app.js              # Controle da interface
├── README.md           # Este arquivo
└── README-web.md       # Documentação detalhada
```

## 🎯 Demonstração rápida

Para testar rapidamente:
- **Mensagem:** `HELLO WORLD`
- **Chave:** `KEY`
- **Resultado:** `RIJVS UYVJN`

## ⌨️ Atalhos de teclado

- `Ctrl/Cmd + Enter` - Processar mensagem
- `Escape` - Limpar formulário
- `Enter` (no campo chave) - Processar mensagem

## 🛠️ Tecnologias

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos e animações
- **JavaScript ES6** - Lógica da aplicação
- **Bootstrap 5** - Framework responsivo
- **Font Awesome 6** - Ícones

## 📱 Compatibilidade

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Dispositivos móveis

## 🔐 Sobre a Cifra de Vigenère

A Cifra de Vigenère é um método de criptografia polialfabética que usa uma palavra-chave para criptografar o texto. É mais segura que a cifra de César, mas ainda é considerada um método clássico adequado para fins educacionais.

### Como funciona:
1. A chave é repetida para ter o mesmo tamanho da mensagem
2. Cada letra da mensagem é deslocada pelo valor correspondente na chave
3. Apenas letras A-Z são criptografadas, outros caracteres permanecem inalterados

## ⚠️ Nota de segurança

Esta implementação é destinada para fins **educacionais**. Não deve ser usada para proteger informações sensíveis em ambientes de produção.

## 📄 Licença

Este projeto é parte de um trabalho acadêmico (APS) e está disponível para fins educacionais.

---

**Desenvolvido com ❤️ para aprendizado de criptografia**
