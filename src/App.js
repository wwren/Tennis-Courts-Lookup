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
  const CACHE_MINUTE = 2;
  const [todayWeather, setTodayWeather] = useState({});
  const [weekWeather, setWeekWeather] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const focus = useRef("");
  const [apiDate, setApiDate] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
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
      try {
        // weather api resolve quicker so seperate the resolve
        const weather = await getWeathers();
        setTodayWeather(weather[0]);
        setWeekWeather(weather.slice(1));

        let date = apiFormatDate(new Date());
        const location = await getTimetable(date);
        setIsLoading(false);
        setLocationList(location);
        setFocusEffect(weather[0].dtRaw);

        addToLocalStorage(date, location);
      } catch (e) {
        console.error("On load not fetching API correctly");
      }
    }
    fetchData();
  }, []);

  // =================================================================
  //  Call Timetable API every time weather card is clicked on
  // =================================================================
  useEffect(() => {
    async function fetchData() {
      let storedTimeTable = localStorage.getItem(apiDate)
        ? JSON.parse(localStorage.getItem(apiDate))
        : null;
      if (
        storedTimeTable != null &&
        storedTimeTable.expiration > new Date().getTime()
      ) {
        setIsLoading(false);
        setLocationList(storedTimeTable.items);
      } else {
        let location = await getTimetable(apiDate);
        setIsLoading(false);
        setLocationList(location);

        addToLocalStorage(apiDate, location);
      }
    }

    if (apiDate != undefined) {
      fetchData();
    }
  }, [apiDate]);

  const addToLocalStorage = (apiDate, location) => {
    let locationCache = {
      items: location,
      expiration: new Date().getTime() + CACHE_MINUTE * 60 * 1000,
    };
    localStorage.setItem(apiDate, JSON.stringify(locationCache));
  };

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
