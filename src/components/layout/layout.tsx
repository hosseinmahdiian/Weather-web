import type React from "react";
import type { CapitalsInterface } from "../../interfaces/interface.interfaces";
import type { ChildrenType } from "../../types/types.type";
import Footer from "./footer";
import Header from "./header";
import { Box, Container } from "@mui/material";
interface Props {
  setCapital?: React.Dispatch<React.SetStateAction<CapitalsInterface | null>>;
  capital?: CapitalsInterface | null;
}
const Layout = ({ children, setCapital, capital }: Props & ChildrenType) => {
  return (
    <Box
      sx={(theme) => ({
        bgcolor: theme.palette.mode === "dark" ? "#151D32" : "#F3FAFE",
        color: theme.palette.mode === "dark" ? "#F3F4F7" : "#003464",
        minHeight: "100vh",
        height: "100%",
        position: "relative",
      })}
    >
      <Header setCapital={setCapital} capital={capital} />
      <Container maxWidth="xl">{children}</Container>
      <Footer />
    </Box>
  );
};

export default Layout;
