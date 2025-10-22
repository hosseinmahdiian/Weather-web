import { Skeleton, useTheme } from "@mui/material";

const SkeletonText = ({ style }: { style: Object }) => {
  const theme = useTheme();

  return (
    <Skeleton
      variant="rounded"
      sx={{
        ...style,
        bgcolor: theme.palette.mode === "dark" ? "#192F45" : "#F1E9EE",
        borderRadius: 2,
      }}
    />
  );
};
export default SkeletonText;
