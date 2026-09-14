export type Weather = {
  current: {
    temperature: number;
    apparent_temperature: number;
    wind_speed: number;
    weather_code: number;
  };

  daily: {
    date: string;
    temperature_min: number;
    temperature_max: number;
    weather_code: number;
  }[];
};