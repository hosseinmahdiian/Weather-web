import clear from "../../public/images/clear.png";
import cloud from "../../public/images/cludly.png";
import storm from "../../public/images/storm.png";
import Rain from "../../public/images/Rain cloud.png";
import LowRain from "../../public/images/Sun cloud angled rain.png";
import wind from "../../public/images/Moon cloud fast wind.png";
import { capitals } from "../constants/capitals";

export const getTodayDateInfo = (inputDate?: string) => {
  const today = inputDate ? new Date(inputDate) : new Date();

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    numberingSystem: "latn",
  };

  const getParts = (locale: "fa-IR" | "en-US") => {
    const parts = new Intl.DateTimeFormat(locale, options).formatToParts(today);

    let weekday = "",
      monthName = "",
      day = "",
      year = "";
      // hour = "",
      // minute = "";

    parts.forEach((p) => {
      if (p.type === "weekday") weekday = p.value;
      if (p.type === "month") monthName = p.value;
      if (p.type === "day") day = p.value;
      if (p.type === "year") year = p.value;
      // if (p.type === "hour") hour = p.value;
      // if (p.type === "minute") minute = p.value;
    });

    const time = new Intl.DateTimeFormat(locale, {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(today);

    return { weekday, monthName, day, year, time };
  };

  return {
    fa: getParts("fa-IR"),
    en: getParts("en-US"),
  };
};

export const getAirDetection = (code: string) => {
  const numCode = Number(code);

  switch (true) {
    case numCode === 800:
      return { image: clear, name: "Clear" };

    case numCode >= 200 && numCode <= 299:
      return { image: storm, name: "Storm" };

    case numCode >= 300 && numCode <= 399:
      return { image: Rain, name: "Drizzle" };

    case numCode >= 500 && numCode <= 504:
      return { image: LowRain, name: "LightRain" };

    case numCode === 511:
      return { image: Rain, name: "FreezingRain" };

    case numCode >= 520 && numCode <= 531:
      return { image: Rain, name: "ShowerRain" };

    case numCode >= 600 && numCode <= 699:
      return { image: Rain, name: "Snow" };

    case numCode >= 700 && numCode <= 799:
      return { image: wind, name: "Windy" };

    case numCode >= 801 && numCode <= 804:
      return { image: cloud, name: "Cloudy" };

    default:
      console.log("Unknown code:", code);
      return { image: "", name: "NoDetect" };
  }
};

export const findCapital = (capital: string) => {
  const find = capitals.find((item) => capital === item.name);
  return find;
};
