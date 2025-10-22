import { Box, Container, Typography } from "@mui/material";
import { getTodayDateInfo } from "../../functions/functions";
import { useEffect, useState } from "react";
import type { DateType } from "../../types/types.type";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const [time, setTime] = useState<DateType>();
  const { i18n } = useTranslation();

  const lang = (i18n.language === "fa" ? "fa" : "en") as keyof DateType;

  const update = async () => {
    setTime(getTodayDateInfo());
  };

  useEffect(() => {
    update();
    const timer = setInterval(update, 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      dir="rtl"
      sx={(theme) => ({
        direction: "rtl",
        background:
          theme.palette.mode === "dark"
            ? `linear-gradient(
          to right,
          #292F45 0%,     
          #3F4861 50%,    
          #151D32 100%    
        )`
            : `linear-gradient(
          to right,
          #F3FAFE 0%,     
          #CCDDDD 50%,    
          #F3FAFE 100%    
        )`,
        height: "106px",
        position: "absolute",
        alignItems: "center",
        bottom: 0,
        display: "flex",
        width: "100%",
        px: 3,
      })}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          position: "relative",
        }}
      >
        <Typography variant="h5" component="p">
          {time?.[lang]?.weekday}
          {time?.[lang]?.time} {time?.[lang]?.day} {time?.[lang]?.monthName}
          {time?.[lang]?.year}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
