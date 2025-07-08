# Skyrim Supermarket

Implementação front-end de um sistema de supermercado cujos produtos oferecidos são os itens encontrados no videogame "The Elder Scrolls V: Skyrim", produzido pela Bethesda Game Studios.

# Dependências

* React (via Create React App)
* React Router
* NodeJs
* HTML5/CSS3

# Como executar

Clone o repositório:

```
git@github.com:skyrim-supermarket/market-frontend.git
cd market-frontend
```

Instale as dependências:

```
npm install
```

Inicie o servidor de frontend:

```
npm start
```

A aplicação será aberta automaticamente no navegador padrão em `http://localhost:3000`.

# Funcionalidades

* Listagem de itens com seus atributos;
* Filtragem e ordenação por nome e faixa de preço;
* Carrinho de compras;
* Listagem de compras passadas;
* Compras online (via um entregador) e in loco (via um caixa)
* Administrador: listagem, adição, edição e remoção de produtos e funcionários;

# Estrutura de pastas

```
[4.0K]  .
├── [4.0K]  public
│   ├── [4.0K]  assets
│   │   └── [4.0K]  fonts
│   └── [4.0K]  bg
└── [4.0K]  src
    └── [4.0K]  pages
        ├── [4.0K]  assets
        │   ├── [4.0K]  bg
        │   └── [4.0K]  fonts
        ├── [4.0K]  Cadastro
        ├── [4.0K]  components
        │   └── [4.0K]  styles
        ├── [4.0K]  EditAccount
        ├── [4.0K]  hooks
        ├── [4.0K]  Login
        ├── [4.0K]  main
        │   ├── [4.0K]  Admin
        │   ├── [4.0K]  Carrocaboy
        │   ├── [4.0K]  Cashier
        │   ├── [4.0K]  Home
        │   └── [4.0K]  User
        ├── [4.0K]  query-scripts
        └── [4.0K]  style-scripts
```

# Licença

Todo o projeto está sob a licença MIT.
