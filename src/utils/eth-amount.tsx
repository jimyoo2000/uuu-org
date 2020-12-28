import React, { FC } from 'react'
import formatNumber from './format-number'

interface Props {
  amount: string
  decimal?: number
}

const ETHAmount: FC<Props> = ({ amount, decimal = 2, ...restProps }) => {
  return <span {...restProps}>{formatNumber(amount, decimal)} ETH</span>
}

export default ETHAmount
