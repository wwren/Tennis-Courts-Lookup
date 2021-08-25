import "./HeroBanner.css";
import { Row, Col } from "antd";

export function HeroBanner({ weather }) {
  return (
    <div className="herobanner">
      <div className="weather_today"></div>
      <div className="weather_week"></div>
    </div>
  );
}
