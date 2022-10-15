import { Box } from "@mui/joy";

export function CopyButton() {
  return (
    <Box
      component="span"
      sx={(theme) => ({
        display: "inline-block",
        fontSize: 10,
        height: 16,
        padding: 0.25,
        cursor: "pointer",
        color: theme.vars.palette.text.primary,
        transition: "transform 300ms",
        ":hover": {
          color: theme.vars.palette.text.secondary,
        },
        ":active": {
          transform: "scale(0.9)",
        },
      })}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_5154_163117)">
          <path
            d="M2.5 7.5H2C1.73478 7.5 1.48043 7.39464 1.29289 7.20711C1.10536 7.01957 1 6.76522 1 6.5V2C1 1.73478 1.10536 1.48043 1.29289 1.29289C1.48043 1.10536 1.73478 1 2 1H6.5C6.76522 1 7.01957 1.10536 7.20711 1.29289C7.39464 1.48043 7.5 1.73478 7.5 2V2.5M5.5 4.5H10C10.5523 4.5 11 4.94772 11 5.5V10C11 10.5523 10.5523 11 10 11H5.5C4.94772 11 4.5 10.5523 4.5 10V5.5C4.5 4.94772 4.94772 4.5 5.5 4.5Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_5154_163117">
            <rect width="12" height="12" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
}
