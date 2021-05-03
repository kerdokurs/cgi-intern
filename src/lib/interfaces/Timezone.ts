// Class for generating and handling Timezones
export default class Timezone {
  private _name: string;

  /**
   * Timezone
   *
   * @param _offset timezone offset
   */
  constructor(private _offset: number) {
    this._offset = _offset;
    this._name = this.formatTime(_offset);
  }

  /**
   * Method for formatting a number to 2 digits.
   *
   * @param n number
   * @returns formatted number
   */
  private formatNumber = (n: number): string =>
    n > 9 ? n.toString() : '0' + n;

  /**
   * Method for formatting timezone time
   *
   * @param n number
   * @returns formatted time
   */
  private formatTime = (n: number) =>
    `UTC${n >= 0 ? '+' : ''}${n.toString().split('.')[0]}:${this.formatNumber(
      (n - Math.floor(n)) * 60
    )}`;

  get name(): string {
    return this._name;
  }

  get offset(): number {
    return this._offset;
  }
}
