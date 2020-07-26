import React from 'react';
import Header from './components/Header/Header.js';
import Totals from './components/Totals.js';
import Filter from './components/Filter.js';
import Transactions from './components/Transactions.js';
import * as api from './api/apiService';
import ModalTransaction from './components/ModalTransaction';

export default function App() {
  const today = new Date();
  const currenteDate = `${today.getFullYear()}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, '0')}`;

  const [transactions, setTransactions] = React.useState([]);
  const [currentPeriod, setCurrentPeriod] = React.useState(currenteDate);
  const [filteredTransactions, setFilteredTransactions] = React.useState([]);
  const [userFilter, setUserFilter] = React.useState('');
  const [selectedTransaction, setSelectedTransaction] = React.useState({});
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    const getTransactions = async () => {
      const res = await api.getAllTransactions(currentPeriod);
      setTransactions(res.data.transactions);
      setFilteredTransactions(Object.assign([], res.data.transactions));
      setUserFilter('');
    };
    getTransactions();
  }, [currentPeriod]);

  const handlePeriodChange = (newPeriod) => {
    setCurrentPeriod(newPeriod);
  };

  const handleChangeFilter = (newText) => {
    setUserFilter(newText);
    const filterLowerCase = newText.toLowerCase();
    const filteredTransactions = transactions.filter((transaction) => {
      return transaction.description.toLowerCase().includes(filterLowerCase);
    });
    setFilteredTransactions(filteredTransactions);
  };

  const handleDelete = async (transactionToDelete) => {
    const isDeleted = await api.deleteTransaction(transactionToDelete);
    if (isDeleted) {
      const allTransactions = await api.getAllTransactions(currentPeriod);
      setFilteredTransactions(allTransactions.data.transactions);
    }
  };

  const handleModalPersist = (transactionToEdit) => {
    setSelectedTransaction(transactionToEdit);
    setIsModalOpen(true);
  };

  const handleAdd = (formData) => {
    setSelectedTransaction(formData);
    setIsModalOpen(true);
  };

  const handlePersistData = async (formData) => {
    const isFound = filteredTransactions.find((transaction) => {
      return transaction._id === formData._id;
    });
    if (isFound) {
      await api.updateTransaction(formData);
    } else {
      await api.insertTransaction(formData);
    }
    const allTransactions = await api.getAllTransactions(currentPeriod);
    setFilteredTransactions(allTransactions.data.transactions);
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <h4 className="center">Desafio Final do Bootcamp Full Stack</h4>
      <h5 className="center">Controle Financeiro Pessoal</h5>
      <Header period={currentPeriod} onChangePeriod={handlePeriodChange} />
      <Totals transactions={filteredTransactions} />
      <Filter
        filter={userFilter}
        onChangeFilter={handleChangeFilter}
        onAdd={handleAdd}
      />
      <Transactions
        transactions={filteredTransactions}
        onDelete={handleDelete}
        onPersist={handleModalPersist}
      />
      {isModalOpen && (
        <ModalTransaction
          onSave={handlePersistData}
          onClose={handleClose}
          selectedTransaction={selectedTransaction}
        />
      )}
    </div>
  );
}
