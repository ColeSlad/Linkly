const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Save socials for the authenticated user
const saveSocials = async(req,res) => {
    const { tokenMail, socials } = req.body;

    try {
        const decodedTokenMail = jwt.verify(tokenMail, process.env.SECRET_JWT);
        const email = decodedTokenMail.email;

        const user = await User.findOne({email: email});
        user.socialMedia = socials;
        user.save();
        return res.json({ message: 'saved', status: 'success' })
    }
    catch (err) {
        return res.json({ message: err.message, status: 'error' })
    }
}

// Save basic profile fields (name, bio, avatar)
const saveProfile = async(req,res) => {
    const { tokenMail, name, bio, avatar } = req.body;

    try {
        const decodedTokenMail = jwt.verify(tokenMail, process.env.SECRET_JWT);
        const email = decodedTokenMail.email;

        const user = await User.findOne({email: email});
        user.name = name;
        user.bio = bio;
        user.avatar = avatar;
        user.save();
        return res.json({ message: 'saved', status: 'success' })
    }
    catch (err) {
        return res.json({ message: err.message, status: 'error' })
    }
}

// Replace user's links with provided links from frontend
const saveLinks = async(req, res) => {
    const { tokenMail, links } = req.body;

    try {
        const decodedTokenMail = jwt.verify(tokenMail, process.env.SECRET_JWT);
        const email = decodedTokenMail.email;

        const user = await User.findOne({email: email});

        const newLinks = links.map((link) => ({
            url: link.link.url,
            title: link.link.title,
            icon: link.link.icon,
        }))
        user.links = newLinks;
        await user.save();
        return res.json({ message: 'saved', newLinks, status: 'success' })
    }
    catch (err) {
        return res.json({ message: err.message, status: 'error' })
    }
}

module.exports = { saveSocials, saveProfile, saveLinks}
