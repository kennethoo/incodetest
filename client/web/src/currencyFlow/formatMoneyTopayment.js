const currencyUnits = {
  USD: 100,
  EUR: 100,
};

export function convertToStripe(currencyAmount, currencyCode = "USD") {
  if (!(currencyCode in currencyUnits)) {
    throw new Error(`Unsupported currency code: ${currencyCode}`);
  }

  const smallestUnit = currencyUnits[currencyCode];
  const stripeAmount = Math.round(currencyAmount * smallestUnit);

  return stripeAmount;
}

export function convertFromStripe(stripeAmount, currencyCode = "USD") {
  if (!(currencyCode in currencyUnits)) {
    throw new Error(`Unsupported currency code: ${currencyCode}`);
  }

  // Convert the Stripe amount to the currency amount
  const smallestUnit = currencyUnits[currencyCode];
  const currencyAmount = stripeAmount / smallestUnit;

  return currencyAmount;
}
