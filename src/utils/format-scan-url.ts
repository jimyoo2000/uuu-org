export default function formatScanUrl(chain: string, addr?: string) {
  const chainNet = chain.toLowerCase()
  const base =
    chainNet === 'mainnet'
      ? `https://etherscan.io`
      : `https://${chainNet}.etherscan.io`
  if (addr) {
    return `${base}/address/${addr}`
  }
  return base
}
