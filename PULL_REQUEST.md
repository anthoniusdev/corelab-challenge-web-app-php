# Pull Request: Task Management Frontend

## 🚀 Descrição do Frontend

### Visão Geral
Implementação do frontend do sistema de gerenciamento de tarefas utilizando React, Typescript e Tailwind CSS.

## 🔧 Funcionalidades Implementadas

### Componente de Card
- Criação de componente `Card` para representação visual das tarefas
- Funcionalidades interativas:
  - Favoritar/desfavoritar
  - Edição de título e descrição
  - Alteração de cor de fundo
  - Exclusão de tarefa

### Detalhes Técnicos
- Hooks do React utilizados:
  - `useState` para gerenciamento de estado
- Integração com API backend
- Tratamento de eventos de usuário
- Design responsivo

## 🛠 Implementações Específicas

### Gerenciamento de Estado
- Estados locais para:
  - Título editável
  - Descrição editável
  - Estado de favorito
  - Paleta de cores
  - Modo de edição

### Interações com API
- Métodos implementados:
  - `handleFavorite()`: Favoritar/desfavoritar
  - `changeCardColor()`: Alterar cor do card
  - `saveChanges()`: Editar tarefa
  - `handleDelete()`: Deletar tarefa

### Design e UX
- Componente reutilizável
- Feedback visual para ações
- Transições suaves
- Paleta de cores personalizável

## 🧪 Testes Realizados
- Criação de tarefa
- Edição de tarefa
- Exclusão de tarefa
- Alteração de cor
- Favoritar/desfavoritar

## 🔍 Melhorias Futuras
- Implementar loading states
- Criar sistema de notificações
- Melhorar acessibilidade

## 🔗 Links
- [Repositório Frontend](link-repositorio-frontend)

## 📦 Tecnologias
- React
- Typescript
- Tailwind CSS
- Lucide React Icons

## Passos para Instalação

### 1. Clonar o Repositório
```bash
git clone https://github.com/anthoniusdev/corelab-challenge-web-app-php.git
cd corelab-challenge-web-app-php
```

### 2. Instalar Dependências
Com npm:
```bash
npm install
```
Com yarn:
```bash
yarn install
```
### 3. Iniciar o Servidor de Desenvolvimento
Com npm:
```bash
npm start
```
Com yarn:
```bash
yarn start
```

A aplicação será iniciada e estará acessível em:
```bash
http://localhost:3000
```
---
