import useMediaQuery from "@mui/material/useMediaQuery";

export function usePrefersColorSchemeDark() {
  return useMediaQuery("(prefers-color-scheme: dark)");
}
