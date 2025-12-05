export const registerServiceWorker = () => {
  if (!('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        if (registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
        console.info('Service Worker listo', registration.scope);
      })
      .catch((error) => console.error('SW registration failed', error));
  });
};

export const triggerLocalNotification = async (title, body) => {
  if (!('serviceWorker' in navigator)) return;
  const registration = await navigator.serviceWorker.ready;
  registration.active?.postMessage({
    type: 'TRIGGER_LOCAL_NOTIFICATION',
    payload: { title, body }
  });
};
