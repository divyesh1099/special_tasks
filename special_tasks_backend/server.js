const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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
