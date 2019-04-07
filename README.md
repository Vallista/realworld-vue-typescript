[![RealWorld Frontend](https://img.shields.io/badge/realworld-frontend-%23783578.svg)](http://realworld.io)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# ![RealWorld Example App](./static/rwv-logo.png)
(Vue + TypeScript)

> Vue.js codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.

This codebase was created to demonstrate a fully fledged fullstack application built with **Vue.js** including CRUD operations, authentication, routing, pagination, and more.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.

## Getting started

Before contributing please read the following:

1. [RealWorld guidelines](https://github.com/gothinkster/realworld/tree/master/spec) for implementing a new framework,
2. [RealWorld frontend instructions](https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md)
3. [Realworld API endpoints](https://github.com/gothinkster/realworld/tree/master/api)
4. [Vue.js styleguide](https://vuejs.org/v2/style-guide/index.html). Priority A and B categories must be respected.
5. [TypeScript](https://www.typescriptlang.org/docs/home.html)

The stack not using [vue-cli](https://cli.vuejs.org/). Therefore, you can experience projects that do not use vue-cli.

``` bash
# install dependencies
> npm install
# serve with hot reload at localhost:8080 && 0.0.0.0:8080
> npm run dev
```

Other commands available are:

``` bash
# build for production with minification
npm run build
```

# To know

Current arbitrary choices are:

- Vuex modules for store
- Vue-axios for ajax requests
- vue-class-components, vue-property-decorator for using typescript in vue SFC

# Created By

<div style="display: flex; flex-direction: columns; justify-contents: center; align-items: center; align-contents: center;">
  <img src="https://avatars3.githubusercontent.com/u/20161023?s=460&v=4" style="width: 82px; height: 82px;"/>
  <span><a htef="https://github.com/mopsyshin">Mopsyshin</a></span>
</div>
