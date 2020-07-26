import React from 'react';
import { formatCurrency } from '../helpers/formatHelpers';

import css from './totals.module.css';

export default function Totals({ transactions }) {
  const calculateTotalTransaction = (transactions, type) => {
    const totalTransaction = transactions
      .filter((transaction) => {
        return transaction.type === `${type}`;
      })
      .reduce((accumulator, current) => {
        return accumulator + current.value;
      }, 0);

    return totalTransaction;
  };

  const totalReceita = calculateTotalTransaction(transactions, '+');
  const totalDespesa = calculateTotalTransaction(transactions, '-');
  const totalSaldo = totalReceita - totalDespesa;

  return (
    <div className={css.flexRow}>
      <span className={css.labels}>
        Lançamentos: <strong>{transactions.length}</strong>
      </span>
      <span className={css.labels}>
        Receitas:{' '}
        <strong className={css.input}>{formatCurrency(totalReceita)}</strong>
      </span>
      <span className={css.labels}>
        Despesas:{' '}
        <strong className={css.output}>{formatCurrency(totalDespesa)}</strong>
      </span>
      <span className={css.labels}>
        Saldo: <strong>{formatCurrency(totalSaldo)}</strong>
      </span>
    </div>
  );
}
