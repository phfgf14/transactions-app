import React from 'react';
import { formatCurrency } from '../helpers/formatHelpers';

import css from './transactions.module.css';
import Action from './Action';

export default function Transaction({ transaction }) {
  const { _id: id, day, category, value, description } = transaction;

  const handleActionClick = (id, type) => {
    // const transaction = transaction.find((transaction) => transaction._id === id);
    console.log(id);
    if (type === 'delete') {
      // onDelete(transaction);
      console.log(type);
      return;
    }
    // onPersist(transaction);
    console.log(type);
  };

  return (
    <div className={`${css.transaction} ${css.border}`}>
      <div className={css.day}>{day}</div>
      <div>
        <ul>
          <li className={css.description}>{description}</li>
          <li className={css.category}>{category}</li>
        </ul>
      </div>
      <div className={css.value}>{formatCurrency(value)}</div>
      <div className={css.action}>
        <Action onActionClick={handleActionClick} id={id} type="edit" />
        <Action onActionClick={handleActionClick} id={id} type="delete" />
      </div>
    </div>
  );
}
