export function formatPrice(price: number): string {
  const rupeesAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(parseFloat(price.toFixed(2)));
  return rupeesAmount;
}
