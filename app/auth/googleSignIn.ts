import type { CredentialResponse } from "google-one-tap";

export type CredentialCallback = (response: CredentialResponse) => void;

let initialized = false;
let currentCallback: CredentialCallback = () => {};

export function useInitGoogleSignIn(clientId: string) {
  if (typeof window === "undefined") return;
  if (initialized) return;
  initialized = true;

  if (document.readyState === "complete") {
    initGoogleSignIn(clientId);
    return;
  }
  window.addEventListener("load", () => {
    initGoogleSignIn(clientId);
  });
}

function initGoogleSignIn(clientId: string) {
  google.accounts.id.initialize({
    client_id: clientId,
    callback: (response) => {
      currentCallback(response);
    },
  });
}

export function setGoogleSignInCallback(callback: CredentialCallback) {
  currentCallback = callback;
}

export function renderButton(element: HTMLElement) {
  google.accounts.id.renderButton(element, {
    theme: "outline",
    size: "large",
  });
}
