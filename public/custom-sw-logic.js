// public/custom-sw.js (or custom-sw-logic.js)

self.addEventListener('install', (event) => {
  self.skipWaiting(); // ⚡ Force update immediately
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim()); // ⚡ Control open tabs immediately
});

self.addEventListener('push', function (event) {
  let data = {};
  
  // 🛡️ SAFETY CHECK: Don't crash if data isn't JSON
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      console.log('Push data is not JSON, using plain text.');
      data = {
        title: 'Jain Wisdom',
        body: event.data.text(),
        url: '/'
      };
    }
  }

  const options = {
    body: data.body || 'New content available',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    image: data.image,
    
    vibrate: [200, 100, 200],
    requireInteraction: true,
    tag: 'jain-wisdom-daily',
    renotify: true,
    
    data: {
      url: data.url || '/'
    },

    actions: [
      {
        action: 'open_url',
        title: '📖 Read More'
      },
      // Optional: Add a close button if you want
      { 
        action: 'close', 
        title: '❌ Dismiss'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Jain Wisdom', options)
  );
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  // If user clicked a "Dismiss" action (if you add one later)
  if (event.action === 'close') return;

  const targetUrl = event.notification.data.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
      // 1. Focus existing tab
      for (let i = 0; i < clientList.length; i++) {
        let client = clientList[i];
        if (client.url && 'focus' in client) {
          return client.focus().then(c => c.navigate ? c.navigate(targetUrl) : c);
        }
      }
      // 2. Open new tab
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});