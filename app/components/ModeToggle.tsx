import { Button, useColorScheme } from "@mui/joy";
import { useCallback, useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { usePrefersColorSchemeDark } from "../hooks/usePrefersColorSchemeDark";

const query = "(prefers-color-scheme: dark)";

export function ModeToggle() {
  const { mode: joyMode, setMode: joySetMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  const systemMode = usePrefersColorSchemeDark() ? "dark" : "light";
  const mode = joyMode === "system" ? systemMode : joyMode;

  const setMode = useCallback(
    (mode: "light" | "dark") => {
      const prefersDark = window.matchMedia?.(query)?.matches || false;
      const systemMode = prefersDark ? "dark" : "light";
      if (mode === systemMode) {
        joySetMode("system");
      } else {
        joySetMode(mode);
      }
    },
    [joySetMode]
  );

  // necessary for server-side rendering
  // because mode is undefined on the server
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Button
      startDecorator={mode === "light" ? <FiMoon /> : <FiSun />}
      variant="soft"
      sx={{ alignSelf: "self-start", marginTop: 1 }}
      onClick={() => {
        if (mode === "light") {
          setMode("dark");
        } else {
          setMode("light");
        }
      }}
    >
      {mode === "light" ? "Turn dark" : "Turn light"}
    </Button>
  );
}
