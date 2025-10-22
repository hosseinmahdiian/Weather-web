import { createContext, useMemo, useState, useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getDesignTokens } from "./theme";
import type { ChildrenType } from "../types/types.type";
import { useTranslation } from "react-i18next";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useColorMode = () => useContext(ColorModeContext);

export const CustomThemeProvider = ({ children }: ChildrenType) => {
  const { i18n } = useTranslation();
  const lastTheme = localStorage.getItem("lastTheme") as
    | "light"
    | "dark"
    | null;

  const [mode, setMode] = useState<"light" | "dark">(lastTheme ?? "light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => {
          const nextMode = prev === "light" ? "dark" : "light";
          localStorage.setItem("lastTheme", nextMode);
          return nextMode;
        });
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        ...getDesignTokens(mode),
        direction: i18n?.language === "fa" ? "rtl" : "ltr",
        typography: {
          fontFamily:
            i18n?.language === "fa"
              ? '"IranSans", sans-serif'
              : '"Roboto", sans-serif',
        },
      }),
    [mode, i18n?.language]
  );

  const cache = useMemo(() => {
    return createCache({
      key: "mui",
      stylisPlugins:
        i18n?.language === "fa" ? [prefixer, rtlPlugin] : [prefixer],
    });
  }, [i18n?.language]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </CacheProvider>
    </ColorModeContext.Provider>
  );
};
