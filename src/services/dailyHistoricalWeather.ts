import { BaseAxios } from "./axios";

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const DailyHistoricalWeatherAPI = async (city: string = "Tehran") => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 6);

  const res = await BaseAxios.get(`/history/daily`, {
    params: {
      city,
      start_date: formatDate(startDate),
      end_date: formatDate(endDate),
    },
  });
  // console.log(res.data);

  return res.data;
};
