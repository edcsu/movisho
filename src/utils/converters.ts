// Format the price to USD using the locale, style, and currency.
export function formatPriceToDollar(price: number) {
    const dollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return dollar.format(price)
}