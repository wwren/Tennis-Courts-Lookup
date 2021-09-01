import { useEffect, useState } from "react";
import "./App.css";
import { getWeathers } from "./api/weatherAPI";
import { getTimetable } from "./api/timetableAPI";
import { HeroBanner } from "./components/HeroBanner";
import { WeatherBoard } from "./components/WeatherBoard";
import { TimeTable } from "./components/TimeTable";

// const data = [
//   {
//     dt: "Thu Aug 26 2021",
//     sunrise: "6:23:02 AM",
//     sunset: "5:34:25 PM",
//     feels_like: {
//       day: 14.03,
//       night: 10.87,
//       eve: 13.07,
//       morn: 7.35,
//     },
//     wind_speed: 2.9,
//     weather: [
//       {
//         id: 803,
//         main: "Clouds",
//         description: "broken clouds",
//         icon: "04d",
//       },
//     ],
//   },
//   {
//     dt: "Fri Aug 27 2021",
//     sunrise: "6:21:47 AM",
//     sunset: "5:35:06 PM",
//     feels_like: {
//       day: 15.23,
//       night: 10.2,
//       eve: 13.37,
//       morn: 9.29,
//     },
//     wind_speed: 5.26,
//     weather: [
//       {
//         id: 803,
//         main: "Clouds",
//         description: "broken clouds",
//         icon: "04d",
//       },
//     ],
//   },
//   {
//     dt: "Sat Aug 28 2021",
//     sunrise: "6:20:32 AM",
//     sunset: "5:35:47 PM",
//     feels_like: {
//       day: 15.94,
//       night: 10.63,
//       eve: 14.93,
//       morn: 10.2,
//     },
//     wind_speed: 3.04,
//     weather: [
//       {
//         id: 500,
//         main: "Rain",
//         description: "light rain",
//         icon: "10d",
//       },
//     ],
//   },
//   {
//     dt: "Sun Aug 29 2021",
//     sunrise: "6:19:16 AM",
//     sunset: "5:36:27 PM",
//     feels_like: {
//       day: 14.32,
//       night: 11.03,
//       eve: 18.48,
//       morn: 8.93,
//     },
//     wind_speed: 3.91,
//     weather: [
//       {
//         id: 500,
//         main: "Rain",
//         description: "light rain",
//         icon: "10d",
//       },
//     ],
//   },
//   {
//     dt: "Mon Aug 30 2021",
//     sunrise: "6:17:59 AM",
//     sunset: "5:37:08 PM",
//     feels_like: {
//       day: 14.87,
//       night: 10.52,
//       eve: 18.82,
//       morn: 7.14,
//     },
//     wind_speed: 3.29,
//     weather: [
//       {
//         id: 800,
//         main: "Clear",
//         description: "clear sky",
//         icon: "01d",
//       },
//     ],
//   },
//   {
//     dt: "Tue Aug 31 2021",
//     sunrise: "6:16:42 AM",
//     sunset: "5:37:48 PM",
//     feels_like: {
//       day: 16.29,
//       night: 10.97,
//       eve: 18.22,
//       morn: 9.17,
//     },
//     wind_speed: 4.34,
//     weather: [
//       {
//         id: 802,
//         main: "Clouds",
//         description: "scattered clouds",
//         icon: "03d",
//       },
//     ],
//   },
//   {
//     dt: "Wed Sep 01 2021",
//     sunrise: "6:15:24 AM",
//     sunset: "5:38:29 PM",
//     feels_like: {
//       day: 16.03,
//       night: 12.28,
//       eve: 18.16,
//       morn: 9.4,
//     },
//     wind_speed: 4.03,
//     weather: [
//       {
//         id: 500,
//         main: "Rain",
//         description: "light rain",
//         icon: "10d",
//       },
//     ],
//   },
//   {
//     dt: "Thu Sep 02 2021",
//     sunrise: "6:14:05 AM",
//     sunset: "5:39:09 PM",
//     feels_like: {
//       day: 15.18,
//       night: 10.73,
//       eve: 18.55,
//       morn: 13.55,
//     },
//     wind_speed: 3.61,
//     weather: [
//       {
//         id: 500,
//         main: "Rain",
//         description: "light rain",
//         icon: "10d",
//       },
//     ],
//   },
// ];

// const locations = [
//   {
//     key: "0",
//     facilityName: "Marrickville Lawn",
//     availableSlot: [
//       "08:30",
//       "09:00",
//       "09:30",
//       "12:00",
//       "12:30",
//       "13:00",
//       "18:00",
//       "10:30",
//       "21:00",
//       "21:30",
//     ],
//   },
//   {
//     key: "1",
//     facilityName: "Surry Hills",
//     availableSlot: ["6:00am", "7:00am", "10:00pm"],
//   },
//   {
//     key: "2",
//     facilityName: "Alexandria",
//     availableSlot: [],
//   },
//   {
//     key: "4",
//     facilityName: "Glebe",
//     availableSlot: ["9:00pm"],
//   },
// ];

function App() {
  const [todayWeather, setTodayWeather] = useState({});
  const [weekWeather, setWeekWeather] = useState([]);
  const [locationList, setLocationList] = useState([]);

  // =========================================
  // Calling Weather API & Timetable API
  // =========================================
  useEffect(async () => {
    // weather
    let weather = await getWeathers();
    console.log("weather", weather);
    setTodayWeather(weather[0]);
    setWeekWeather(weather.slice(1));
    // timetable
    let dateNow = new Date();
    let year = dateNow.getFullYear();
    let date = dateNow.getDate();
    let month = dateNow.getMonth() + 1;
    let location = await getTimetable(`${year}-${month}-${date}`);
    console.log("weather", location);
    setLocationList(location);
  }, []);

  // // mock calling data
  // useEffect(async () => {
  //   setTodayWeather(data[0]);
  //   setWeekWeather(data.slice(1));
  //   setLocationList(locations);
  // }, []);

  // Manage Available court API - call it once change date

  return (
    <>
      <HeroBanner todayWeather={todayWeather} />
      <WeatherBoard weekWeather={weekWeather} />
      <TimeTable locations={locationList} />
    </>
  );
}

export default App;
