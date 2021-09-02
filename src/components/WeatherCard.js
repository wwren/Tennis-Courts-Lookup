import { useEffect, useState } from "react";

export function WeatherCard({ weather, isToday, handleClick }) {
  const [date, setDate] = useState("");
  const [icon, setIcon] = useState("");
  const [temp, setTemp] = useState("");

  // useEffect(() => {
  //   if (weather.dt) {
  //     let day = weather.dt.split(" ")[2];
  //     let month = weather.dt.split(" ")[1];
  //     let dayInWeek = weather.dt.split(" ")[0];
  //     setDate(`${dayInWeek}, ${day} ${month}`);
  //   }
  //   if (weather.weather) {
  //     console.log("icon", weather.weather[0].icon);
  //     setIcon(weather.weather[0].icon);
  //   }

  //   if (weather.sunrise && weather.sunset) {
  //     let day = isDay(weather.sunset, weather.sunrise);
  //     day ? setTemp(weather.feels_like.day) : setTemp(weather.feels_like.night);
  //   }
  // }, [weather.dt, weather.weather, weather.sunrise, weather.sunset]);

  useEffect(() => {
    if (weather.dt) {
      let day = weather.dt.split(" ")[2];
      let month = weather.dt.split(" ")[1];
      let dayInWeek = weather.dt.split(" ")[0];
      setDate(`${dayInWeek}, ${day} ${month}`);
    }
    if (weather.weather) {
      setIcon(weather.weather[0].icon);
    }

    if (weather.sunrise && weather.sunset) {
      let day = isDay(weather.sunset, weather.sunrise);
      day ? setTemp(weather.feels_like.day) : setTemp(weather.feels_like.night);
    }
  }, [weather]);

  return (
    <>
      <div
        className={`weather ${isToday ? "today" : "week"}`}
        id={weather.dtRaw}
        onClick={(e) => handleClick(e)}
      >
        <div className="image">
          <img
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={icon}
          ></img>
        </div>
        <div className="location">
          <span className="iconify" data-icon="carbon:location-current"></span>
          <span>Glebe, NSW</span>
        </div>
        <div>
          <span className="iconify" data-icon="uil:calender"></span>
          <span>{date}</span>
        </div>
        <div>
          <span className="iconify" data-icon="wi:thermometer"></span>
          <span>{temp} ℃</span>
        </div>
        <div>
          <span className="iconify" data-icon="icon-park-outline:wind"></span>
          <span>{weather.wind_speed} metre/sec</span>
        </div>
      </div>
    </>
  );
}

const isDay = function (sunset, sunrise) {
  let dateTimeNow = new Date().toLocaleString({ hour12: true });
  let timeNow = dateTimeNow.split(",")[1].trim();
  // only compare hour
  // return true if is day otherwise false if is night
  let hrNow = convertTo24(timeNow).split(":")[0];
  let hrSunset = convertTo24(sunset).split(":")[0];
  let hrSunrise = convertTo24(sunrise).split(":")[0];
  if (
    parseInt(hrNow) <= parseInt(hrSunset) &&
    parseInt(hrNow) >= parseInt(hrSunrise)
  ) {
    return true;
  } else {
    return false;
  }
};

const convertTo24 = function (time) {
  if (
    time.indexOf("AM") > -1 ||
    time.indexOf("am") > -1 ||
    (time.indexOf("PM") > -1 && time.split(":")[0] === "12")
  ) {
    return time.split(" ")[0];
  } else {
    let hr = parseInt(time.split(":")[0]);
    let noPM = time.split(" ")[0].split(":");
    noPM.splice(0, 1, (hr + 12).toString());
    return noPM.join(":");
  }
};
