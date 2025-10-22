import { BaseAxios } from "./axios";

export const DailyForecastAPI = async (city: string = "Tehran") => {
  const res = await BaseAxios.get(`/forecast/daily`, {
    params: {
      city,
      days: 14,
    },
  });

  return res.data;
};
