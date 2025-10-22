import { useTranslation } from "react-i18next";
import type { CapitalsInterface } from "../../interfaces/interface.interfaces";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { CurrentWeatherAPI } from "../../services/currentWeather";
import ErrorPage from "../templates/errorPage";
import { IoLocation } from "react-icons/io5";
import { useEffect, useState } from "react";
import { getAirDetection, getTodayDateInfo } from "../../functions/functions";
import SkeletonText from "./skeletonText";
import type { DateType } from "../../types/types.type";

interface Props {
  capital: CapitalsInterface | null;
}

const Current = ({ capital }: Props) => {
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["CurrentWeather"],
    queryFn: () => CurrentWeatherAPI(capital?.name),
    refetchOnWindowFocus: false,
  });

  const { t, i18n } = useTranslation();
  const [time, setTime] = useState<DateType>();
  const [air, setAir] = useState<{ image: string; name: string }>();
  const lang = (i18n.language === "fa" ? "fa" : "en") as keyof DateType;

  const update = async () => {
    refetch();
    setTime(getTodayDateInfo());
    setAir(getAirDetection(String(data?.data?.[0]?.weather?.code)));
  };

  useEffect(() => {
    update();
    const timer = setInterval(update, 10 * 1000);
    return () => clearInterval(timer);
  }, [capital]);

  useEffect(() => {
    setAir(getAirDetection(String(data?.data?.[0]?.weather?.code)));
  }, [data?.data?.[0]?.weather?.code]);

  if (error) return <ErrorPage />;

  if (isLoading || isFetching)
    return (
      <Box
        sx={(theme) => ({
          height: "234px",
          bgcolor: theme.palette.mode === "dark" ? "#292F45" : "#E1E9EE",

          borderRadius: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: "24px",
        })}
      >
        <Box
          sx={{
            // border: "solid",
            width: "50%",
            height: "100%",
          }}
        >
          <Box
            sx={{
              width: "fit-content",
              height: "40px",
              display: "flex",
              px: "13px",
              alignItems: "center",
              bgcolor: "#CDD9E0",
              color: "#3D4852",
              borderRadius: "50px",
              gap: 1,
            }}
          >
            <IoLocation />
            <Typography>{capital?.[lang]}</Typography>
          </Box>
          <Typography variant="h5" component="p" sx={{ mt: 1.5 }}>
            {time?.[lang]?.weekday}
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{ mt: "3px", fontSize: 14 }}
          >
            {time?.[lang]?.time} {time?.[lang]?.day} {time?.[lang]?.monthName}
            {time?.[lang]?.year}
          </Typography>
          <SkeletonText style={{ width: 40, height: 35, mt: 0.5 }} />

          <Typography
            variant="h6"
            component="p"
            sx={{
              mt: "3px",
              fontSize: 14,
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {t("WindSped")}
            <SkeletonText
              style={{ width: 40, height: 20, display: "inline-block" }}
            />
          </Typography>
        </Box>

        <Box
          sx={{
            // border: "solid",
            width: "50%",
            height: "100%",
          }}
        >
          <SkeletonText
            style={{ width: "110", height: "110px", display: "block" }}
          />
          <SkeletonText
            style={{
              mt: 0.5,
              width: "full-content",
              height: 35,
              display: "block",
            }}
          />
          <Typography
            variant="h6"
            component="p"
            sx={{
              mt: 0.5,
              fontSize: 12,
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            {t("FeelsLike")}
            <SkeletonText
              style={{ width: 40, height: 20, display: "inline-block" }}
            />
          </Typography>
        </Box>
      </Box>
    );

  return (
    <Box
      sx={(theme) => ({
        height: "234px",
        bgcolor: theme.palette.mode === "dark" ? "#292F45" : "#E1E9EE",

        borderRadius: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: "24px",
      })}
    >
      <Box
        sx={{
          // border: "solid",
          width: "50%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            width: "fit-content",
            height: "40px",
            display: "flex",
            px: "13px",
            alignItems: "center",
            bgcolor: "#CDD9E0",
            color: "#3D4852",
            borderRadius: "50px",
            gap: 1,
          }}
        >
          <IoLocation />
          <Typography>{capital?.[lang]}</Typography>
        </Box>
        <Typography variant="h5" component="p" sx={{ mt: 1.5 }}>
          {time?.[lang]?.weekday}
        </Typography>
        <Typography variant="h6" component="p" sx={{ mt: "3px", fontSize: 14 }}>
          {time?.[lang]?.time} {time?.[lang]?.day} {time?.[lang]?.monthName}
          {time?.[lang]?.year}
        </Typography>
        <Typography variant="h5" component="p" sx={{ mt: 1.5 }}>
          {data?.data?.[0]?.temp} ° C
        </Typography>

        <Typography variant="h6" component="p" sx={{ mt: "3px", fontSize: 14 }}>
          {t("WindSped")} {data?.data?.[0]?.wind_spd}
        </Typography>
      </Box>

      <Box
        sx={{
          // border: "solid",
          width: "50%",
          height: "100%",
        }}
      >
        <Box
          component="img"
          src={air?.image}
          // alt={air?.name ?? ""}
          sx={{
            height: "110px",
            width: "110px",
            objectFit: "contain",
            mx: "auto",
            border: "0px",
          }}
        />

        <Typography
          variant="h5"
          component="p"
          sx={{ mt: 1.5, textAlign: "center" }}
        >
          {t(String(air?.name))}
        </Typography>
        <Typography
          variant="h6"
          component="p"
          sx={{
            mt: 0.5,
            fontSize: 12,
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          {t("FeelsLike")} {data?.data?.[0].app_temp}
        </Typography>
      </Box>
    </Box>
  );
};

export default Current;
