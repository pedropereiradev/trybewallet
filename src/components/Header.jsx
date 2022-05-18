import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { userEmail, expenses } = this.props;
    return (
      <header>
        <h2>TrybeWallet</h2>
        <p data-testid="email-field">{userEmail}</p>
        <section>
          <p data-testid="total-field">
            Despesa total:
            {' '}
            {expenses.length === 0 ? 0 : expenses}
            {' '}
            {/* TODO - BRL vem da API */}
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
  expenses: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default connect(mapStateToProps)(Header);
