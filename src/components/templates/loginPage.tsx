import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
  type SelectChangeEvent,
} from "@mui/material";
import image1 from "../../../public/images/Sun cloud angled rain.png";
import image2 from "../../../public/images/Moon cloud mid rain.png";
import image3 from "../../../public/images/Moon cloud fast wind.png";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const LogInPage = () => {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState<string>("");
  const [language, setLanguage] = useState<string>(i18n.language);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const nextLang = language === "fa" ? "fa" : "en";
    i18n.changeLanguage(nextLang);
    document.dir = nextLang === "fa" ? "rtl" : "ltr";
  }, [language]);

  useEffect(() => {
    const name: string | null = localStorage.getItem("name");
    if (name) {
      navigate("/");
    }
  }, []);

  const handleLogin = () => {
    if (name.trim()) {
      localStorage.setItem("name", name);
      navigate("/", { replace: true });
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: theme.palette.mode === "dark" ? "#151D32" : "#F3FAFE",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: { md: 960, xs: "100%" },
          height: { md: 560, xs: "100%" },
          display: "flex",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: 3,
        }}
      >
        <Box
          sx={{
            width: 454,
            bgcolor: theme.palette.mode === "dark" ? "#404961" : "#D3E1E7",
            display: { xs: "none", md: "block" },
            position: "relative",
          }}
        >
          <div className="absolute top-23 right-9 w-60 h-40 rounded-[50%] showClouds "></div>
          <img
            src={image2}
            alt="Moon cloud mid rain"
            className="absolute top-14 right-11 w-49 "
          />
          <div className="absolute top-48 left-5 w-60 h-40 rounded-[50%] showClouds  "></div>
          <img
            src={image1}
            alt="Sun cloud angled rain"
            className="absolute top-40 left-9 w-49 "
          />
          <div className="absolute bottom-13 right-9 w-60 h-40 rounded-[50%] showClouds"></div>
          <img
            src={image3}
            alt="Moon cloud fast wind"
            className="absolute bottom-15 right-11 w-49 "
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: theme.palette.mode === "dark" ? "#292F45" : "#FFFFFF",
            p: 4,
            position: "relative",
          }}
        >
          <Typography variant="h4" component="h2" mb={4}>
            {t("Login")}
          </Typography>

          <TextField
            fullWidth
            variant="outlined"
            label={t("inputLogin")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 4 }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          />

          <Button
            variant="contained"
            sx={{
              width: "100%",
              height: 50,
              bgcolor: "#2196F3",
              color: "#FFFFFF",
            }}
            disabled={name.trim() == ""}
            onClick={() => {
              handleLogin();
            }}
          >
            {t("Login")}
          </Button>

          <FormControl fullWidth sx={{ mt: 4 }}>
            <InputLabel id="language-select-label"> {t("language")}</InputLabel>
            <Select
              labelId="language-select-label"
              value={language}
              label={t("language")}
              onChange={(e: SelectChangeEvent) => {
                setLanguage(e.target.value as string);
              }}
            >
              <MenuItem value={"en"}>{t("English")}</MenuItem>
              <MenuItem value={"fa"}>{t("Farsi")}</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

export default LogInPage;
