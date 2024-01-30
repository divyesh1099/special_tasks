import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [showCongrats, setShowCongrats] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/tasks')
            .then(response => {
                if (response.data.length > 0) {
                    setTasks(response.data);
                    checkAllTasksCompleted(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const toggleCompleted = (id) => {
        axios.post(`http://localhost:5000/tasks/update/${id}`)
            .then(response => {
                const updatedTasks = tasks.map(task => 
                    task._id === id ? { ...task, completed: !task.completed } : task
                );
                setTasks(updatedTasks);
                checkAllTasksCompleted(updatedTasks);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const checkAllTasksCompleted = (tasks) => {
        setShowCongrats(tasks.every(task => task.completed));
    };

    const closeCongratsMessage = () => {
        setShowCongrats(false);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-800">
            <div className="text-white w-1/2">
                <h2 className="text-2xl font-bold mb-4">Tasks</h2>
                <ul>
                    {tasks.map(task => (
                        <li key={task._id} className="flex items-center mb-2">
                            <input 
                                type="checkbox" 
                                checked={task.completed} 
                                onChange={() => toggleCompleted(task._id)} 
                                className="mr-2 h-5 w-5"
                            />
                            <span className={task.completed ? "line-through" : ""}>{task.task}</span>
                        </li>
                    ))}
                </ul>
                {showCongrats && (
                    <div className="mt-4 bg-green-500 text-white p-4 rounded-md">
                        <span>Congratulations, all tasks are completed!</span>
                        <button 
                            onClick={closeCongratsMessage}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TaskList;
