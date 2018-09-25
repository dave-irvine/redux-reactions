const reactions = {};
const idTypeMap = {};

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

export function addReaction(type, reaction) {
  if (!reactions[type]) {
    reactions[type] = {};
  }

  const id = Symbol(type);

  reactions[type][id] = reaction;
  idTypeMap[id] = type;

  return id;
}

export function registerReactions(reactionsToRegister) {
  return Object.entries(reactionsToRegister).map((entry) => {
    const [, reaction] = entry;

    return reaction(addReaction);
  });
}

export function removeHandler(id) {
  const type = idTypeMap[id];

  delete reactions[type][id];
}
