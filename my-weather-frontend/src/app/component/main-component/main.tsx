"use client";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react/react.cjs";
import "./style-main.css";
import { useEffect, useRef } from "react";
import { scene } from "./Scene";

const GET_WEATHER = gql`
  query getWeather($location: String!) {
    getWeather(location: $location) {
      name
      weather {
        main
        description
      }
      clouds {
        all
      }
      visibility
      timezone
      wind {
        speed
        deg
        gust
      }
      sys {
        type
        id
        country
        sunset
        sunrise
      }
      coord {
        lon
        lat
      }
    }
  }
`;




export default function Home() {
  const location = "Kosovo";
  const { data, loading, error } = useQuery(GET_WEATHER, {
    variables: { location },
  });

  const canvasRef = useRef(null);

  useEffect(() => {
    const cleanup = scene(canvasRef.current);
    return cleanup;
  }, []);

    


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const weather = data.getWeather;

  return (
    <div className="main-div">
      <div
        ref={canvasRef}
        className="canvas"
        style={{
          position: "absolute",
        }}
      ></div>
      <div className="card">
        <h1>Weather</h1>
        <p>City: {weather.name}</p>
        <p>Timezone: {weather.timezone}</p>
        <p>Sunset: {weather.sys.sunset}</p>
        <p>Sunrise: {weather.sys.sunrise}</p>

        <div className="grid_wind_clouds">
          <div className="clouds">
            <div>
              <img src="/clouds.png" alt="clouds" />
            </div>
            <div>{weather.clouds.all}</div>
          </div>

          <div className="wind">
            <div className="windLogo">
              <img src="/wind.png" alt="wind" />
            </div>
            <div>
              <p>Speed: {weather.wind.speed}</p>
              <p>Deg: {weather.wind.deg}</p>
              <p>Gust: {weather.wind.gust}</p>
            </div>
          </div>
        </div>

        <div className="conditions">
          <p>
            Conditions: {weather.weather[0].main} –{" "}
            {weather.weather[0].description} ({weather.visibility})
          </p>
        </div>

        <p>Lon: {weather.coord.lon}</p>
        <p>Lat: {weather.coord.lat}</p>
      </div>

    </div>
  );
}
