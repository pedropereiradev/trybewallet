import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import walletIcon from '../assets/wallet.svg';

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
      <header
        className="d-flex align-items-center justify-content-between px-3"
      >
        <section className="d-flex align-items-center">
          <img src={ walletIcon } alt="Wallet representation" />
          <h2>TrybeWallet</h2>
        </section>
        <section className="d-flex flex-column justify-content-around">
          <p className="font-italic text-secondary" data-testid="email-field">
            <small>
              Email:
              {' '}
              {userEmail}
            </small>
          </p>
          <p className="font-italic border border-success rounded p-2">
            Despesa total: R$
            {' '}
            <span className="font-weight-bold" data-testid="total-field">
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
