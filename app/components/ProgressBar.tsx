import { Box } from "@mui/joy";

interface Props {
  progressWidth: string | number;
}

export function ProgressBar({ progressWidth }: Props) {
  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        height: 8,
        borderRadius: 4,
        background: theme.vars.palette.neutral[100],
        "[data-joy-color-scheme='dark'] &": {
          background: theme.vars.palette.neutral[800],
        },
      })}
    >
      <Box
        sx={(theme) => ({
          width: progressWidth,
          height: 8,
          background: theme.vars.palette.success[400],
          borderRadius: 4,
        })}
      ></Box>
    </Box>
  );
}
