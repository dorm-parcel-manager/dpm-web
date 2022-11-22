const broadcast = new BroadcastChannel("new-notification");

self.addEventListener("push", (e) => {
  self.registration.showNotification(e.data.text());
  broadcast.postMessage({});
});
