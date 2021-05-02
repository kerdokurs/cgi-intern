// @ts-ignore
import SunCalc from 'suncalc';
import dayjs from 'dayjs';
import type Data from './Data';

/**
 * Calculates sunrise, sunset and the length of day.
 *
 * @param date date
 * @param lat position latitude
 * @param lng position longitude
 * @returns sun times and day length
 */
export const calculate = (date: Date, lat: number, lng: number): Data => {
  const { sunrise: _sunrise, sunset: _sunset } = SunCalc.getTimes(
    date,
    lat,
    lng
  );

  const sunrise = dayjs(_sunrise);
  const sunset = dayjs(_sunset);
  const length = sunset.diff(sunrise, 'minutes');

  return {
    sunrise,
    sunset,
    length,
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
  lng: number
): Data[] => {
  const data: Data[] = [];

  for (
    const current = start;
    current <= end;
    current.setDate(current.getDate() + 1)
  )
    data.push(calculate(current, lat, lng));

  return data;
};
