import { Autocomplete, TextField } from "@mui/material";
import { capitals } from "../../constants/capitals";
import { useTranslation } from "react-i18next";
import type { CapitalsInterface } from "../../interfaces/interface.interfaces";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { findCapital } from "../../functions/functions";
interface Props {
  setCapital: React.Dispatch<React.SetStateAction<CapitalsInterface | null>>;
  capital: CapitalsInterface | null;
}
const SearchCapitals = ({
  setCapital,
  capital,
  style,
}: Props & { style?: object }) => {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (_: any, newItem: any) => {
    if (newItem) {
      setCapital(newItem);
      const newParams = new URLSearchParams(searchParams);
      newParams.set("capital", newItem.name);
      setSearchParams(newParams);
    }
  };

  useEffect(() => {
    const capital = searchParams.get("capital");
    const find = findCapital(String(capital));
    if (find) setCapital(find);
  }, []);

  return (
    <Autocomplete
      disablePortal
      options={capitals}
      value={capital}
      onChange={handleChange}
      sx={{ ...style, direction: "rtl" }}
      getOptionLabel={(option) =>
        i18n?.language === "fa" ? option.fa : option.en
      }
      renderInput={(params) => (
        <TextField {...params} label={t("Capitals")} size="small" />
      )}
    />
  );
};

export default SearchCapitals;
