const express = require('express');
const { createTask, getTaskDetails, updateTask, deleteTask } = require('../controllers/task_controller');

const router = express.Router();

router.post('/create-task/:userId', createTask);
router.get('/get-tasks-details', getTaskDetails);
router.patch('/update-task/:id', updateTask);
router.delete('/delete-task/:id', deleteTask);

module.exports = router;
