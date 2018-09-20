module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "parser": "babel-eslint",
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  "settings": {
    "react": {
      "version": "16.5.0"
    }
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "indent": [
      "error",
      2
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ],
    "no-console": 0
  }
};
