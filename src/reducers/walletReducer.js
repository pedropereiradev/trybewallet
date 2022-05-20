import {
  GET_DATA,
  GET_CURRENCIES_SUCESS,
  GET_EXPENSES_SUCESS,
  DELETE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_DATA:
    return {
      ...state,
    };
  case GET_CURRENCIES_SUCESS:
    return {
      ...state,
      currencies: action.currencies,
    };
  case GET_EXPENSES_SUCESS:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.expenses,
    };
  default:
    return state;
  }
}

export default walletReducer;
