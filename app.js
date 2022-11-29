if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
  navigator.serviceWorker.register("onesignal/OneSignalSDKWorker.js");
}
