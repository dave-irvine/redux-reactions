# redux-reactions

Action handler [middleware](https://redux.js.org/advanced/middleware) for Redux.

[![npm version](https://img.shields.io/npm/v/redux-reactions.svg?style=flat-square)](https://www.npmjs.com/package/redux-reactions)

```js
npm install --save redux-reactions
```

## Motivation

I felt I needed a way to wait for an action to be dispatched in Redux, and respond to it in some way other than manipulating the store.

Like [redux-saga](https://redux-saga.js.org/), but much lighter.

## Inspiration

Lots of people have had a take on this, here are some middlewares I found that may suit you better:

- [redux-listeners](https://github.com/Gaya/redux-listeners)
- [redux-observable](https://redux-observable.js.org/)
- [redux-hook-middleware](https://github.com/kamataryo/redux-hook-middleware)
- [redux-listener](https://github.com/kouhin/redux-listener)
- [redux-fries](https://github.com/nicolasdelfino/redux-fries)
- [redux-action-listeners](https://github.com/rhythnic/redux-action-listeners)

## Usage

First, register the middleware:

### store.js

```js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createReactionsMiddleware } from 'redux-reactions';
​
const todoApp = combineReducers(reducers);
const store = createStore(
  todoApp,
  applyMiddleware(createReactionsMiddleware())
);
```

Next up, just like your [actions](https://redux.js.org/basics/exampletodolist#action-creators) go into a seperate file; for example `actions/index.js`, your reactions should also be seperated:

### reactions/index.js

```js
import * as constants from "./constants";

export function handleNewTodo(addReaction) {
  addReaction(constants.ADD_TODO, (dispatch, getState, action) => {
    /*
       * Do something, but don't dispatch ADD_TODO again or
       * you will enter a loop.
       * 
       * You can perform asynchronous work here.
       */
  });
}
```

And now in your [container](https://redux.js.org/basics/usagewithreact#implementing-container-components), register your reactions:

### containers/todo.js

```js
import { connect } from 'react-redux';
import { registerReactions } from 'redux-reactions';

import TodoList from 'components/TodoList';
import * as reactions from './reactions';
​
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

registerReactions(reactions);
​
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
```

## Thanks

Many thanks to [Ben Anderson](https://github.com/banderson) for giving up the redux-reactions npm package name.
