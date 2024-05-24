# steps to start any javascript project

- start npm project with following command `npm init`
- install webpack with `npm i -D webpack webpack-cli`
- create webpack.config.js file
- create entry and output section from [webpack website](https://webpack.js.org/concepts/)
- add script in package.json file

```json
  "scripts": {
    "build": "webpack",
  },
```

- setup babel using webpack and do setup from [babel website](https://babeljs.io/setup#installation)
- create .babelrc file and add following comand ```json
  {
  "presets": ["@babel/preset-env"]
  }

````
- install  babel preset env with `npm i -D @babel/preset-env`
- install webpack html plugin using `npm i -D html-webpack-plugin` get setup from [html webpack plugin](https://webpack.js.org/plugins/html-webpack-plugin/#root) ```javascript
 <!-- example -->
 <!-- top of the file -->
 const HtmlWebpackPlugin = require('html-webpack-plugin');

 new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
````

- webpack setup for css install `npm i -D css-loader style-loader` and add rule as follow

```javascript
  {
  test: /\.css$/,
  exclude: /node_modules/,
  use: ['style-loader', 'css-loader'],
  },

```

- if you want to add post-css (if you want to use tailwind then follow this step) then install

```javascript
npm install --save-dev postcss-loader postcss
```

- follow instation steps from [postcss](https://github.com/webpack-contrib/postcss-loader)

- create .browserslistrc file to setup browser list for more detail check [broserlist](https://browsersl.ist/#q=last+6+version)

```json
last 4 version
> 4%
not dead # no browsers without security updates
```

- install tailwind css follow steps from [tailwindcss](https://tailwindcss.com/docs/installation/using-postcss)

- setup server using webpack dev server install lib using `npm i -D webpack-dev-server` add follwings config in webpack.config.js

```javascript
devServer: {
    open: true,
    port: 3000,
  },
```

- add script to start server

```json
  "scripts": {
    "build": "webpack",
    "start": "webpack serve",
  },
```

- install tailwindcss plugin from [tailwind plugin](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

- setup eslint using `npm init @eslint/config` and aswer the questions

- install eslint plugin from [eslint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

- install prettier and follow steps from [prettier website](https://prettier.io/docs/en/install)

- install prettier linter using [eslint config prettier](https://github.com/prettier/eslint-config-prettier) and follow the steps

- install babel eslint parser using [babel eslint parser website](https://www.npmjs.com/package/@babel/eslint-parser)

- install prettier plugin from [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

- install husky using [husky](https://duncanlew.medium.com/getting-started-with-husky-and-lint-staged-for-pre-commit-hooks-c2764d8c9ae)

**note**: dont miss follwing ignore files

- .gitignore
- .eslintignore
- .prettierignore

- remove everything from html(black body section)
- add code in index.js from [react website](https://react.dev/learn/add-react-to-an-existing-project)
- add preset rule in babel using `npm i -D @babel/preset-react`
  now your preset look like following

  ```json
  {
    "presets": ["@babel/preset-env", "@babel/preset-react"]
  }
  ```
