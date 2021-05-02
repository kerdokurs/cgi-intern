const SunCalc = require('suncalc');
const DayJS = require('dayjs');

const { sunrise, sunset } = SunCalc.getTimes(
  new Date('2021-05-02'),
  58.57442976955856,
  26.298293197692683
);

console.log({
  sunrise: DayJS(new Date(sunrise)).format('YYYY-MM-DD HH:mm:ss'),
});
