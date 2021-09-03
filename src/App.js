import { useEffect, useState } from "react";
import "./App.css";
import { getWeathers } from "./api/weatherAPI";
import { getTimetable } from "./api/timetableAPI";
import { HeroBanner } from "./components/HeroBanner";
import { WeatherBoard } from "./components/WeatherBoard";
import { Footer } from "./components/Footer";
import { TimeTable } from "./components/TimeTable";
import { data, locations } from "./apisamples.js";

function App() {
  const [todayWeather, setTodayWeather] = useState({});
  const [weekWeather, setWeekWeather] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [apiDate, setApiDate] = useState("");
  // const [isLoading, setIsLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // MOCK
  useEffect(() => {
    async function fetchData() {
      // weather

      setTodayWeather(data[0]);
      setWeekWeather(data.slice(1));
      // timetable
      setLocationList(locations);
    }
    fetchData();
  }, []);

  const handleClick = (e) => {
    console.log(e.target);
  };

  // // =================================================================
  // // Helper function to format date to an api accepted format
  // // =================================================================
  // const apiFormatDate = (d) => {
  //   let year = d.getFullYear();
  //   let date = d.getDate();
  //   let month = d.getMonth() + 1;
  //   return `${year}-${month}-${date}`;
  // };

  // // =================================================================
  // // Function to update apiDate state
  // // =================================================================
  // const handleClick = (e) => {
  //   setIsLoading(true);
  //   let closestWrapper = e.target.closest(".weather");

  //   if (!isNaN(closestWrapper.id)) {
  //     let dateOnFocus = parseInt(closestWrapper.id);
  //     let date = apiFormatDate(new Date(dateOnFocus * 1000));
  //     console.log("dateOnFocus", date);
  //     setApiDate(date);
  //   }
  // };

  // // =================================================================
  // // Calling Weather API & Timetable API
  // // =================================================================
  // useEffect(() => {
  //   async function fetchData() {
  //     // weather
  //     let weather = await getWeathers();
  //     setTodayWeather(weather[0]);
  //     setWeekWeather(weather.slice(1));
  //     // timetable
  //     let date = apiFormatDate(new Date());
  //     let location = await getTimetable(date);
  //     setIsLoading(false);

  //     setLocationList(location);
  //   }
  //   fetchData();
  // }, []);

  // // =================================================================
  // //  Call Timetable API every time weather card is clicked on
  // // =================================================================
  // useEffect(() => {
  //   async function fetchData() {
  //     let location = await getTimetable(apiDate);
  //     setIsLoading(false);
  //     setLocationList(location);
  //   }
  //   fetchData();
  // }, [apiDate]);

  return (
    <>
      <HeroBanner todayWeather={todayWeather} handleClick={handleClick} />
      <WeatherBoard weekWeather={weekWeather} handleClick={handleClick} />
      <TimeTable locations={locationList} isLoading={isLoading} />
      <Footer />
    </>
  );
}

export default App;
