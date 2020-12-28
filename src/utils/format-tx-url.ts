export default function formatTxUrl(chain: string, tx: string) {
  const chainNet = chain.toLowerCase()
  const base =
    chainNet === 'mainnet'
      ? `https://etherscan.io`
      : `https://${chainNet}.etherscan.io`
  if (tx) {
    return `${base}/tx/${tx}`
  }
  return base
}
