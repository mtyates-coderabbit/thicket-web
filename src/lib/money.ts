const formatters = new Map<string, Intl.NumberFormat>();

/**
 * Formats an API amount for display. Amounts from the API are decimal values
 * in the currency's major unit (for example 47.62 means $47.62).
 */
export function formatMoney(amount: number, currency = 'USD'): string {
  let formatter = formatters.get(currency);
  if (!formatter) {
    formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency });
    formatters.set(currency, formatter);
  }
  return formatter.format(amount);
}
