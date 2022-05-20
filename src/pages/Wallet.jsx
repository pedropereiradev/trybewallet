import React from 'react';
import Forms from '../components/Forms';
import Header from '../components/Header';
import TableData from '../components/TableData';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Forms />
        <TableData />
      </div>
    );
  }
}

export default Wallet;
