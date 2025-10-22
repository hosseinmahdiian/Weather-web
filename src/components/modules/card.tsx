import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getAirDetection, getTodayDateInfo } from "../../functions/functions";
import { Box, Typography } from "@mui/material";

interface Props {
  item: any;
}
type DateInfo = {
  weekday: string;
  monthName: string;
  day: string;
  year: string;
  time: string;
};

type DateType = {
  fa: DateInfo;
  en: DateInfo;
};
const Card = ({ item }: Props) => {
  const { i18n } = useTranslation();
  const lang = (i18n.language === "fa" ? "fa" : "en") as keyof DateType;

  const [air, setAir] = useState<{ image: string; name: string }>();
  const [time, setTime] = useState<DateType>();

  useEffect(() => {
    setAir(getAirDetection(String(item?.weather?.code)));
    setTime(getTodayDateInfo(String(item?.datetime)));
  }, [item?.weather?.code]);

  return (
    <div key={item?.datetime}>
      <Box
        sx={(theme) => ({
          height: 266,
          width: 104,
          bgcolor: theme.palette.mode === "dark" ? "#3F4861" : "#CDD9E0",
          borderRadius: "24px",
        })}
      >
        <Typography
          variant="h6"
          component="p"
          sx={{ pt: 4, fontSize: 14, textAlign: "center" }}
        >
          {time?.[lang]?.weekday}
        </Typography>

        <Typography
          variant="h6"
          component="p"
          sx={{ mt: 0.5, fontSize: 14, textAlign: "center" }}
        >
          {time?.[lang]?.day} {time?.[lang]?.monthName}
        </Typography>

        <Box
          component="img"
          src={air?.image}
          alt={air?.name}
          sx={{
            height: 60,
            width: 60,
            objectFit: "contain",
            mx: "auto",
            mt: 3,
          }}
        />

        <Typography
          variant="h6"
          component="p"
          sx={{ mt: 5, textAlign: "center" }}
        >
          {item?.temp} ° C
        </Typography>
      </Box>
    </div>
  );
};

export default Card;
