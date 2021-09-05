import { useEffect, useRef, useState } from "react";
import "./App.css";
import { getWeathers } from "./api/weatherAPI";
import { getTimetable } from "./api/timetableAPI";
import { HeroBanner } from "./components/HeroBanner";
import { WeatherBoard } from "./components/WeatherBoard";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import { TimeTable } from "./components/TimeTable";
// import { data, locations } from "./apisamples.js";

function App() {
  const [todayWeather, setTodayWeather] = useState({});
  const [weekWeather, setWeekWeather] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const focus = useRef("");
  const [apiDate, setApiDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // // =================================================================
  // // Mock
  // // =================================================================
  // const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   async function fetchData() {
  //     // weather
  //     setTodayWeather(data[0]);
  //     setWeekWeather(data.slice(1));
  //     // timetable
  //     setLocationList(locations);
  //   }
  //   fetchData();
  //   // set initial focus
  //   setFocusEffect(data[0].dtRaw);
  // }, []);

  // const handleClick = (e) => {
  //   let closestWrapper = e.target.closest(".weather");
  //   if (!isNaN(closestWrapper.id)) {
  //     setFocusEffect(closestWrapper.id);
  //   }
  // };

  // =================================================================
  //  Helper function - Set focus effect
  // =================================================================
  const setFocusEffect = (eleId) => {
    let prevFocus = document.getElementById(focus.current);
    if (prevFocus) {
      prevFocus.classList.remove("focus");
    }

    focus.current = eleId;
    let focusEle = document.getElementById(focus.current);
    if (focusEle) {
      focusEle.classList.add("focus");
    } else {
    }
  };

  // =================================================================
  // Helper function to format date to an api accepted format
  // =================================================================
  const apiFormatDate = (d) => {
    let year = d.getFullYear();
    let date = d.getDate();
    let month = d.getMonth() + 1;
    return `${year}-${month}-${date}`;
  };

  // =================================================================
  // Function to update apiDate state
  // =================================================================
  const handleClick = (e) => {
    setIsLoading(true);
    let closestWrapper = e.target.closest(".weather");

    if (!isNaN(closestWrapper.id)) {
      let dateOnFocus = parseInt(closestWrapper.id);
      let date = apiFormatDate(new Date(dateOnFocus * 1000));
      setApiDate(date);
      setFocusEffect(closestWrapper.id);
    }
  };

  // =================================================================
  // Calling Weather API & Timetable API
  // =================================================================
  useEffect(() => {
    async function fetchData() {
      // weather
      let weather = await getWeathers();
      setTodayWeather(weather[0]);
      setWeekWeather(weather.slice(1));
      // timetable
      let date = apiFormatDate(new Date());
      let location = await getTimetable(date);
      setIsLoading(false);
      setLocationList(location);
      // set initial focus
      setFocusEffect(weather[0].dtRaw);
    }
    fetchData();
  }, []);

  // =================================================================
  //  Call Timetable API every time weather card is clicked on
  // =================================================================
  useEffect(() => {
    async function fetchData() {
      let location = await getTimetable(apiDate);
      setIsLoading(false);
      setLocationList(location);
    }
    fetchData();
  }, [apiDate]);

  return (
    <>
      <Nav />
      <HeroBanner todayWeather={todayWeather} handleClick={handleClick} />
      <WeatherBoard weekWeather={weekWeather} handleClick={handleClick} />
      <TimeTable locations={locationList} isLoading={isLoading} />
      <Footer />
    </>
  );
}

export default App;
