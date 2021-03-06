// @ts-ignore
import SunCalc from 'suncalc';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import type Data from './interfaces/Data';
import type Timezone from './interfaces/Timezone';

dayjs.extend(utc);

/**
 * Calculates sunrise, sunset and the length of day.
 *
 * @param date date
 * @param lat position latitude
 * @param lng position longitude
 * @returns sun times and day length
 */
export const calculate = (
  date: Date,
  lat: number,
  lng: number,
  timezone: Timezone
): Data => {
  // Using this library to calculate the times.
  // Precision should always be in the range of +-5 minutes.
  const { sunrise: _sunrise, sunset: _sunset } = SunCalc.getTimes(
    date,
    lat,
    lng
  );

  const sunrise = dayjs.utc(_sunrise).utcOffset(timezone.offset);
  const sunset = dayjs.utc(_sunset).utcOffset(timezone.offset);
  const length = sunset.diff(sunrise, 'minutes');

  return {
    sunrise,
    sunset,
    length,
    date: new Date(date), // Copying the date
  };
};

/**
 * Calculates sunrise, sunset and day length for a given range of dates.
 *
 * @param start start date (inclusive)
 * @param end end date (inclusive)
 * @param lat position latitude
 * @param lng position longitude
 * @returns sun times and day length for each date
 */
export const calculateRange = (
  start: Date,
  end: Date,
  lat: number,
  lng: number,
  timezone: Timezone
): Data[] => {
  const data: Data[] = [];

  for (
    const current = start;
    current <= end;
    current.setDate(current.getDate() + 1)
  )
    data.push(calculate(current, lat, lng, timezone));

  return data;
};
