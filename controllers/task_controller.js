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


// Get tasks with optional filters
exports.getTaskDetails = (req, res) => {
    const { userId, status, dueDate } = req.query;

    let filteredTasks = tasks;

    if (userId) {
        filteredTasks = filteredTasks.filter((task) => task.userId === userId);
    }

    if (status) {
        filteredTasks = filteredTasks.filter((task) => task.status === status);
    }

    if (dueDate) {
        filteredTasks = filteredTasks.filter((task) => task.dueDate === dueDate);
    }

    if (filteredTasks.length === 0) {
        return res.status(404).json({
            error: 'No tasks found',
            message: 'No tasks match the provided filters. Please ensure the filters are correct.',
        });
    }

    res.status(200).json({
        message: 'Tasks retrieved successfully',
        tasks: filteredTasks,
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
