const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user_routes');
const taskRoutes = require('./routes/task_routes');

const app = express();
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message });
});

module.exports = app;
