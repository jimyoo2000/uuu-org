export class EpochData {
  public investAmount: string;            //总投资额度
  public lastWithdrawBlock: number;       //上次提现区块高度  
  public totalWithdrawAmount: string;     //已提现
  public availableWithdrawAmount: string; //可提现
  public profitAmount:string;

  // const investAmount = epoch.investAmount
  // const lastWithdrawBlock = epoch.lastWithdrawBlock
  // const totalWithdrawAmount = epoch.totalWithdrawAmount

  constructor() {
    this.investAmount = '0';
    this.lastWithdrawBlock = 0;
    this.totalWithdrawAmount = '0';
    this.availableWithdrawAmount = '0';
    this.profitAmount = '0';
  }
}