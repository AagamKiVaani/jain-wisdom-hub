// public/sw.js

self.addEventListener('push', function (event) {
  // 🔍 LOG 1: Did the browser even hear the knock?
  //console.log('📣 [Service Worker] Push Received!', event);

  if (event.data) {
    const data = event.data.json();
    
    // 🔍 LOG 2: What data did we get?
    //console.log('📦 [Service Worker] Payload:', data);

    const options = {
      body: data.body,
      icon: '/icon-192x192.png', // Make sure this file exists in /public
      badge: '/badge-72x72.png', // Optional
      image: data.image,
      vibrate: [100, 50, 100],
      data: {
        url: data.url || '/'
      }
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
        // .then(() => console.log('✅ [Service Worker] Notification Shown'))
        .catch((err) => console.error('❌ [Service Worker] Show failed:', err))
    );
  } else {
    console.log('⚠️ [Service Worker] Push event but no data');
  }
});

self.addEventListener('notificationclick', function (event) {
  console.log('👆 [Service Worker] Notification Clicked');
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
      // Focus existing tab if open
      for (let i = 0; i < clientList.length; i++) {
        let client = clientList[i];
        if (client.url === '/' && 'focus' in client) return client.focus();
      }
      // Open new tab
      if (clients.openWindow && event.notification.data.url) {
        return clients.openWindow(event.notification.data.url);
      }
    })
  );
});