import React from 'react';

import css from './filter.module.css';

export default function Filter({ filter, onChangeFilter, onAdd }) {
  const handleInputChange = (event) => {
    const newText = event.target.value;
    onChangeFilter(newText);
  };

  const handleButtonSubmit = (event) => {
    event.preventDefault();

    const today = new Date();
    const currenteDate = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${today.getDate()}`;

    const formData = {
      type: '',
      description: '',
      category: '',
      value: 0,
      yearMonthDay: currenteDate,
    };
    onAdd(formData);
  };

  return (
    <div className={css.flexRow}>
      {/* <button className={css.button}> NOVO </button> */}
      <button className={css.button} type="submit" onClick={handleButtonSubmit}>
        +NOVO
      </button>
      <input
        className={css.input}
        type="text"
        placeholder="Filtro"
        value={filter}
        onChange={handleInputChange}
      />
    </div>
  );
}
