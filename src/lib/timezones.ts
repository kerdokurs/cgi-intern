import Timezone from './Timezone';

// Generating timezones
export default [...Array(27).keys()]
  .map((i) => {
    const offset = i - 12;
    return new Timezone(offset);
  })
  // Adding weird timezones
  .concat([
    new Timezone(-9.5),
    new Timezone(-3.5),
    new Timezone(3.5),
    new Timezone(4.5),
    new Timezone(5.5),
    new Timezone(5.75),
    new Timezone(6.5),
    new Timezone(8.75),
    new Timezone(9.5),
    new Timezone(10.5),
    new Timezone(12.75),
  ])
  // Sorting by offset
  .sort((a, b) => a.offset - b.offset);
