import type dayjs from 'dayjs';

export default interface Data {
  sunrise: dayjs.Dayjs;
  sunset: dayjs.Dayjs;
  length: number;
}
