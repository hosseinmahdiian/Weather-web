import { useTranslation } from "react-i18next";
import type { CapitalsInterface } from "../../interfaces/interface.interfaces";
import { useQuery } from "@tanstack/react-query";
import { DailyHistoricalWeatherAPI } from "../../services/dailyHistoricalWeather";
import { Box, Typography } from "@mui/material";
import ErrorPage from "../templates/errorPage";
import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import SkeletonText from "./skeletonText";
import { getTodayDateInfo, getWeekdaysArray } from "../../functions/functions";

interface Props {
  capital: CapitalsInterface | null;
}

type WeekdaySortType = {
  fa: string[];
  en: string[];
};

const Chart = ({ capital }: Props) => {
  const { t, i18n } = useTranslation();
  const [lowTemp, setLowTemp] = useState([]);
  const [highTemp, setHightTemp] = useState([]);
  const [dates, setDates] = useState([]);
  const [weekdaySort, setWeekdaySort] = useState<WeekdaySortType | null>(null);
  const lang = i18n.language === "fa" ? "fa" : "en";

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["DailyHistoricalWeather"],
    queryFn: () => DailyHistoricalWeatherAPI(capital?.name),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [capital]);

  useEffect(() => {
    setLowTemp(data?.data.map((item: any) => item?.min_temp));
    setHightTemp(data?.data.map((item: any) => item?.max_temp));
    setDates(data?.data.map((item: any) => getTodayDateInfo(item?.datetime)));
  }, [data?.data]);

  useEffect(() => {
    const sorted = getWeekdaysArray(dates);
    setWeekdaySort(sorted);
  }, [dates]);

  console.log(weekdaySort?.[lang]);

  if (error) return <ErrorPage />;

  if (
    isLoading ||
    isFetching ||
    !lowTemp?.length ||
    !highTemp?.length ||
    !dates?.length ||
    !weekdaySort
  )
    return (
      <Box
        sx={{
          height: "234px",
          borderRadius: "24px",
          overflow: "hidden",
        }}
      >
        <SkeletonText style={{ width: "100%", height: "100%" }} />
      </Box>
    );

  return (
    <Box
      sx={(theme) => ({
        height: "234px",
        bgcolor: theme.palette.mode === "dark" ? "#292F45" : "#E1E9EE",
        borderRadius: "24px",
        p: "24px",
      })}
    >
      <Typography variant="h6" component="p" sx={{ fontSize: 16 }}>
        {t("ChartTitle")}
      </Typography>

      <LineChart
        series={[
          { data: lowTemp, label: t("Low") },
          { data: highTemp, label: t("High") },
        ]}
        xAxis={[{ scaleType: "point", data: weekdaySort?.[lang] }]}
      />
    </Box>
  );
};

export default Chart;
