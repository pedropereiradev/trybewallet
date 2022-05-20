import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  calculateExpenses() {
    const { expenses } = this.props;
    const totalExpenses = expenses.map(({ value, currency, exchangeRates }) => {
      const usedExchange = exchangeRates[currency].ask;

      return {
        value,
        currency,
        usedExchange,
      };
    }).reduce((acc, { value, usedExchange }) => acc + (value * usedExchange), 0);

    return totalExpenses.toFixed(2);
  }

  render() {
    const { userEmail } = this.props;
    return (
      <header>
        <h2>TrybeWallet</h2>
        <p data-testid="email-field">{userEmail}</p>
        <section>
          <p>
            Despesa total:
            {' '}
            <span data-testid="total-field">
              {this.calculateExpenses()}
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
