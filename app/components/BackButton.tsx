import type { IconButtonProps } from "@mui/joy";
import { IconButton } from "@mui/joy";
import { useNavigate } from "@remix-run/react";
import { MdArrowBackIosNew } from "react-icons/md";

export function BackButton(props: IconButtonProps) {
  const navigate = useNavigate();
  return (
    <IconButton
      onClick={() => navigate(-1)}
      variant="outlined"
      color="neutral"
      {...props}
    >
      <MdArrowBackIosNew />
    </IconButton>
  );
}
