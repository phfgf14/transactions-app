const formattedCurrency = Intl.NumberFormat('pr-BR', {
  style: 'currency',
  currency: 'BRL',
});

const formattedPercentage = Intl.NumberFormat('pr-BR');

function formatCurrency(value) {
  return formattedCurrency.format(value);
}

function formatPercentage(value) {
  return formattedPercentage.format(value);
}
export { formatCurrency, formatPercentage };
