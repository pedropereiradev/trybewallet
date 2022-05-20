import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  constructor() {
    super();

    this.calculateExpenses = this.calculateExpenses.bind(this);

    this.state = {
      totalExpenses: 0,
    };
  }

  componentDidUpdate(prevState) {
    this.calculateExpenses(prevState);
  }

  calculateExpenses(prevState) {
    const { expenses } = this.props;
    const totalExpenses = expenses.map(({ value, currency, exchangeRates }) => {
      const usedExchange = exchangeRates[currency].ask;

      return {
        value,
        currency,
        usedExchange,
      };
    }).reduce((acc, { value, usedExchange }) => acc + (value * usedExchange), 0);

    if (prevState.expenses.length < expenses.length) this.setState({ totalExpenses });
  }

  render() {
    const { userEmail } = this.props;
    const { totalExpenses } = this.state;
    return (
      <header>
        <h2>TrybeWallet</h2>
        <p data-testid="email-field">{userEmail}</p>
        <section>
          <p>
            Despesa total:
            {' '}
            <span data-testid="total-field">
              {totalExpenses.toFixed(2)}
            </span>
            {' '}
            <span data-testid="header-currency-field">BRL</span>
          </p>
        </section>
      </header>);
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
