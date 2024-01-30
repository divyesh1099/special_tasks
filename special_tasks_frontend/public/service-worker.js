self.addEventListener('push', event => {
    const data = event.data.json();
    console.log('Push event!! ', data);

    const title = data.title;
    const options = {
        body: data.body,
        icon: data.icon,
        badge: 'images/badge.png'
    };

    // event.waitUntil(self.registration.showNotification(title, options));
    self.registration.showNotification(title, options);
});
