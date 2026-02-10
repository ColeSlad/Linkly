const User = require('../models/User')
const jwt = require('jsonwebtoken');

// Making a new user
// vali username and password length, creates a user document and returns a JWT
const registerUser = async(req, res) => {
    const { username, email, password, category } = req.body;

    // allow only letters and numbers with RegEx
    const valid = /^[a-zA-Z0-9_]+$/;

    if(!(valid.test(username))) {
        return res.json({message: 'Username may only contain letters, numbers, and _', status: 'error'});
    }

    if(password.length < 8 || password.length > 64) {
        return res.json({message: 'Password must be between 8 and 64 characters in length', status: 'error'});
    }

    try {
        // TODO - hash password before storing prolly
        const user = await User.create({username, email, password, role: category, links: []});
        const token = jwt.sign({email: email}, process.env.SECRET_JWT);

        return res.json({message: 'user created', status: 'success', 'token': token, id: user._id})
    } catch (err) {
        // Duplicate key error (email or username already exists)
        if(err.code === 11000) {
            return res.json({message: "There is already an account with your username or email", status: 'error'})
        }
        return res.json({message: err.message, status: 'error'})
    }
}

// logging in an existing user
// Finds the user by email, returns JWT on success.
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // TODO - Use bcrypt for hashed passwords or something
        const user = await User.findOne({email: email, password: password});
        if(!user) {
            return res.json({status: 'not found', error: 'Email or Password is incorrect'});
        }
        const token = jwt.sign({email: email}, process.env.SECRET_JWT);
        return res.json({message: 'user found', status: 'success', 'token': token, id: user._id});
    } catch (err) {
        return res.json({status: 'error', message: `An error occurred: ${err.message}`});
    }
}

module.exports = { registerUser, loginUser }