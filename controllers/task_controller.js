const { tasks } = require('../models/task_model');
const { users } = require('../models/user_model');
const { v4: uuidv4 } = require('uuid');


// Create task
exports.createTask = (req, res) => {
    const { userId } = req.params;
    const { title, description, status, dueDate } = req.body;

    if (!title || !description || !status || !dueDate) {
        return res.status(400).json({
            error: 'Missing required fields',
            message: 'Title, description, status, and dueDate are all required.',
        });
    }

    if (!users.some((user) => user.id === userId)) {
        return res.status(400).json({ error: 'Invalid userId' });
    }

    const newTask = { id: uuidv4(), title, description, status, dueDate, userId };
    tasks.push(newTask);

    res.status(201).json({
        message: 'Task created successfully',
        task: newTask,
    });
};



// Get task details
exports.getTaskDetails = (req, res) => {
    const { taskId } = req.params;

    const task = tasks.find((task) => task.id === taskId);

    if (!task) {
        return res.status(404).json({
            error: 'Task not found',
            message: `No task found with ID: ${taskId}. Please ensure the ID is correct.`,
        });
    }

    res.status(200).json({
        message: 'Task retrieved successfully',
        task: task,
    });
};

// Update task
exports.updateTask = (req, res) => {
    console.log(`Updating task with ID: ${req.params.id}`);
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;

    const task = tasks.find((t) => t.id === id);
    if (!task) {
        return res.status(404).json({
            error: 'Task not found',
            message: `No task found with ID: ${id}. Please ensure the ID is correct.`,
        });
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    if (dueDate) task.dueDate = dueDate;

    res.status(200).json({
        message: 'Task updated successfully',
        task: task,
    });
};


// delete task
exports.deleteTask = (req, res) => {
    const { id } = req.params;
    const taskIndex = tasks.findIndex((t) => t.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({
            error: 'Task not found',
            message: `No task found with ID: ${id}. Please ensure the ID is correct.`,
        });
    }

    tasks.splice(taskIndex, 1);
    res.status(200).json({
        message: 'Task deleted successfully',
        taskId: id,
    });
};
