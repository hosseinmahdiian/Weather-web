import { useEffect, useState } from "react";
import type { CapitalsInterface } from "../../interfaces/interface.interfaces";
import Layout from "../layout/layout";
import SearchCapitals from "../modules/searchCapitals";
import { useNavigate, useSearchParams } from "react-router-dom";
import Current from "../modules/current";
import Chart from "../modules/chart";
import Forecasts from "../modules/forecasts";
import Grid from "@mui/material/Grid";
import { findCapital } from "../../functions/functions";

const MainPage = () => {
  const [searchParams, _setSearchParams] = useSearchParams();

  const [capital, setCapital] = useState<CapitalsInterface | null>(() => {
    const capitalName = searchParams.get("capital");
    const found = capitalName ? findCapital(capitalName) : null;

    return (
      found ?? {
        id: 1,
        fa: "تهران",
        en: "Tehran",
        name: "Tehran",
      }
    );
  });

  const navigate = useNavigate();

  useEffect(() => {
    const name: string | null = localStorage.getItem("name");
    if (!name) {
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <Layout setCapital={setCapital} capital={capital}>
      <SearchCapitals
        setCapital={setCapital}
        capital={capital}
        style={{
          width: "90%",
          display: { xs: "block", sm: "none" },
          mt: 4,
          mx: "auto",
        }}
      />

      <Grid container spacing={2} sx={{ mt: 5, pb: "126px" }}>
        <Grid size={{ xs: 12, md: 6, lg: 5 }}>
          <Current capital={capital} />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 7 }}>
          <Chart capital={capital} />
        </Grid>

        <Grid size={12}>
          <Forecasts capital={capital} />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default MainPage;
