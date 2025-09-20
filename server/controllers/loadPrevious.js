const User = require('../models/User');
const jwt_decode = require('jwt-decode');

// Load saved social media information for user
const loadSocials = async(req, res) => {
    const { tokenMail } = req.body;

    try {
        const decodedTokenMail = jwt_decode(tokenMail, process.env.SECRET_JWT);
        const email = decodedTokenMail.email;

        const user = await User.findOne({email: email});
        
        const socials = user.socialMedia;
        return res.json({ message: 'found', socials, status: 'success' })
    } catch (err) {
        return res.json({ error: err.message, status: 'error' })
    }
}

// Load saved links for user
const loadLinks = async(req, res) => {
    const { tokenMail } = req.body;

    try {
        const decodedTokenMail = jwt_decode(tokenMail, process.env.SECRET_JWT);
        const email = decodedTokenMail.email;

        const user = await User.findOne({email: email});
        
        const links = user.links;
        return res.json({ message: 'found', links, status: 'success' })
    } catch (err) {
        return res.json({ error: err.message, status: 'error' })
    }
}

module.exports = { loadSocials, loadLinks }