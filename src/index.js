const reactions = {};
const idTypeMap = {};

function isFunction(obj) {
  return typeof obj === 'function';
}

function executeReactions(dispatch, getState, action) {
  return Object.getOwnPropertySymbols(reactions[action.type]).map((id) => {
    const reaction = reactions[action.type][id];

    return reaction(dispatch, getState, action);
  });
}

export function createReactionsMiddleware() {
  return ({ dispatch, getState }) => next => (action) => {
    if (typeof action !== 'object' || !reactions[action.type]) {
      return next(action);
    }

    next(action);

    return executeReactions(dispatch, getState, action);
  };
}

export function addReaction(type, reaction, opts = { unique: false }) {
  if (!reactions[type]) {
    reactions[type] = {};
  }

  if (opts.unique) {
    const existingReactions = Object.getOwnPropertySymbols(reactions[type]);

    if (existingReactions.length > 0) {
      return existingReactions[0];
    }
  }

  const id = Symbol(type);

  reactions[type][id] = reaction;
  idTypeMap[id] = type;

  return id;
}

export function removeHandler(id) {
  const type = idTypeMap[id];

  delete reactions[type][id];
}

export function registerReactions(reactionsToRegister) {
  Object.entries(reactionsToRegister).forEach(([, reaction]) => {
    if (isFunction(reaction)) {
      reaction(addReaction, removeHandler);
    }
  });
}
