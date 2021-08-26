import "./HeroBanner.css";

import { WeatherCard } from "./WeatherCard";

export function HeroBanner({ todayWeather }) {
  return (
    <div className="herobanner">
      <div className="weather_today_container">
        <WeatherCard weather={todayWeather} isToday={true} />
      </div>
    </div>
  );
}
