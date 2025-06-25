# 🍕 Chat Pizza!

Bem-vindo ao **Chat Pizza!**, um projeto de chatbot inteligente para pizzarias, feito para encantar clientes e facilitar pedidos com IA generativa.

## 🚀 Visão Geral
O Chat Pizza! é um monorepo com frontend moderno (Next.js + React) e backend Node.js/TypeScript, integrando OpenAI para conversas naturais e automação de atendimento.

---

## 📦 Estrutura do Projeto

```
pizza-ai/
├── backend/      # API Node.js, TypeScript, integração OpenAI
├── frontend/     # Next.js, React, chat moderno e responsivo
├── package.json  # Monorepo, scripts globais
└── ...           # Configurações, docs, etc
```

---

## 🛠️ Instalação Rápida

1. **Clone o repositório:**
   ```bash
   git clone git@github.com:GustavoMinelli/pizza-ai.git
   cd pizza-ai
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   ```
3. **Configure as variáveis de ambiente:**
   - Copie `.env.example` e preencha com sua chave OpenAI:
     ```bash
     cp backend/_.env.example backend/.env
     # Edite backend/.env e insira sua OPENAI_API_KEY
     ```
4. **Inicie tudo em modo desenvolvimento:**
   ```bash
   npm run dev
   ```
   O frontend estará em `http://localhost:3000` e o backend em `http://localhost:3001` (ajustável).

---

## 💬 Funcionalidades
- Chatbot com IA generativa (OpenAI)
- Interface moderna, responsiva e animada
- Simulação de "digitando..." realista
- Menu de pizzas dinâmico
- Backend escalável e fácil de customizar

---

## ✨ Tecnologias
- **Frontend:** Next.js, React, TypeScript, CSS moderno
- **Backend:** Node.js, TypeScript, Express, OpenAI API
- **Monorepo:** Workspaces npm, scripts globais, fácil de rodar

---

## 🧑‍💻 Scripts Úteis

- `npm run dev` — Inicia frontend e backend juntos
- `npm run build` — Builda ambos projetos
- `npm run start` — Sobe ambos em produção
- `npm run install-all` — Instala dependências de todos os workspaces

---

## 📝 Customização
- Edite o menu em `backend/src/models/MenuItem.ts`
- Ajuste prompts e lógica do bot em `backend/src/services/OpenAiService.ts`
- Personalize o visual em `frontend/src/app/`

---

## 🛡️ Boas Práticas
- Nunca suba sua chave OpenAI real em repositórios públicos!
- Use `.env` apenas localmente, `.env.example` para referência.
- Commits limpos e scripts globais facilitam o desenvolvimento.

---

## 🤝 Contribuição
Pull requests são super bem-vindos! Sinta-se à vontade para propor melhorias, abrir issues ou sugerir novas features.

---

## 📄 Licença
MIT. Sinta-se livre para usar, modificar e compartilhar.

---

Feito com ❤️ por Gustavo Minelli e colaboradores.

---

> **Dica:** Experimente pedir uma pizza diferente no chat e veja a IA surpreender você!
