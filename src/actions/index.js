export const LOGIN = 'LOGIN';

export const GET_DATA = 'GET_DATA';

export const GET_CURRENCIES_SUCESS = 'GET_CURRENCIES_SUCESS';
export const GET_CURRENCIES_FAIL = 'GET_CURRENCIES_FAIL';

export const GET_EXPENSES_SUCESS = 'GET_EXPENSES_SUCESS';
export const GET_EXPENSES_FAIL = 'GET_EXPENSES_FAIL';

export const DELETE_EXPENSE = 'DELETE_EXPENSE';

const EXCHANGE_BASE_API = 'https://economia.awesomeapi.com.br';

// Login Action
export const login = (email) => ({
  type: LOGIN,
  email,
});

// Await API Action
export const getData = () => ({
  type: GET_DATA,
});

// Currencies Actions
export const getCurrenciesSucess = (currencies) => ({
  type: GET_CURRENCIES_SUCESS,
  currencies,
});

export const getCurrenciesFail = () => ({
  type: GET_CURRENCIES_FAIL,
});

export const getCurrenciesThunk = () => async (dispatch) => {
  dispatch(getData());
  try {
    const response = await fetch(`${EXCHANGE_BASE_API}/json/all`);
    const currencies = await response.json();
    const data = (Object.keys(currencies));
    dispatch(
      getCurrenciesSucess(data.filter((currencie) => currencie !== 'USDT')),
    );
  } catch (error) {
    dispatch(getCurrenciesFail());
  }
};

// Expenses Action
export const getExpensesSucess = (expenses, exchanges) => {
  expenses.exchangeRates = exchanges;
  return {
    type: GET_EXPENSES_SUCESS,
    expenses,
  };
};

export const getExpensesFail = () => ({
  type: GET_CURRENCIES_FAIL,
});

// https://www.w3schools.com/howto/howto_js_remove_property_object.asp
export const getExpensesThunk = (expenses) => async (dispatch) => {
  dispatch(getData());
  try {
    const response = await fetch(`${EXCHANGE_BASE_API}/json/all`);
    const exchanges = await response.json();
    delete exchanges.USDT;

    dispatch(getExpensesSucess(expenses, exchanges));
  } catch (error) {
    dispatch(getExpensesFail());
  }
};

export const deleteExpense = (expenses) => ({
  type: DELETE_EXPENSE,
  expenses,
});
