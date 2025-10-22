import { Skeleton } from "@mui/material";

const SkeletonText = ({ style }: { style: Object }) => {
  return (
    <Skeleton
      variant="rounded"
      sx={(theme) => ({
        ...style,
        bgcolor: theme.palette.mode === "dark" ? "#2A3A55" : "#E0E744D",
        borderRadius: 2,
      })}
    />
  );
};
export default SkeletonText;
