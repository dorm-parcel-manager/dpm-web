import type { ModalProps } from "@mui/joy";
import { Modal, ModalDialog } from "@mui/joy";
import { Transition } from "react-transition-group";

export function FadeModal(props: ModalProps) {
  const { children, open, ...rest } = props;
  return (
    <Transition in={open} timeout={200}>
      {(state) => {
        const show = ["entered", "entering"].includes(state);
        return (
          <Modal
            keepMounted
            open={!["exited", "exiting"].includes(state)}
            componentsProps={{
              backdrop: {
                sx: {
                  opacity: 0,
                  backdropFilter: "none",
                  transition: "opacity 200ms, backdrop-filter 200ms",
                  ...(show && {
                    opacity: 1,
                    backdropFilter: "blur(8px)",
                  }),
                },
              },
            }}
            sx={{
              visibility: state === "exited" ? "hidden" : "visible",
            }}
            {...rest}
          >
            <ModalDialog
              sx={{
                opacity: 0,
                transform: "translate(-50%, calc(-50% + 3px)) scale(0.99)",
                ...(show && {
                  opacity: 1,
                  transform: "translate(-50%, -50%)",
                }),
                transition: "opacity 200ms, transform 200ms",
              }}
            >
              {children}
            </ModalDialog>
          </Modal>
        );
      }}
    </Transition>
  );
}

export function FullscreenModal(props: ModalProps) {
  const { children, open, sx, ...rest } = props;
  return (
    <Transition in={open} timeout={200}>
      {(state) => {
        const show = ["entered", "entering"].includes(state);
        return (
          <Modal
            keepMounted
            open={!["exited", "exiting"].includes(state)}
            componentsProps={{
              backdrop: {
                sx: {
                  display: "none",
                },
              },
            }}
            sx={{
              visibility: state === "exited" ? "hidden" : "visible",
              zIndex: 999,
            }}
            {...rest}
          >
            <ModalDialog
              layout="fullscreen"
              sx={{
                opacity: 0,
                transform: "translate(0, -1%) scale(0.99)",
                ...(show && {
                  opacity: 1,
                  transform: "",
                }),
                transition: "opacity 200ms, transform 200ms",
                ...sx,
              }}
            >
              {children}
            </ModalDialog>
          </Modal>
        );
      }}
    </Transition>
  );
}
