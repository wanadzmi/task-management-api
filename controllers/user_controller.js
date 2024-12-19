const { users } = require('../models/user_model');
const { v4: uuidv4 } = require('uuid');


// Create user
exports.createUser = (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    const newUser = { id: uuidv4(), name, email };
    users.push(newUser);

    res.status(201).json({
        message: 'User created successfully',
        user: newUser,
    });
};



// Get user details
exports.getUserDetails = (req, res) => {
    const { id } = req.params;
    const user = users.find((u) => u.id === id);

    if (!user) {
        return res.status(404).json({
            error: 'User not found',
            message: `No user found with ID: ${id}. Please ensure the ID is correct.`,
        });
    }

    res.status(200).json({
        message: 'User details retrieved successfully',
        user: user,
    });
};
