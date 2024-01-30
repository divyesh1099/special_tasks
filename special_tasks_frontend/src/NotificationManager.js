// Import VAPID Keys for Notification Service
import { VAPID_Public_Key, VAPID_Private_Key } from './VAPIDKeys.js';

export const initializePushNotifications = () => {

    function askNotificationPermission() {
        // Function to ask the user's permission to allow notifications
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                console.log("Notification permission granted.");
                // If permission is granted, subscribe the user to the push notifications
                subscribeUserToPush();
            } else {
                console.log("Notification permission denied.");
            }
        });
    }

    // Utility function to convert the VAPID public key
    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');
    
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
    
        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    function subscribeUserToPush() {
        navigator.serviceWorker.ready.then(registration => {
            const vapidPublicKey = VAPID_Public_Key;
            const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
    
            registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: convertedVapidKey
            })
            .then(subscription => {
                console.log('User is subscribed:', JSON.stringify(subscription));
    
                // Send the subscription details to the server using your preferred method
                sendSubscriptionToServer(subscription);
            })
            .catch(error => {
                console.error('Failed to subscribe the user:', error);
            });
        });
    }
    
    function sendSubscriptionToServer(subscription) {
        // Use your method to send the subscription object to your server
        // Example using Fetch API
        fetch('http://localhost:5000/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(subscription)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Bad status code from server.');
            }
            return response.json();
        })
        .then(responseData => {
            console.log('Server response:', responseData);
            if (!(responseData.data && responseData.data.success)) {
                throw new Error('Bad response from server.');
            }
        })
        .catch(error => {
            console.error('Could not send subscription to server:', error);
        });
    }    

    if ('serviceWorker' in navigator && 'PushManager' in window) {
        // Register a service worker hosted at the root of the site
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    } else {
        console.warn('Push messaging is not supported');
    }
};