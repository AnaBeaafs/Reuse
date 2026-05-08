<<<<<<< HEAD
# Sample Snack app

Open the `App.js` file to start writing some code. You can preview the changes directly on your phone or tablet by scanning the **QR code** or use the iOS or Android emulators. When you're done, click **Save** and share the link!

When you're ready to see everything that Expo provides (or if you want to use your own editor) you can **Download** your project and use it with [expo cli](https://docs.expo.dev/get-started/installation/#expo-cli)).

All projects created in Snack are publicly available, so you can easily share the link to this project via link, or embed it on a web page with the `<>` button.

If you're having problems, you can tweet to us [@expo](https://twitter.com/expo) or ask in our [forums](https://forums.expo.dev/c/expo-dev-tools/61) or [Discord](https://chat.expo.dev/).

Snack is Open Source. You can find the code on the [GitHub repo](https://github.com/expo/snack).
=======
# ReUse - App de Troca Sustentável

Um aplicativo mobile para troca, reutilização e economia circular. Conecte-se com outras pessoas e dê nova vida aos seus itens!

## Sobre o Projeto

**ReUse** é uma plataforma mobile desenvolvida em **React Native** com o objetivo de promover o consumo consciente através da troca e reutilização de roupas, acessórios, eletrônicos, livros e outros itens.

O app permite que usuários publiquem itens que não usam mais, encontrem produtos de outros usuários e contribuam para a redução de resíduos.

---

## Funcionalidades Implementadas

### Principais Features
- **Navegação por Tabs**: Início, Postar e Perfil
- **Autenticação completa** com login persistente
- **Postagem de itens** com câmera e galeria
- **Consumo de API** externa (FakeStore API)
- **Gamificação**: Sistema de pontos, níveis, streak e animações
- **Perfil editável** com foto de usuário
- **Caching local** com AsyncStorage
- **Design moderno** e responsivo

### Gamificação
- Ganho de pontos ao postar itens (+300)
- Ganho de pontos ao favoritar (+20)
- Animação flutuante de pontos
- Nível e streak visíveis no perfil

---

## Tecnologias Utilizadas

- **React Native** (Expo)
- **React Navigation** (Stack + Bottom Tabs)
- **Context API** (Autenticação)
- **AsyncStorage** (Caching local)
- **Expo Camera** + **Image Picker**
- **FakeStore API** + Picsum Photos
- **Animated API** (animações)

---

## Telas Desenvolvidas

- `LoginScreen`
- `HomeScreen` (com produtos da API)
- `PostItemScreen` (Câmera + Galeria)
- `ProfileScreen` (Edição + Logout)

---

##Critérios de Avaliação Atendidos

### 1. Consumo de APIs
- Integração com **FakeStore API**
- Busca dinâmica de produtos na Home
- Tratamento de erros e fallback

### 2. Autenticação e Sessões
- Login persistente
- Proteção de rotas
- Logout funcional com redirecionamento

### 3. Caching Local (20%)
- Dados do usuário (`@ReUse:user`)
- Lista de itens (`@ReUse:items`)
- Carregamento offline-first
>>>>>>> 60515f0e46831322010df2020c683d258eeb3c16
