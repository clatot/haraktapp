const EORZEA_HOUR = 175 * 1000; // number of real life milliseconds in an Eorzean hour
const EORZEA_8_HOUR = 8 * 175 * 1000; // number of real life milliseconds in 8 Eorzean hours
const EORZEA_DAY = 24 * 175 * 1000; // number of real life milliseconds in an Eorzean day

export function WeatherChunk(time: number) {
  const eorzeanHoursFromEpoch = time / EORZEA_HOUR;
  const eorzeanDaysFromEpoch = time / EORZEA_DAY;

  const increment = getIncrement(eorzeanHoursFromEpoch);

  const step1 = (eorzeanDaysFromEpoch << 32) >>> 0;
  const step2 = step1 * 100 + increment;
  const step3 = ((step2 << 11) ^ step2) >>> 0;
  const step4 = ((step3 >>> 8) ^ step3) >>> 0;

  return step4 % 100;
}

function getIncrement(time: number) {
  return (time + 8 - (time % 8)) % 24;
}

export function convertToNearestEorzeanIntervalStart(time: number) {
  const eorzeanHoursFromEpoch = time / EORZEA_HOUR;
  const eorzeaTimeHour =
    (eorzeanHoursFromEpoch - (eorzeanHoursFromEpoch % 8)) % 24;

  return eorzeaTimeHour + ":00";
}

export const convertToNearestRealIntervalStart = (time: number) => {
  const result = time - (time % EORZEA_8_HOUR);

  return new Date(result);
};
