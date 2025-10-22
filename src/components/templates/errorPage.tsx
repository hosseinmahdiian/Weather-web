import { Box, Typography, Container } from "@mui/material";
import { useTranslation } from "react-i18next";

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          {t("ErrorOccurred")}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, textAlign: "justify" }}>
          {t(
            "ErrorDescription",
            "متاسفیم، مشکلی در بارگذاری اطلاعات رخ داده است. لطفاً بعداً دوباره تلاش کنید."
          )}
        </Typography>
      </Container>
    </Box>
  );
};

export default ErrorPage;
