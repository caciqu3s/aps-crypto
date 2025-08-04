# APS - Sistema de Comunicação Criptografada

Uma aplicação web interativa para **comparar, testar e utilizar** 3 algoritmos de criptografia clássicos com interface moderna e responsiva.

![Vigenère Cipher](https://img.shields.io/badge/Cipher-Vigen%C3%A8re-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=flat&logo=bootstrap&logoColor=white)

## 🚀 Funcionalidades Principais

### **📊 1. Comparação de Performance**
- **Benchmark automático** dos 3 algoritmos de criptografia
- **Medição precisa** de tempo de criptografia e descriptografia
- **Tabela comparativa** com métricas detalhadas
- **Gráfico visual** interativo usando Canvas HTML5
- **Identificação automática** do algoritmo mais rápido
- **Configuração flexível** de iterações (100-5000)

### **🔐 2. Criptografia/Descriptografia Prática**
- **Interface intuitiva** para criptografar e descriptografar mensagens
- **Seleção de algoritmo** (Vigenère, César, Substituição)
- **Validação em tempo real** de entradas
- **Contador de caracteres** com feedback visual
- **Resultados copiáveis** para área de transferência
- **Histórico visual** da operação realizada

### **🧪 3. Teste Individual de Algoritmos**
- **Teste isolado** de cada algoritmo
- **Verificação completa** (criptografia + descriptografia)
- **Medição de tempo** de execução individual
- **Resultados detalhados** com comparação original/criptografado/descriptografado
- **Geração automática** de dados de teste
- **Validação de integridade** dos algoritmos

### **🎨 4. Interface Moderna e Responsiva**
- **Design responsivo** para desktop, tablet e mobile
- **Navegação por abas** intuitiva
- **Animações suaves** e feedback visual
- **Tema gradiente** com cores modernas
- **Ícones Font Awesome** para melhor UX
- **Adaptação automática** para diferentes tamanhos de tela

## 🎯 Como o Projeto Funciona

### **Visão Geral**
Este projeto implementa uma **ferramenta completa de criptografia** que oferece três modos de operação:
1. **🔐 Criptografia Prática** - Para uso real de algoritmos
2. **📊 Comparação de Performance** - Para análise de velocidade
3. **🧪 Teste Individual** - Para verificação e experimentação

### **Algoritmos Implementados**

#### **1. Cifra de Vigenère**
- **Tipo**: Criptografia polialfabética
- **Funcionamento**: Repete a chave para cobrir todo o texto
- **Segurança**: Média
- **Exemplo**: "HELLO" + chave "KEY" = "RIJVS"

#### **2. Cifra de César**
- **Tipo**: Criptografia por deslocamento simples
- **Funcionamento**: Desloca cada letra por um valor fixo
- **Segurança**: Baixa
- **Exemplo**: "HELLO" + deslocamento 3 = "KHOOR"

#### **3. Cifra de Substituição**
- **Tipo**: Criptografia por troca de alfabeto
- **Funcionamento**: Gera novo alfabeto baseado na palavra-chave
- **Segurança**: Média-Alta
- **Exemplo**: "HELLO" + chave "SECRET" = novo alfabeto

### **Fluxo de Funcionamento**

#### **1. Interface do Usuário**
- **Página única** (`index.html`) com design responsivo
- **Navegação por abas** para diferentes funcionalidades
- **Formulários interativos** com validação em tempo real
- **Áreas de resultados** com visualizações detalhadas
- **Animações CSS** e feedback visual em tempo real

#### **2. Processamento de Dados**
```
Usuário seleciona funcionalidade → Configura parâmetros → Validação → Execução → Análise → Exibição de resultados
```

#### **3. Sistema de Medição de Performance**

**Método de Benchmark:**
```javascript
function measureTime(func, iterations = 1000) {
    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
        func(); // Executa a função múltiplas vezes
    }
    const end = performance.now();
    return (end - start) / iterations; // Tempo médio por operação
}
```

**Processo de Teste:**
1. **Normalização** do texto e chave (conversão para maiúsculas)
2. **Execução** de cada algoritmo com os mesmos dados
3. **Medição** de tempo para criptografia e descriptografia
4. **Cálculo** de estatísticas (média, identificação do mais rápido)
5. **Geração** de resultados formatados

#### **4. Visualização de Resultados**

**Tabela Comparativa:**
- **Tempo de criptografia** em milissegundos/microssegundos
- **Tempo de descriptografia** com indicadores visuais
- **Nível de segurança** (Baixa, Média, Média-Alta)
- **Ícones de troféu** para algoritmos mais rápidos
- **Botões de visualização** para ver resultados criptografados

**Gráfico de Performance:**
- **Canvas HTML5** para renderização
- **Barras coloridas** (azul = criptografia, laranja = descriptografia)
- **Escala automática** baseada nos dados
- **Legenda explicativa** e títulos

## 🛠️ Funcionalidades Detalhadas

### **🔐 Aba de Criptografia/Descriptografia**

#### **Recursos:**
- **Seleção de algoritmo** via botões radio
- **Escolha de operação** (criptografar/descriptografar)
- **Campo de mensagem** com limite de 128 caracteres
- **Campo de chave** com validação específica por algoritmo
- **Contador de caracteres** com feedback visual
- **Botão de processamento** com estado de loading
- **Exibição de resultados** com informações detalhadas
- **Botão de cópia** para área de transferência

#### **Validações:**
- **Mensagem**: Aceita letras, números, espaços e pontuação
- **Chave Vigenère/Substituição**: Apenas letras (A-Z)
- **Chave César**: Apenas primeira letra (A=1, B=2, etc.)

### **📊 Aba de Comparação de Performance**

#### **Recursos:**
- **Configuração de teste** com texto, chave e iterações
- **Geração automática** de dados de teste aleatórios
- **Execução de benchmark** com indicador de progresso
- **Tabela de resultados** com métricas detalhadas
- **Gráfico de barras** comparativo
- **Identificação visual** do algoritmo mais rápido
- **Botões de limpeza** (resultados e campos)

#### **Métricas Exibidas:**
- **Tempo de criptografia** (ms/μs)
- **Tempo de descriptografia** (ms/μs)
- **Nível de segurança** com badges coloridos
- **Descrição do algoritmo** (funcionamento)
- **Botão de visualização** de resultados

### **🧪 Aba de Teste Individual**

#### **Recursos:**
- **Seleção de algoritmo** específico para teste
- **Campo de mensagem** com limite de 200 caracteres
- **Campo de chave** com validação específica
- **Geração automática** de dados de teste
- **Execução de teste** com medição de tempo
- **Resultados completos** (original, criptografado, descriptografado)
- **Verificação de integridade** (criptografia + descriptografia)
- **Botões de cópia** para cada resultado

#### **Informações Exibidas:**
- **Algoritmo testado** com nome completo
- **Chave utilizada** no teste
- **Tempo de execução** total
- **Mensagem original** de entrada
- **Mensagem criptografada** (azul)
- **Mensagem descriptografada** (verde)

### **🎨 Recursos de Interface**

#### **Design Responsivo:**
- **Desktop (>1200px)**: Layout completo com todas as funcionalidades
- **Tablet (768px-1200px)**: Layout adaptativo com ajustes de espaçamento
- **Mobile (576px-768px)**: Layout empilhado com navegação otimizada
- **Small Mobile (<576px)**: Interface compacta com scroll horizontal

#### **Navegação por Abas:**
- **Labels adaptativos** (texto completo no desktop, abreviado no mobile)
- **Ícones distintivos** para cada funcionalidade
- **Transições suaves** entre abas
- **Estado ativo** claramente indicado

#### **Feedback Visual:**
- **Animações CSS** para transições e carregamentos
- **Notificações toast** para ações do usuário
- **Estados de loading** com spinners
- **Validação em tempo real** com cores indicativas
- **Contadores de caracteres** com feedback de limite

### **🧹 Funcionalidades de Limpeza**

#### **Criptografia:**
- **Botão "Limpar"**: Limpa todos os campos e resultados
- **Reset completo** do formulário
- **Ocultação** da seção de resultados

#### **Comparação:**
- **"Limpar Resultados"**: Remove tabela e gráfico
- **"Limpar Campos"**: Reseta campos de entrada para padrões
- **Limpeza seletiva** para diferentes necessidades

#### **Teste Individual:**
- **"Limpar Resultados"**: Remove seção de resultados
- **"Limpar Campos"**: Reseta formulário de teste
- **Reset de validação** e contadores

## 🔧 Arquitetura Técnica

### **Estrutura de Arquivos:**
```
aps-crypto/
├── index.html              # Interface principal com 3 abas
├── styles.css              # Estilos responsivos e animações
├── cipher-algorithms.js    # Implementação dos 3 algoritmos
├── app.js                  # Lógica da interface e funcionalidades
└── README.md               # Documentação completa
```

### **Tecnologias Utilizadas:**

#### **Frontend:**
- **HTML5** - Estrutura semântica, Canvas API, Clipboard API
- **CSS3** - Animações, gradientes, media queries, flexbox
- **JavaScript ES6** - Lógica de negócio, manipulação DOM, async/await
- **Bootstrap 5** - Grid system, componentes, utilitários
- **Font Awesome 6** - Ícones vetoriais responsivos

#### **APIs do Navegador:**
- **Performance API** - Medição precisa de tempo
- **Canvas API** - Renderização de gráficos
- **Clipboard API** - Copiar resultados para área de transferência
- **Touch Events** - Suporte móvel otimizado

### **Sistema de Validação:**
```javascript
// Validação de texto
function isValidText(text) {
    return /^[A-Za-z0-9\s.,!?;:'"()\-]*$/.test(text);
}

// Validação de chave
function isValidKey(key) {
    return /^[A-Za-z]+$/.test(key);
}

// Normalização
function normalizeText(text) {
    return text.toUpperCase();
}
```

## 📱 Experiência do Usuário

### **Workflow por Funcionalidade:**

#### **1. 🔐 Criptografia Prática:**
1. **Selecionar algoritmo** (Vigenère, César, Substituição)
2. **Escolher operação** (criptografar/descriptografar)
3. **Inserir mensagem** (máx. 128 caracteres)
4. **Inserir chave** (validação específica por algoritmo)
5. **Processar** e visualizar resultados
6. **Copiar resultado** se necessário

#### **2. 📊 Comparação de Performance:**
1. **Configurar teste** (texto, chave, iterações)
2. **Gerar dados aleatórios** (opcional)
3. **Executar benchmark** com todos os algoritmos
4. **Analisar tabela** de resultados
5. **Visualizar gráfico** comparativo
6. **Identificar** algoritmo mais rápido

#### **3. 🧪 Teste Individual:**
1. **Selecionar algoritmo** específico
2. **Inserir dados** ou gerar automaticamente
3. **Executar teste** individual
4. **Verificar resultados** (criptografia + descriptografia)
5. **Analisar tempo** de execução
6. **Copiar resultados** específicos

### **Recursos Interativos:**

#### **Atalhos de Teclado:**
- `Ctrl/Cmd + Enter` - Executar operação principal
- `Escape` - Limpar resultados/voltar ao estado inicial
- `Enter` no campo de chave - Executar teste individual

#### **Responsividade:**
- **Desktop**: Layout completo com todas as funcionalidades visíveis
- **Tablet**: Layout adaptativo com ajustes de espaçamento
- **Mobile**: Layout empilhado com navegação otimizada
- **Small Mobile**: Interface compacta com scroll horizontal

#### **Feedback Visual:**
- **Animações CSS** para transições suaves
- **Notificações toast** para ações do usuário
- **Estados de loading** durante processamento
- **Indicadores de validação** em tempo real
- **Contadores de caracteres** com feedback de limite

## 🎓 Casos de Uso Educacionais

### **Para Estudantes:**
- **Comparação prática** de algoritmos de criptografia
- **Visualização** de trade-offs entre velocidade e segurança
- **Experimento** com diferentes tamanhos de dados
- **Análise** de complexidade computacional
- **Teste individual** para compreensão detalhada
- **Verificação** de integridade dos algoritmos

### **Para Professores:**
- **Demonstração** de conceitos de criptografia
- **Benchmark** para comparar implementações
- **Material didático** interativo
- **Avaliação** de performance de algoritmos
- **Exemplos práticos** de criptografia
- **Análise comparativa** de segurança

### **Para Desenvolvedores:**
- **Referência** de implementação de algoritmos clássicos
- **Exemplo** de interface moderna para criptografia
- **Benchmark** para otimização de performance
- **Base** para implementação de novos algoritmos

## ⚠️ Limitações e Considerações

### **Segurança:**
- **Algoritmos clássicos** para fins educacionais
- **Não adequado** para proteção de dados sensíveis
- **Implementação simplificada** para demonstração
- **Uso apenas** em ambientes controlados

### **Performance:**
- **Execução no navegador** (client-side)
- **Precisão limitada** pela granularidade do sistema
- **Variações** dependendo do hardware/dispositivo
- **Influência** do estado do sistema operacional

### **Compatibilidade:**
- **Navegadores modernos** (Chrome 60+, Firefox 55+, Safari 12+)
- **JavaScript habilitado** obrigatório
- **Suporte a Canvas API** necessário
- **Clipboard API** para funcionalidade de cópia

## 🔮 Desenvolvimento e Extensibilidade

### **Adicionar Novos Algoritmos:**
1. **Implementar** funções `encrypt()` e `decrypt()` em `cipher-algorithms.js`
2. **Adicionar** entrada no objeto `results` em `testCipherPerformance()`
3. **Atualizar** descrições e níveis de segurança
4. **Incluir** na interface de seleção

### **Personalizar Interface:**
- **Modificar estilos** em `styles.css`
- **Ajustar layout** em `index.html`
- **Adicionar funcionalidades** em `app.js`
- **Customizar** animações e transições

### **Otimizações Possíveis:**
- **Web Workers** para processamento em background
- **IndexedDB** para armazenar histórico de testes
- **WebAssembly** para algoritmos mais complexos
- **PWA** para instalação como aplicativo
- **Exportação** de resultados em diferentes formatos
- **Histórico** de operações realizadas

### **Funcionalidades Futuras:**
- **Mais algoritmos** de criptografia clássica
- **Análise de frequência** de caracteres
- **Quebra de cifras** simples
- **Comparação** com algoritmos modernos
- **Modo offline** completo
- **API REST** para integração

## 🚀 Como Usar

### **Instalação:**
1. **Clone** o repositório
2. **Abra** `index.html` em um navegador moderno
3. **Comece** a usar imediatamente

### **Execução Local:**
```bash
# Opção 1: Abrir diretamente
open index.html

# Opção 2: Servidor local (recomendado)
python3 -m http.server 8000
# Acesse: http://localhost:8000

# Opção 3: Node.js
npx http-server
# Acesse: http://localhost:8080
```

### **Primeiros Passos:**
1. **Explore as 3 abas** para entender as funcionalidades
2. **Teste a criptografia** com uma mensagem simples
3. **Execute uma comparação** de performance
4. **Experimente** o teste individual
5. **Use os botões de limpeza** para resetar formulários

---

**Desenvolvido para fins educacionais** - Demonstra conceitos fundamentais de criptografia, análise de performance e desenvolvimento de interfaces modernas em uma aplicação web completa e interativa.

**Versão**: 2.0 - Interface completa com 3 funcionalidades principais
**Última atualização**: Dezembro 2024
