const User = require('../models/User');
const jwt = require('jsonwebtoken');

const saveSocials = async(req,res) => {
    const { socials } = req.body;
    try {
        const decoded = jwt.verify(req.cookies.token, process.env.SECRET_JWT);
        const user = await User.findOne({email: decoded.email});
        user.socialMedia = socials;
        user.save();
        return res.json({ message: 'saved', status: 'success' })
    }
    catch (err) {
        return res.json({ message: err.message, status: 'error' })
    }
}

const saveProfile = async(req,res) => {
    const { name, bio, avatar } = req.body;
    try {
        const decoded = jwt.verify(req.cookies.token, process.env.SECRET_JWT);
        const user = await User.findOne({email: decoded.email});
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
    const { links } = req.body;
    try {
        const decoded = jwt.verify(req.cookies.token, process.env.SECRET_JWT);

        const invalidLink = links.find(({ link }) => {
            try {
                const { protocol } = new URL(link.url);
                return protocol !== 'https:' && protocol !== 'http:';
            } catch {
                return true;
            }
        });
        if (invalidLink) {
            return res.json({ message: 'All link URLs must start with http:// or https://', status: 'error' });
        }

        const user = await User.findOne({email: decoded.email});
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

module.exports = { saveSocials, saveProfile, saveLinks }
