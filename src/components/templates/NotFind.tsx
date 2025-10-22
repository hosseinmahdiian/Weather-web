import { Box, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Layout from "../layout/layout";

const NotFound = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  return (
    <Layout>
      <Box
        sx={{
          height: "fit-content",
          width: "fit-content",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          position: "absolute",
          inset: 0,
          m: "auto",
        }}
      >
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {t("PageNotFound")}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, textAlign: "justify" }}>
            {t("PageNotFoundDescription")}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 4, borderRadius: 2, px: 4, py: 1.5 }}
            onClick={() => navigate("/")}
          >
            {t("BackToHome")}
          </Button>
        </Container>
      </Box>
    </Layout>
  );
};

export default NotFound;
