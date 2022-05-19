import {
  GET_CURRENCIES,
  GET_CURRENCIES_SUCESS,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isLoading: false,
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCIES:
    return ({
      ...state,
      isLoading: true,
    });
  case GET_CURRENCIES_SUCESS:
    return ({
      ...state,
      currencies: action.currencies,
      isLoading: false,
    });
  default:
    return state;
  }
}

export default walletReducer;
