// Import VAPID Keys for Notification Service
import { VAPID_Public_Key, VAPID_Private_Key } from '../VAPIDKeys.js';

const express = require('express');
const bodyParser = require('body-parser');
const webpush = require('web-push');

const app = express();
app.use(bodyParser.json());

const vapidPublicKey = "BA3vIRWgcdikER-UVDq5SUsA8b2voB8KbqIWxpjx7fxoXq3E9qP9v_Z8xIPR1zvSOZl63ANHq0xuW_vulIqECd8";
const vapidPrivateKey = "wgoewCN--CwVxHVLFINz5BumzTRuQhju1rqQavCY68k";

webpush.setVapidDetails(
  'mailto:divyesh1099@gmail.com',
  vapidPublicKey,
  vapidPrivateKey
);

// Store subscriptions
let subscriptions = [];

// Subscribe Route
app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({});
});

// Send Notification
app.post('/sendNotification', (req, res) => {
  const notificationPayload = {
    notification: {
      title: 'New Notification',
      body: 'This is the body of the notification',
      icon: 'assets/icons/icon-512x512.png'
    },
  };

  Promise.all(subscriptions.map(sub => webpush.sendNotification(sub, JSON.stringify(notificationPayload))))
    .then(() => res.status(200).json({ message: 'Notification sent successfully.' }))
    .catch(err => {
      console.error("Error sending notification, reason: ", err);
      res.sendStatus(500);
    });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
