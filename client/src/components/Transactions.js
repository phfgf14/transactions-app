import React from 'react';

import { formatCurrency } from '../helpers/formatHelpers';

import css from './transactions.module.css';
import Action from './Action';

// import Transaction from './Transaction';

export default function Transactions({ transactions, onDelete, onPersist }) {
  const handleActionClick = (id, type) => {
    const transaction = transactions.find(
      (transaction) => transaction._id === id
    );

    if (type === 'delete') {
      onDelete(transaction);
      return;
    }
    if (type === 'edit') {
      onPersist(transaction);
      return;
    }
  };

  return (
    <div className={css.flexRow}>
      {transactions.map(({ _id, day, category, value, description, type }) => {
        return (
          <div key={_id} className={`${css.transaction} ${css.border}`}>
            <div className={css.day}>{day}</div>
            <div>
              <ul>
                <li className={css.category}>{category}</li>
                <li className={css.description}>{description}</li>
              </ul>
            </div>
            <div className={css.value}>
              {type} {formatCurrency(value)}
            </div>
            <div className={css.action}>
              <Action onActionClick={handleActionClick} id={_id} type="edit" />
              <Action
                onActionClick={handleActionClick}
                id={_id}
                type="delete"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
