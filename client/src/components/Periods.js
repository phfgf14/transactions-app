import React from 'react';
import M from 'materialize-css';

import { PERIODS } from '../../helpers/periods.js';

export default function Header({ period, onChangePeriod }) {
  React.useEffect(() => {
    M.AutoInit();
  }, []);

  const handlePeriodChange = (event) => {
    const newPeriod = event.target.value;
    onChangePeriod(newPeriod);
  };

  return (
    <select value={period} onChange={handlePeriodChange}>
      {PERIODS.map((period) => {
        return (
          <option key={period} value={period}>
            {period}
          </option>
        );
      })}
    </select>
  );
}
