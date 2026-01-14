export function formatIndianCurrency(value: string | number): string {
    if (!value) return '';

    // Remove existing formatting (commas, spaces) if string
    const cleanValue = typeof value === 'string' ? value.replace(/,/g, '').replace(/ /g, '') : value;
    const number = parseFloat(cleanValue as string); // TS handles number -> string auto for parseFloat? No, cast.

    if (isNaN(number)) return value as string; // Return original text if not a number

    if (number >= 10000000) {
        // Crores (1,00,00,000)
        const cr = number / 10000000;
        return `${parseFloat(cr.toFixed(2))} Cr`; // Remove trailing zeros
    } if (number >= 100000) {
        // Lakhs (1,00,000)
        const lakh = number / 100000;
        return `${parseFloat(lakh.toFixed(2))} Lakhs`;
    }

    // Fallback for smaller amounts (standard Indian format with commas)
    return number.toLocaleString('en-IN');
}
