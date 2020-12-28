import { salePeriodName, salePeriodRatio, salePeriodTotal } from "src/config/appConfig"

export class MiningPeriodData {
  public name: string
  public ratio: number
  public supply: number
  public period: number

  constructor() {
    this.name = ''
    this.ratio = 0
    this.supply = 0
    this.period = 0;
  }
}

export default function sageMiningPeriod(
  umiMined: number
) {
  let period = 0;
  if (umiMined <= salePeriodTotal[0])
    period = 0;
  else if (umiMined <= salePeriodTotal[1])
    period = 1;
  else if (umiMined <= salePeriodTotal[2])
    period = 2;
  else if (umiMined <= salePeriodTotal[3])
    period = 3;

  let data: MiningPeriodData = new MiningPeriodData()
  data.name = salePeriodName[period];
  data.ratio = salePeriodRatio[period];
  data.supply = salePeriodTotal[period];
  data.period = period;

  return data;
}
