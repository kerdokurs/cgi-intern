import type dayjs from 'dayjs';

// Interface for structuring data from the algorithm
export default interface Data {
  date: Date;
  sunrise: dayjs.Dayjs;
  sunset: dayjs.Dayjs;
  length: number;
}
