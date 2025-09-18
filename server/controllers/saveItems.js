const User = require('../models/User');
const jwt_decode = require('jwt-decode');

const saveSocials = async(req,res) => {
    const { tokenMail, socials } = req.body;

    try {
        const decodedTokenMail = jwt_decode(tokenMail, process.env.SECRET_JWT);
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

const saveProfile = async(req,res) => {
    const { tokenMail, name, bio, avatar } = req.body;

    try {
        const decodedTokenMail = jwt_decode(tokenMail, process.env.SECRET_JWT);
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

const saveLinks = async(req, res) => {
    const { tokenMail, links } = req.body;

    try {
        const decodedTokenMail = jwt_decode(tokenMail, process.env.SECRET_JWT);
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