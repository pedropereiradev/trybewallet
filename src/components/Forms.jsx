import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrenciesThunk, getExpensesThunk } from '../actions';

const ALIMENTACAO = 'Alimentação';

class Forms extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      id: 0,
      value: '0',
      description: '',
      currency: '',
      method: 'Dinheiro',
      tag: ALIMENTACAO,
      isDisabled: false,
    };
  }

  async componentDidMount() {
    const { getCurrenciesProp } = this.props;
    await getCurrenciesProp();

    const { allCurrencies } = this.props;

    this.setState({ currency: allCurrencies[0] });
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({ [name]: value }, () => {
      const { value: price } = this.state;

      const validPrice = Number(price) >= 0;
      this.setState({ isDisabled: !validPrice });
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { id, value, description, currency, method, tag } = this.state;
    const { getExpensesProp, allCurrencies } = this.props;
    const expenses = {
      id,
      value,
      description,
      currency,
      method,
      tag,
    };

    getExpensesProp(expenses);

    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '0',
      description: '',
      currency: allCurrencies[0],
      method: 'Dinheiro',
      tag: ALIMENTACAO,
    }));
  }

  render() {
    const { value, description, currency,
      method, tag, isDisabled } = this.state;
    const { allCurrencies } = this.props;

    return (
      <section>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              type="number"
              name="value"
              id="value"
              value={ value }
              onChange={ this.handleChange }
              data-testid="value-input"
            />
          </label>

          <label htmlFor="currency">
            Moeda:
            <select
              value={ currency }
              onChange={ this.handleChange }
              name="currency"
              id="currency"
            >
              {allCurrencies.map((currencyMapped) => (
                <option value={ currencyMapped } key={ currencyMapped }>
                  {currencyMapped}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              name="description"
              placeholder="(opcional)"
              id="description"
              value={ description }
              onChange={ this.handleChange }
              data-testid="description-input"
            />
          </label>

          <label htmlFor="payment">
            Método de pagamento:
            <select
              value={ method }
              name="method"
              id="payment"
              onChange={ this.handleChange }
              data-testid="method-input"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag">
            Categoria:
            <select
              value={ tag }
              name="tag"
              id="tag"
              onChange={ this.handleChange }
              data-testid="tag-input"
            >
              <option value={ ALIMENTACAO }>Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <button
            type="submit"
            onClick={ this.handleSubmit }
            disabled={ isDisabled }
          >
            Adicionar despesa
          </button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  allCurrencies: state.wallet.currencies,
  allExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrenciesProp: () => dispatch(getCurrenciesThunk()),
  getExpensesProp: (expenses) => dispatch(getExpensesThunk(expenses)),
});

Forms.propTypes = {
  allCurrencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  getCurrenciesProp: PropTypes.func.isRequired,
  getExpensesProp: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Forms);
