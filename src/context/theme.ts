export const getDesignTokens = (mode: "light" | "dark") => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // 🎨 رنگ‌های حالت روشن
          primary: { main: "#1976d2" },
          secondary: { main: "#9c27b0" },
          background: { default: "#f9f9f9", paper: "#fff" },
          text: { primary: "#111", secondary: "#555" },
        }
      : {
          // 🌑 رنگ‌های حالت تاریک
          primary: { main: "#90caf9" },
          secondary: { main: "#ce93d8" },
          background: { default: "#121212", paper: "#1e1e1e" },
          text: { primary: "#fff", secondary: "#aaa" },
        }),
  },
  typography: {
    fontFamily: "'Vazirmatn', sans-serif",
  },
});
