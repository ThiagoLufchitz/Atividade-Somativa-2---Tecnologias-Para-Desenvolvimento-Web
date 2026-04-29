# React Firebase App — Guia de Configuração e Deploy

## 📁 Estrutura do Projeto

```
src/
├── firebase/
│   └── config.js          ← Configuração do Firebase
├── routes/
│   └── AppRoutes.jsx      ← Arquivo de rotas (React Router Dom)
├── pages/
│   ├── Cadastro.jsx       ← Página 1: cadastro com Firebase Auth + Firestore
│   ├── Login.jsx          ← Página 2: login com Firebase Auth
│   └── Principal.jsx      ← Página 3: exibe dados do Firestore
├── styles/
│   └── global.css         ← Estilos globais
├── App.js
└── index.js
```

---

## 🔥 PASSO 1 — Configurar o Firebase

### 1.1 Criar projeto no Firebase
1. Acesse https://console.firebase.google.com
2. Clique em **"Adicionar projeto"** → dê um nome → crie
3. No menu lateral, clique em **"Autenticação"** → **"Começar"**
4. Na aba **"Método de login"**, ative **E-mail/senha**
5. No menu lateral, clique em **"Firestore Database"** → **"Criar banco de dados"**
   - Escolha **Modo de produção** (ou teste para facilitar)
   - Selecione a região mais próxima

### 1.2 Obter as credenciais
1. Vá em ⚙️ **Configurações do projeto** → **Seus apps** → clique em **"</>  Web"**
2. Registre o app com um nome
3. Copie o objeto `firebaseConfig` gerado

### 1.3 Colar as credenciais no projeto
Abra `src/firebase/config.js` e substitua os valores:

```js
const firebaseConfig = {
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123:web:abc123",
};
```

### 1.4 Regras do Firestore (para permitir leitura/escrita)
No Firebase Console → Firestore → **Regras**, cole:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /usuarios/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

---

## 💻 PASSO 2 — Rodar localmente

```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm start
```

Acesse: http://localhost:3000

---

## 🚀 PASSO 3 — Build e Deploy na Vercel (gratuito, acesso público)

### Opção A: Deploy via GitHub + Vercel (recomendado)

1. **Suba o projeto no GitHub:**
```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/SEU_USER/SEU_REPO.git
git push -u origin main
```

2. **Acesse https://vercel.com** → faça login com GitHub

3. Clique em **"New Project"** → importe o repositório

4. Configurações do build (Vercel detecta automaticamente):
   - Framework: **Create React App**
   - Build Command: `npm run build`
   - Output Directory: `build`

5. Clique em **"Deploy"**

6. Em ~1 minuto seu app estará em: `https://seu-projeto.vercel.app`

### Opção B: Deploy via Vercel CLI

```bash
# Instalar CLI
npm install -g vercel

# Na pasta do projeto
npm run build
vercel --prod
```

---

## 🔗 Páginas da aplicação

| Rota | Página |
|------|--------|
| `/cadastro` | Formulário de cadastro (5 campos + Firebase Auth + Firestore) |
| `/login` | Login com validação no Firebase Auth |
| `/principal` | Dados do usuário buscados no Firestore |

---

## ✅ O que foi implementado

- **React Router Dom v6** com arquivo de rotas separado (`AppRoutes.jsx`)
- **Firebase Authentication** com provedor E-mail/senha
- **Firestore** gravando: uid, nome, sobrenome, dataNascimento, email
- **Página Principal** protegida — redireciona para Login se não autenticado
- **Logout** na página Principal
- Mensagens de erro e sucesso em todas as páginas
