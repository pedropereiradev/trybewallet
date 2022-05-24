import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, getExpenseToUpdate } from '../actions';
import editIcon from '../assets/edit-icon.svg';
import deleteIcon from '../assets/delete-icon.svg';

class Table extends Component {
  render() {
    const { allExpenses, deleteExpenseProp, getExpenseToUpdateProp } = this.props;
    return (
      <main className="table-responsive">
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th className="text-center">Descrição</th>
              <th className="text-center">Tag</th>
              <th className="text-center">Método de pagamento</th>
              <th className="text-center">Valor</th>
              <th className="text-center">Moeda</th>
              <th className="text-center">Câmbio utilizado</th>
              <th className="text-center">Valor convertido</th>
              <th className="text-center">Moeda de conversão</th>
              <th className="text-center">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {allExpenses.map(({
              id, description, tag, method,
              value, currency, exchangeRates,
            }) => {
              let currencyName = exchangeRates[currency].name;
              if (currencyName.includes('/')) {
                currencyName = currencyName.slice(0, currencyName.indexOf('/'));
              }
              const exchangeUsed = Number(exchangeRates[currency].ask);
              const convertedValue = Number(exchangeRates[currency].ask) * value;

              return (
                <tr key={ id }>
                  <td>{description || '-'}</td>
                  <td className="text-center">{tag}</td>
                  <td className="text-center">{method}</td>
                  <td className="text-center">{Number(value).toFixed(2)}</td>
                  <td className="text-center">{currencyName}</td>
                  <td className="text-center">{ exchangeUsed.toFixed(2) }</td>
                  <td className="text-center">{ convertedValue.toFixed(2) }</td>
                  <td className="text-center">Real</td>
                  <td className="text-center">
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => getExpenseToUpdateProp(allExpenses
                        .find((expense) => expense.id === id)) }
                      className="btn btn-outline-info btn-sm mr-1"
                    >
                      <img src={ editIcon } alt="Edit Icon Button" />
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => deleteExpenseProp(allExpenses
                        .filter((expense) => expense.id !== id)) }
                      className="btn btn-outline-danger btn-sm"
                    >
                      <img src={ deleteIcon } alt="Delete Icon Button" />
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
  getExpenseToUpdateProp: (expense) => dispatch(getExpenseToUpdate(expense)),
});

Table.propTypes = {
  allExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpenseProp: PropTypes.func.isRequired,
  getExpenseToUpdateProp: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
