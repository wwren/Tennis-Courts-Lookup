require("dotenv").config();

const SYDNEY_LAT = -33.7215;
const SYDNEY_LON = 150.8508;

export const getWeathers = async function () {
  const data = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${SYDNEY_LAT}5&lon=${SYDNEY_LON}&exclude=hourly&units=metric&appid=${process.env.REACT_APP_WEATHER_API}`
  )
    .then((response) => response.json())
    .then((data) => data);

  const nextWeekRaw = data.daily;
  let nextWeekFormat = nextWeekRaw.map(({ dt, sunrise, sunset, feels_like, wind_speed, weather }) => ({
    dtRaw: dt,
    dt: dateReadable(dt),
    sunrise: timeReadable(sunrise),
    sunset: timeReadable(sunset),
    feels_like,
    wind_speed,
    weather,
  }));
  return nextWeekFormat;
};

const dateReadable = function (unixDateTime) {
  let date = new Date(unixDateTime * 1000).toDateString({ hour12: true });
  return date;
};

const timeReadable = function (unixDateTime) {
  let time = new Date(unixDateTime * 1000).toLocaleTimeString({
    hour12: true,
  });
  return time;
};
