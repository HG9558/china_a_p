if ("serviceWorker" in navigator) {
    if (navigator.standalone) {
        navigator.serviceWorker.getRegistration().then(registration => {
            registration.unregister();
        });
        caches.keys().then(cacheNames => {
            cacheNames.forEach(cacheName => {
                caches.delete(cacheName);
            });
        });
    } else {
        window.addEventListener("load", () => {
            navigator.serviceWorker.register("/sw.js", { scope: "/" });
        });
    }
}
