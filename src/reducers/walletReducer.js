import {
  GET_DATA,
  GET_CURRENCIES_SUCESS,
  GET_EXPENSES_SUCESS,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isLoading: false,
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_DATA:
    return {
      ...state,
      isLoading: true,
    };
  case GET_CURRENCIES_SUCESS:
    return {
      ...state,
      currencies: action.currencies,
      isLoading: false,
    };
  case GET_EXPENSES_SUCESS:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
      isLoading: false,
    };
  default:
    return state;
  }
}

export default walletReducer;
