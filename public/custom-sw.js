// public/custom-sw.js

self.addEventListener('install', (event) => {
  console.log('👷 [Service Worker] Installing new version...');
  self.skipWaiting(); // 👈 This kicks out the old 'Unsubscribe' worker instantly
});

// 2. Claim Control Immediately
self.addEventListener('activate', (event) => {
  console.log('👷 [Service Worker] Activating & Claiming control...');
  event.waitUntil(clients.claim()); // 👈 Takes control of all open tabs right away
});

self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body,
      icon: '/icons/icon-192x192.png', // Your App Logo (Small Square)
      badge: '/icons/badge-72x72.png', // ⚠️ IMPORTANT: Must be a specific white-only transparent PNG!
      image: data.image,          // 🖼️ The Big Hero Image (if provided)
      
      vibrate: [200, 100, 200],   // Heartbeat Vibration
      tag: 'jain-wisdom-daily',   // Groups notifications so they don't stack up
      renotify: true,             // Buzzes every time
      
      data: {
        url: data.url || '/'      // The link to open
      },

      // 👇 NEW: The "Read More" Button
      actions: [
        {
          action: 'open_url',
          title: '📖 Read More'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

self.addEventListener('notificationclick', function (event) {
  // Close the notification immediately when clicked
  event.notification.close();

  // Get the URL (default to root if missing)
  const targetUrl = event.notification.data.url || '/';

  // Handle the click (works for both "Body Click" and "Read More" button)
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
      // 1. If the user already has your site open, just focus that tab
      for (let i = 0; i < clientList.length; i++) {
        let client = clientList[i];
        // Check if the tab is your site
        if (client.url.includes(self.registration.scope) && 'focus' in client) {
          return client.focus().then(c => c.navigate(targetUrl));
        }
      }
      // 2. If no tab is open, open a new one
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});