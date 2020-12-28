export default function formatNumber(
  numStr?: string,
  decimal = 2
): number | string {
  if (!numStr) {
    return '-'
  } else {
    const number = parseFloat(numStr)
    if (isNaN(number)) {
      return '-'
    } else {
      return parseFloat(number.toFixed(decimal))
    }
  }
}
