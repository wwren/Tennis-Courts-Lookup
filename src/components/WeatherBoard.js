import { WeatherCard } from "./WeatherCard";

export function WeatherBoard({ weekWeather, handleClick }) {
  return (
    <>
      <div className="weather_board">
        {weekWeather.map((ele) => (
          <WeatherCard
            key={ele.dtRaw}
            weather={ele}
            isToday={false}
            handleClick={handleClick}
          />
        ))}
      </div>
    </>
  );
}
