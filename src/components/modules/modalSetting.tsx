import {
  Box,
  Modal,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { RxExit } from "react-icons/rx";
import { useColorMode } from "../../context/ThemeContext";
import { IoMoonOutline } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}
const ModalSetting = ({ setOpen, open }: Props) => {
  const { t, i18n } = useTranslation();
  const lastTheme = localStorage.getItem("lastTheme") as
    | "light"
    | "dark"
    | null;
  const [language, setLanguage] = useState<string>(i18n.language);
  const [mode, setMode] = useState<"light" | "dark">(lastTheme ?? "light");
  const { toggleColorMode } = useColorMode();
  const theme = useTheme();
  const navigate = useNavigate();

  const LanguageHandler = (
   _e: React.MouseEvent<HTMLElement>,
    newLang: string
  ) => {
    if (newLang && newLang !== language) {
      i18n.changeLanguage(newLang);
      document.dir = newLang === "fa" ? "rtl" : "ltr";
      setLanguage(newLang);
    }
  };

  const ThemeHandler = (
    _e: React.MouseEvent<HTMLElement>,
    newMode: "light" | "dark" | null
  ) => {
    if (newMode && newMode !== theme.palette.mode) {
      toggleColorMode();
      setMode(newMode);
    }
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)} sx={{}}>
      <Box
        sx={{
          position: "absolute",
          top: 200,
          insetInlineEnd: -86,
          bgcolor: theme.palette.mode === "dark" ? "#292F45" : "#FFFFFF",
          transform: "translate(-50%, -50%)",
          width: "220px",
          height: "240px",
          borderRadius: "8px",
          boxShadow: 24,
          px: 2,
          py: 1,
        }}
      >
        <Box
          sx={{
            boxShadow: "0px 1px 0px rgba(0,0,0,0.2)",
            pb: 2,
            mb: 1,
            width: "fit-content",
            mx: "auto",
          }}
        >
          <Typography variant="h6" component="p" mb={1}>
            {t("Mode")}
          </Typography>
          <ToggleButtonGroup
            color="primary"
            value={mode}
            exclusive
            onChange={ThemeHandler}
            aria-label="theme-mode"
            sx={{
              mx: "auto",
              border: "1px solid #1976d2",
              height: "33px",
              width: "167px",
            }}
          >
            <ToggleButton
              sx={{
                width: "50%",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
              value="dark"
            >
              <IoMoonOutline /> {t("Dark")}
            </ToggleButton>
            <ToggleButton
              sx={{
                width: "50%",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
              value="light"
            >
              <LuSun />
              {t("Light")}
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box
          sx={{
            boxShadow: "0px 1px 0px rgba(0,0,0,0.2)",
            pb: 2,
            mb: 1,
            width: "fit-content",
            mx: "auto",
          }}
        >
          <Typography variant="h6" component="p" mb={1}>
            {t("language")}
          </Typography>

          <ToggleButtonGroup
            color="primary"
            value={language}
            exclusive
            onChange={LanguageHandler}
            aria-label="language switcher"
            sx={{
              mx: "auto",
              border: "1px solid #1976d2",
              borderRadius: "8px",
              overflow: "hidden",
              height: 36,
              width: 170,
            }}
          >
            <ToggleButton sx={{ width: "50%" }} value="fa">
              {t("Farsi")}
            </ToggleButton>
            <ToggleButton sx={{ width: "50%" }} value="en">
              {t("English")}
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            cursor: "pointer",
            px: 1,
            borderRadius: 1,
            transition: "0.2s",
            "&:hover": {
              bgcolor: "action.hover",
            },
          }}
          onClick={() => {
            localStorage.removeItem("name");
            navigate("/login", { replace: true });
          }}
        >
          <RxExit size={22} />
          <Typography variant="subtitle1" component="p">
            {t("Exit")}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalSetting;
