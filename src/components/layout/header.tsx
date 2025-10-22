import { Box, Container, IconButton, Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import logo from "../../../public/images/logo.png";
import { useTranslation } from "react-i18next";
import type { CapitalsInterface } from "../../interfaces/interface.interfaces";
import type React from "react";
import { SlSettings } from "react-icons/sl";
import { useEffect, useState } from "react";
import ModalSetting from "../modules/modalSetting";
import SearchCapitals from "../modules/searchCapitals";

interface Props {
  setCapital: React.Dispatch<React.SetStateAction<CapitalsInterface | null>>;
  capital: CapitalsInterface | null;
}
const Header = ({ setCapital, capital }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const nextLang = i18n.language;
    document.dir = nextLang === "fa" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <Box
      sx={(theme) => ({
        bgcolor: theme.palette.mode === "dark" ? "#151D32" : "#F3FAFE",
        height: 80,
        position: "relative",
        alignItems: "center",
        display: "flex",

        boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        px: 3,
      })}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            width: "fit-content",
          }}
        >
          <Avatar src={logo} sizes="56" sx={{ height: 56, width: 56 }} />
          <Typography>{t("LogoTitle")} </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            position: "relative",
          }}
        >
          <SearchCapitals
            setCapital={setCapital}
            capital={capital}
            style={{ width: 295, display: { xs: "none", sm: "block" } }}
          />

          <IconButton
            onClick={() => setOpen(true)}
            sx={(theme) => ({
              border: "1px solid",
              borderColor:
                theme.palette.mode === "dark" ? "grey.700" : "grey.400",
              p: 1,
              borderRadius: 2,
              width: 40,
              height: 40,
              transition: "0.3s",
              "&:hover": {
                color: "blue.500",
                borderColor:
                  theme.palette.mode === "dark" ? "grey.700" : "grey.400",
              },
            })}
          >
            <SlSettings />
          </IconButton>
          {open && <ModalSetting open={open} setOpen={setOpen} />}
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
