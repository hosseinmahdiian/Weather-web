import { useTranslation } from "react-i18next";
import type { CapitalsInterface } from "../../interfaces/interface.interfaces";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { DailyForecastAPI } from "../../services/dailyForecast";
import { Box, Typography } from "@mui/material";
import ErrorPage from "../templates/errorPage";
import Card from "./card";
import SkeletonText from "./skeletonText";
interface Props {
  capital: CapitalsInterface | null;
}

const Forecasts = ({ capital }: Props) => {
  const { t } = useTranslation();
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["DailyForecast"],
    queryFn: () => DailyForecastAPI(capital?.name),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [capital]);

  if (error) return <ErrorPage />;

  if (isLoading || isFetching)
    return (
      <Box
        sx={(theme) => ({
          height: "374px",
          bgcolor: theme.palette.mode === "dark" ? "#292F45" : "#E1E9EE",
          borderRadius: "24px",
          p: "24px",
        })}
      >
        <Typography variant="h6" component="p" sx={{ mb: 1 }}>
          {t("Forecast")}
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            overflow: "scroll",
            pb: 2,
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {[...Array(14)].map(() => (
            <div>
              <Box
                sx={(theme) => ({
                  height: 266,
                  width: 104,
                  bgcolor:
                    theme.palette.mode === "dark" ? "#3F4861" : "#CDD9E0",
                  borderRadius: "24px",
                  pt: 4,
                })}
              >
                <SkeletonText
                  style={{
                    fontSize: 14,
                    textAlign: "center",
                    width: "40%",
                    mx: "auto",
                  }}
                />

                <SkeletonText
                  style={{
                    mt: 1,
                    fontSize: 14,
                    textAlign: "center",
                    width: "60%",
                    mx: "auto",
                  }}
                />

                <SkeletonText
                  style={{
                    height: 60,
                    width: 60,
                    objectFit: "contain",
                    mx: "auto",
                    mt: 5,
                  }}
                />

                <SkeletonText
                  style={{
                    mt: 5,
                    fontSize: 18,
                    textAlign: "center",
                    width: "60%",
                    mx: "auto",
                  }}
                />
              </Box>
            </div>
          ))}
        </Box>
      </Box>
    );

  return (
    <Box
      sx={(theme) => ({
        height: "374px",
        bgcolor: theme.palette.mode === "dark" ? "#292F45" : "#E1E9EE",
        borderRadius: "24px",
        p: "24px",
      })}
    >
      <Typography variant="h6" component="p" sx={{ mb: 1 }}>
        {t("Forecast")}
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          overflow: "scroll",
          pb: 2,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {data?.data?.map((item: any) => (
          <Card item={item} />
        ))}
      </Box>
    </Box>
  );
};

export default Forecasts;
