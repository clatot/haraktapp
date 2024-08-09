"use client";

import {
  WeatherChunk,
  convertToNearestEorzeanIntervalStart,
  convertToNearestRealIntervalStart,
} from "@/utils/WeatherChunkFunction";
import { weatherData } from "@/utils/weatherData";
import { useEffect, useState } from "react";

type Weather = {
  name: string;
  rate: number;
};

type WeatherInfo = {
  time: string;
  irlTime: string;
  currentWeather: string;
  previousWeather: string;
};

export default function WeatherList() {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [determinedWeather, setDeterminedWeather] = useState<WeatherInfo[]>([]);

  useEffect(() => {
    const checkAndRefresh = () => {
      const currentTime = Date.now();
      const eorzeanHoursFromEpoch = currentTime / EORZEA_HOUR;
      const eorzeaTimeHour =
        (eorzeanHoursFromEpoch - (eorzeanHoursFromEpoch % 8)) % 24;

      if (
        eorzeaTimeHour === 0 ||
        eorzeaTimeHour === 8 ||
        eorzeaTimeHour === 16
      ) {
        setCurrentTime(currentTime);
        updateWeather(currentTime);
      }
    };

    const intervalId = setInterval(checkAndRefresh, 5000); // Vérification toutes les 2.5 secs
    // Initial call
    checkAndRefresh();

    return () => clearInterval(intervalId);
  }, []);

  // Durée d'une journée In-game
  const EORZEA_8_HOUR = 8 * 175 * 1000;

  // Durée d'une heure In-game
  const EORZEA_HOUR = 175 * 1000;

  // Filtres
  const filterCurrentWeather: string[] = [];
  const filterPreviousWeather = [""];

  // Options dynamiques
  const loopCount = 100;
  const maxWeatherEntries = 10;

  const updateWeather = (currentTime: number) => {
    const allWeather: { [zone: string]: WeatherInfo[] } = {};

    for (const zone of Object.keys(weatherData)) {
      const weatherDataSelected: Weather[] = weatherData[zone];
      const determinedWeather: WeatherInfo[] = [];

      for (let i = 0; i < loopCount; i++) {
        if (determinedWeather.length >= maxWeatherEntries) {
          break;
        }
        // Initialisation Loop
        let cumulativeChance = 0;
        let currentWeather = "";
        let previousWeather = "";

        // Calcul prériode actuelle
        const timeOffset = currentTime + EORZEA_8_HOUR * i;
        const weatherChunkRate = WeatherChunk(timeOffset);

        // Calcul période précédente
        const previousTimeOffset = timeOffset - EORZEA_8_HOUR;
        const previousWeatherChunkRate = WeatherChunk(previousTimeOffset);

        // Calcul météo actuel
        for (const weather of weatherDataSelected) {
          cumulativeChance += weather.rate;
          if (weatherChunkRate <= cumulativeChance) {
            currentWeather = weather.name;
            break;
          }
        }

        // Calcul météo précédente
        for (const weather of weatherDataSelected) {
          cumulativeChance += weather.rate;
          if (previousWeatherChunkRate <= cumulativeChance) {
            previousWeather = weather.name;
            break;
          }
        }

        // Création objet plus filtr
        if (
          filterCurrentWeather.length === 0 ||
          filterCurrentWeather.includes(currentWeather)
        ) {
          determinedWeather.push({
            time: convertToNearestEorzeanIntervalStart(
              timeOffset
            ).toLocaleString(),
            irlTime:
              convertToNearestRealIntervalStart(timeOffset).toLocaleString(),
            currentWeather,
            previousWeather,
          });
        }
      }

      allWeather[zone] = determinedWeather;
    }
    setDeterminedWeather(determinedWeather);
  };

  // Render
  return (
    <div>
      {Object.keys(determinedWeather).map((zone) => (
        <div key={zone}>
          <h2>{zone.charAt(0).toUpperCase() + zone.slice(1)}</h2>
          <ul>
            {determinedWeather[zone].map((weatherInfo, index) => (
              <li key={index}>
                <strong>{weatherInfo.time}:</strong>{" "}
                {weatherInfo.currentWeather}
                {weatherInfo.previousWeather && (
                  <span> (Before: {weatherInfo.previousWeather})</span>
                )}
                <strong>{weatherInfo.irlTime}</strong>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
