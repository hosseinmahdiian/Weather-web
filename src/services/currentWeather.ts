import { BaseAxios } from "./axios";

export const CurrentWeatherAPI = async (city: string = "Tehran") => {
  const res = await BaseAxios.get(`/current`, {
    params: {
      city,
    },
  });

  return res.data;
};
