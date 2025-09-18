const User = require('../models/User')

const getUserData = async(req, res) => {
    const username = req.params.username;

    try {
        const user = await User.findOne({username: username});
        if(user) {
            const userData = {
                name: user.name,
                avatar: user.avatar,
                bio: user.bio,
                links: user.links
            }
            const socials = user.socialMedia;
            return res.json({ message: 'found user', userData, socials, status: 'success' });
        }
        else {
            return res.json({ status: 'error', message: 'user not found' })
        }
        
    } catch (err) {
        return res.json({ status: 'error', message: err.message })
    }
}

const getUserSocials = async(req, res) => {
    const username = req.params.username;
    try {
        const user = await User.findOne({username: username});
        const socials = user.socialMedia;
        return res.json({ message: 'found', socials, status: 'success' });
    } catch (err) {
        return res.json({ status: 'error', error: err.message });
    }
}


module.exports = { getUserData, getUserSocials };