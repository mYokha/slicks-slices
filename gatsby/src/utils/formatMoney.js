const formatter = Intl.NumberFormat('uk-UA', {
  style: 'currency',
  currency: 'UAH',
});

export default function formatMoney(cents) {
  return formatter.format(cents / 100);
}
