const User = require('../models/User')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 12;

const isProd = process.env.NODE_ENV === 'production';

// HttpOnly cookie carries the JWT — JS can never read it
const tokenCookieOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// Plain cookie lets frontend JS know the user is logged in (not the token itself)
const flagCookieOptions = {
    httpOnly: false,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
};

const registerUser = async(req, res) => {
    const { username, email, password, category } = req.body;

    const valid = /^[a-zA-Z0-9_]+$/;
    if(!(valid.test(username))) {
        return res.json({message: 'Username may only contain letters, numbers, and _', status: 'error'});
    }
    if(password.length < 8 || password.length > 64) {
        return res.json({message: 'Password must be between 8 and 64 characters in length', status: 'error'});
    }

    try {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const user = await User.create({username, email, password: hashedPassword, role: category, links: []});
        const token = jwt.sign({email: email}, process.env.SECRET_JWT);

        res.cookie('token', token, tokenCookieOptions);
        res.cookie('loggedIn', '1', flagCookieOptions);
        return res.json({message: 'user created', status: 'success', id: user._id});
    } catch (err) {
        if(err.code === 11000) {
            return res.json({message: "There is already an account with your username or email", status: 'error'});
        }
        return res.json({message: err.message, status: 'error'});
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email: email});
        if(!user) {
            return res.json({status: 'not found', error: 'Email or Password is incorrect'});
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch) {
            return res.json({status: 'not found', error: 'Email or Password is incorrect'});
        }
        const token = jwt.sign({email: email}, process.env.SECRET_JWT);

        res.cookie('token', token, tokenCookieOptions);
        res.cookie('loggedIn', '1', flagCookieOptions);
        return res.json({message: 'user found', status: 'success', id: user._id});
    } catch (err) {
        return res.json({status: 'error', message: `An error occurred: ${err.message}`});
    }
}

const logoutUser = (_req, res) => {
    res.clearCookie('token', tokenCookieOptions);
    res.clearCookie('loggedIn', flagCookieOptions);
    return res.json({message: 'logged out', status: 'success'});
}

module.exports = { registerUser, loginUser, logoutUser }
