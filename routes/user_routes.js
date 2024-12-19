const express = require('express');
const { createUser, getUserDetails } = require('../controllers/user_controller');

const router = express.Router();

router.post('/create-user', createUser);
router.get('/get-user-details/:id', getUserDetails);

module.exports = router;
