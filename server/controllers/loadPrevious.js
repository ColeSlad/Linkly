const User = require('../models/User');
const jwt = require('jsonwebtoken');

const loadSocials = async(req, res) => {
    try {
        const decoded = jwt.verify(req.cookies.token, process.env.SECRET_JWT);
        const user = await User.findOne({email: decoded.email});
        return res.json({ message: 'found', socials: user.socialMedia, status: 'success' })
    } catch (err) {
        return res.json({ error: err.message, status: 'error' })
    }
}

const loadLinks = async(req, res) => {
    try {
        const decoded = jwt.verify(req.cookies.token, process.env.SECRET_JWT);
        const user = await User.findOne({email: decoded.email});
        return res.json({ message: 'found', links: user.links, status: 'success' })
    } catch (err) {
        return res.json({ error: err.message, status: 'error' })
    }
}

module.exports = { loadSocials, loadLinks }
