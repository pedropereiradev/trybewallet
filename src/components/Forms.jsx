import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  getCurrenciesThunk, getExpensesThunk,
  removeExpenseToUpdate, UpdateExpenses,
} from '../actions';

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
      createMode: true,
    };
  }

  async componentDidMount() {
    const { getCurrenciesProp } = this.props;
    await getCurrenciesProp();

    const { allCurrencies } = this.props;

    this.setState({ currency: allCurrencies[0] });
  }

  componentDidUpdate() {
    const { expenseToEdit } = this.props;
    if (expenseToEdit.length) this.handleEdit();
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
    const { id, value, description, currency, method, tag, createMode } = this.state;
    const { getExpensesProp, allCurrencies,
      allExpenses, updateExpensesProp } = this.props;

    const expenses = {
      id,
      value,
      description,
      currency,
      method,
      tag,
    };
    if (createMode) {
      getExpensesProp(expenses);
      this.setState((prevState) => ({ id: prevState.id + 1 }));
    } else {
      allExpenses[id].value = value;
      allExpenses[id].description = description;
      allExpenses[id].currency = currency;
      allExpenses[id].method = method;
      allExpenses[id].tag = tag;

      updateExpensesProp(allExpenses);
    }

    this.setState({
      value: '0',
      description: '',
      currency: allCurrencies[0],
      method: 'Dinheiro',
      tag: ALIMENTACAO,
      createMode: true,
    });
  }

  handleEdit() {
    const { expenseToEdit, removeExpenseToUpdateProp } = this.props;
    const { id, value, description, currency, method, tag } = expenseToEdit[0];
    this.setState({
      id,
      value,
      description,
      currency,
      method,
      tag,
      isDisabled: false,
      createMode: false,
    });

    removeExpenseToUpdateProp();
  }

  render() {
    const { value, description, currency,
      method, tag, isDisabled, createMode } = this.state;
    const { allCurrencies } = this.props;

    return (
      <section className="d-flex justify-content-center mb-3">
        <form className="form-inline">
          <label htmlFor="value" className="mr-4">
            Valor:
            <input
              type="number"
              name="value"
              id="value"
              value={ value }
              onChange={ this.handleChange }
              data-testid="value-input"
              className="form-control ml-2"
            />
          </label>

          <label htmlFor="currency" className="mr-4">
            Moeda:
            <select
              value={ currency }
              onChange={ this.handleChange }
              name="currency"
              id="currency"
              data-testid="currency-input"
              className="form-control ml-2"
            >
              {allCurrencies.map((currencyMapped) => (
                <option value={ currencyMapped } key={ currencyMapped }>
                  {currencyMapped}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="payment" className="mr-4">
            Método de pagamento:
            <select
              value={ method }
              name="method"
              id="payment"
              onChange={ this.handleChange }
              data-testid="method-input"
              className="form-control ml-2"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag" className="mr-4">
            Categoria:
            <select
              value={ tag }
              name="tag"
              id="tag"
              onChange={ this.handleChange }
              data-testid="tag-input"
              className="form-control ml-2"
            >
              <option value={ ALIMENTACAO }>Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <label htmlFor="description" className="mr-4">
            Descrição:
            <input
              type="text"
              name="description"
              placeholder="(opcional)"
              id="description"
              value={ description }
              onChange={ this.handleChange }
              data-testid="description-input"
              className="form-control ml-2"
            />
          </label>

          <button
            type="submit"
            onClick={ this.handleSubmit }
            disabled={ isDisabled }
            className="btn btn-success"
          >
            {createMode ? 'Adicionar despesa' : 'Editar despesa'}
          </button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  allCurrencies: state.wallet.currencies,
  allExpenses: state.wallet.expenses,
  expenseToEdit: state.wallet.expenseToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrenciesProp: () => dispatch(getCurrenciesThunk()),
  getExpensesProp: (expenses) => dispatch(getExpensesThunk(expenses)),
  removeExpenseToUpdateProp: () => dispatch(removeExpenseToUpdate()),
  updateExpensesProp: (expenses) => dispatch(UpdateExpenses(expenses)),
});

Forms.propTypes = {
  allCurrencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  allExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  expenseToEdit: PropTypes.arrayOf(PropTypes.object),
  getCurrenciesProp: PropTypes.func.isRequired,
  getExpensesProp: PropTypes.func.isRequired,
  updateExpensesProp: PropTypes.func.isRequired,
  removeExpenseToUpdateProp: PropTypes.func.isRequired,
};

Forms.defaultProps = {
  expenseToEdit: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Forms);
