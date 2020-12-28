export class LevelData {
  public level: number;
  public levelPrice: number;
  public active: boolean;
  public blcoked: boolean;
  public x3matrix: number;
  public x2matrix: number;
  public x3reopen: number;
  public x2reopen: number;
  public x3eth: string;
  public x2eth: string;
  public umi: string;
  public eth: string;

  public x3matrixArray: Array<string>;
  public x2matrixArray: Array<string>;

  constructor() {
    this.level = 0;
    this.levelPrice = 0;
    this.active = false;
    this.blcoked = false;
    this.x3matrix = 0;
    this.x2matrix = 0;
    this.x3reopen = 0;
    this.x2reopen = 0;
    this.x3eth = '0';
    this.x2eth = '0';
    this.umi = '0';
    this.eth = '0';
    this.x3matrixArray = new Array<string>();
    this.x2matrixArray = new Array<string>();
  }
}