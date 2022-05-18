import {
  GET_CURRENCIES_SUCESS,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCIES_SUCESS:
    return ({
      ...state,
      currencies: action.currencies,
    });
  default:
    return state;
  }
}

export default walletReducer;
