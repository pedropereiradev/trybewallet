import {
  GET_DATA,
  GET_CURRENCIES_SUCESS,
  GET_EXPENSES_SUCESS,
  DELETE_EXPENSE,
  GET_EXPENSE_TO_UPDATE,
  REMOVE_EXPENSE_TO_UPDATE,
  UPDATE_EXPENSES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  expenseToEdit: [],
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
  case GET_EXPENSE_TO_UPDATE:
    return {
      ...state,
      expenseToEdit: [action.expense],
    };
  case REMOVE_EXPENSE_TO_UPDATE:
    return {
      ...state,
      expenseToEdit: [],
    };

  case UPDATE_EXPENSES:
    return {
      ...state,
      expenses: [...action.expensesUpdated],
    };
  default:
    return state;
  }
}

export default walletReducer;
