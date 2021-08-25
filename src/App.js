import { useEffect, useState } from "react";
import "./App.css";
import { getWeathers } from "./api/weatherAPI";
import { HeroBanner } from "./components/HeroBanner";

const data = [
  {
    dt: "Wed Aug 25 2021",
    feels_like: {
      day: 10.67,
      night: 9.36,
      eve: 12.76,
      morn: 4.56,
    },
    wind_speed: 8.04,
    weather: [
      {
        id: 500,
        main: "Rain",
        description: "light rain",
        icon: "10d",
      },
    ],
  },
  {
    dt: "Thu Aug 26 2021",
    feels_like: {
      day: 14.03,
      night: 10.87,
      eve: 13.07,
      morn: 6.39,
    },
    wind_speed: 2.9,
    weather: [
      {
        id: 803,
        main: "Clouds",
        description: "broken clouds",
        icon: "04d",
      },
    ],
  },
  {
    dt: "Fri Aug 27 2021",
    feels_like: {
      day: 15.23,
      night: 10.2,
      eve: 13.37,
      morn: 9.29,
    },
    wind_speed: 5.26,
    weather: [
      {
        id: 803,
        main: "Clouds",
        description: "broken clouds",
        icon: "04d",
      },
    ],
  },
  {
    dt: "Sat Aug 28 2021",
    feels_like: {
      day: 15.94,
      night: 10.63,
      eve: 14.93,
      morn: 10.2,
    },
    wind_speed: 3.04,
    weather: [
      {
        id: 500,
        main: "Rain",
        description: "light rain",
        icon: "10d",
      },
    ],
  },
  {
    dt: "Sun Aug 29 2021",
    feels_like: {
      day: 14.32,
      night: 11.03,
      eve: 18.48,
      morn: 8.93,
    },
    wind_speed: 3.91,
    weather: [
      {
        id: 500,
        main: "Rain",
        description: "light rain",
        icon: "10d",
      },
    ],
  },
  {
    dt: "Mon Aug 30 2021",
    feels_like: {
      day: 14.87,
      night: 10.52,
      eve: 18.82,
      morn: 7.14,
    },
    wind_speed: 3.29,
    weather: [
      {
        id: 800,
        main: "Clear",
        description: "clear sky",
        icon: "01d",
      },
    ],
  },
  {
    dt: "Tue Aug 31 2021",
    feels_like: {
      day: 16.29,
      night: 10.97,
      eve: 18.22,
      morn: 9.17,
    },
    wind_speed: 4.34,
    weather: [
      {
        id: 802,
        main: "Clouds",
        description: "scattered clouds",
        icon: "03d",
      },
    ],
  },
  {
    dt: "Wed Sep 01 2021",
    feels_like: {
      day: 16.03,
      night: 12.28,
      eve: 18.16,
      morn: 9.4,
    },
    wind_speed: 4.03,
    weather: [
      {
        id: 500,
        main: "Rain",
        description: "light rain",
        icon: "10d",
      },
    ],
  },
];

function App() {
  const [todayWeather, setTodayWeather] = useState({});
  const [weekWeather, setWeekWeather] = useState([]);

  // =========================================
  // Calling Weather API
  // =========================================
  // useEffect(async () => {
  //   let data = await getWeathers();
  //   console.log("data", data);
  //   setTodayWeather(data[0]);
  //   setFutureWeather(data.slice(1));
  // }, []);

  // mock calling data
  useEffect(async () => {
    setTodayWeather(data[0]);
    setWeekWeather(data.slice(1));
  }, []);

  // Manage Available court API - call it once change date

  return (
    <>
      <HeroBanner weather={todayWeather} />
    </>
  );
}

export default App;
