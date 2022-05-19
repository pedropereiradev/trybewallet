import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Loading from './Loading';
import { getCurrenciesThunk } from '../actions';

class Forms extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: 0,
      description: '',
      currencies: '',
      paymentMethod: '',
      category: '',
    };
  }

  async componentDidMount() {
    const { getCurrenciesProp } = this.props;
    await getCurrenciesProp();

    const { allCurrencies } = this.props;

    this.setState({
      currencies: allCurrencies[0],
      paymentMethod: 'Dinheiro',
      category: 'Alimentação',
    });
  }

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({ [name]: value });
  }

  render() {
    const { value, description, currencies, paymentMethod, category } = this.state;
    const { allCurrencies, isLoading } = this.props;

    return isLoading ? <Loading /> : (
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
              value={ currencies }
              onChange={ this.handleChange }
              name="currency"
              id="currency"
            >
              {allCurrencies.map((currency) => (
                <option value={ currency } key={ currency }>{currency}</option>
              ))}
            </select>
          </label>

          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              name="description"
              id="description"
              value={ description }
              onChange={ this.handleChange }
              data-testid="description-input"
            />
          </label>

          <label htmlFor="payment">
            Método de pagamento:
            <select
              value={ paymentMethod }
              name="payment"
              id="payment"
              onChange={ this.handleChange }
              data-testid="method-input"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="category">
            Categoria:
            <select
              value={ category }
              name="category"
              id="category"
              onChange={ this.handleChange }
              data-testid="tag-input"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  allCurrencies: state.wallet.currencies,
  isLoading: state.wallet.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrenciesProp: () => dispatch(getCurrenciesThunk()),
});

Forms.propTypes = {
  allCurrencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  isLoading: PropTypes.bool.isRequired,
  getCurrenciesProp: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Forms);
