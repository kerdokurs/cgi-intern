import type dayjs from 'dayjs';

export default interface Data {
  date: Date;
  sunrise: dayjs.Dayjs;
  sunset: dayjs.Dayjs;
  length: number;
}
