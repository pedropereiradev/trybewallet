import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';

class Table extends Component {
  handleDelete(id) {
    const { allExpenses, deleteExpenseProp } = this.props;

    deleteExpenseProp(allExpenses.filter((expense) => expense.id !== id));
  }

  render() {
    const { allExpenses } = this.props;
    return (
      <main>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {allExpenses.map(({
              id, description, tag, method,
              value, currency, exchangeRates,
            }) => {
              const currencyName = exchangeRates[currency].name;
              const exchangeUsed = Number(exchangeRates[currency].ask);
              const convertedValue = Number(exchangeRates[currency].ask) * value;

              return (
                <tr key={ id }>
                  <td>{description || '-'}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>{currencyName}</td>
                  <td>{ exchangeUsed.toFixed(2) }</td>
                  <td>{ convertedValue.toFixed(2) }</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.handleDelete(id) }
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  allExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpenseProp: (expenses) => dispatch(deleteExpense(expenses)),
});

Table.propTypes = {
  allExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpenseProp: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
