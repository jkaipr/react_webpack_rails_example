const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

const makeActions = (base, types) =>
  types.reduce((requestTypes, type) => {
    requestTypes[type] = `${base}_${type}`;
    return requestTypes;
  }, {});

export default (base) => makeActions(base, [REQUEST, SUCCESS, FAILURE]);
export const request = (base) => makeActions(base, [REQUEST]);
