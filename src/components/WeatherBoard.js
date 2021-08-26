import { useEffect, useState } from "react";
import { WeatherCard } from "./WeatherCard";

export function WeatherBoard({ weekWeather }) {
  return (
    <>
      <div className="weather_board">
        {weekWeather.map((ele) => (
          <WeatherCard weather={ele} isToday={false} />
        ))}
      </div>
    </>
  );
}
