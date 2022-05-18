export const LOGIN = 'LOGIN';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_CURRENCIES_SUCESS = 'GET_CURRENCIES_SUCESS';
export const GET_CURRENCIES_FAIL = 'GET_CURRENCIES_FAIL';

const EXCHANGE_BASE_API = 'https://economia.awesomeapi.com.br';

export const login = (email) => ({
  type: LOGIN,
  email,
});

export const getCurrencies = () => ({
  type: GET_CURRENCIES,
});

export const getCurrenciesSucess = (currencies) => ({
  type: GET_CURRENCIES_SUCESS,
  currencies,
});

export const getCurrenciesFail = () => ({
  type: GET_CURRENCIES_FAIL,
});

export const getCurrenciesThunk = () => async (dispatch) => {
  dispatch(getCurrencies());
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
