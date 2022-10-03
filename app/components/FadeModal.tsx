import type { ModalProps } from "@mui/joy";
import { Modal, ModalDialog } from "@mui/joy";
import { Transition } from "react-transition-group";

export function FadeModal(props: ModalProps) {
  const { children, open, ...rest } = props;
  return (
    <Transition in={open} timeout={400}>
      {(state) => (
        <Modal
          keepMounted
          open={!["exited", "exiting"].includes(state)}
          componentsProps={{
            backdrop: {
              sx: {
                opacity: 0,
                backdropFilter: "none",
                transition: "opacity 400ms, backdrop-filter 400ms",
                ...(["entered", "entering"].includes(state) && {
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
              opacity: ["entered", "entering"].includes(state) ? 1 : 0,
              transition: "opacity 300ms",
            }}
          >
            {children}
          </ModalDialog>
        </Modal>
      )}
    </Transition>
  );
}
