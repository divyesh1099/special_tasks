const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const webpush = require('web-push');

const app = express();
app.use(cors());
app.use(express.json()); // for parsing application/json

// Replace with your MongoDB URI
const uri = "mongodb://localhost:27017/special_tasks_db"; 
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

const Task = require('./models/task.model');
app.get('/tasks', (req, res) => {
    Task.find()
      .then(tasks => res.json(tasks))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  app.post('/tasks/add', (req, res) => {
    const newTask = new Task({ 
      task: req.body.task, 
      completed: req.body.completed 
    });
  
    newTask.save()
      .then(() => res.json('Task added!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

app.post('/tasks/update/:id', (req, res) => {
    Task.findById(req.params.id)
        .then(task => {
            task.completed = !task.completed;
            task.save()
                .then(() => res.json('Task updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Notification Configuration
let subscriptions = [];

app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    console.log('Received subscription:', subscription);
    if (subscription && subscription.endpoint) {
        subscriptions.push(subscription);
        res.status(201).json({ message: 'Subscription added successfully.' });
    } else {
        res.status(400).json({ message: 'Invalid subscription object received.' });
    }
});

// Before sending notifications
console.log('Stored subscriptions:', subscriptions);
setInterval(() => {
    const notificationPayload = {
      title: 'Periodic Notification',
      body: 'This notification is sent every 2 hours',
      icon: 'assets/icons/icon-512x512.png'
    };
  
    // Correctly stringify the payload
    const payloadString = JSON.stringify(notificationPayload);
  
    subscriptions.forEach(subscription => {
        if (subscription && subscription.endpoint) {
            webpush.sendNotification(subscription, payloadString)
            .then(response => console.log('Notification sent', response))
            .catch(error => {
              console.error('Error sending notification:', error);
              // Log more details from the error
              console.error('Error details:', error.body || error);
            });
        } else {
            console.error('Invalid subscription:', subscription);
        }
    });
//   }, 2 * 60 * 60 * 1000); // 2 hours in milliseconds
}, 10000); // 10 seconds in milliseconds for testing