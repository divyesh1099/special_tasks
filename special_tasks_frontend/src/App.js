import React from 'react';
import TaskList from './TaskList';
import { initializePushNotifications } from './NotificationManager';
// Import VAPID Keys for Notification Service
import { VAPID_Public_Key, VAPID_Private_Key } from './VAPIDKeys.js';

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
      const vapidPublicKey = "BA3vIRWgcdikER-UVDq5SUsA8b2voB8KbqIWxpjx7fxoXq3E9qP9v_Z8xIPR1zvSOZl63ANHq0xuW_vulIqECd8";
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

function App() {
  const handleSubscribeClick = () => {
    initializePushNotifications();
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
        // After permission is granted, subscribe the user
        subscribeUserToPush();
      } else {
        console.log("Notification permission denied.");
      }
    });
  };

  return (
    <div className="App">
      <TaskList />
      <button onClick={handleSubscribeClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Subscribe to Notifications
      </button>
    </div>
  );
}

export default App;