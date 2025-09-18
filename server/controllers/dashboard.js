const User = require('../models/User')
const jwt_decode = require('jwt-decode');

const dashboardData = async(req, res) => {
    const { tokenMail } = req.body;
    try {
        const decodedTokenMail = jwt_decode(tokenMail, process.env.SECRET_JWT);
        const email = decodedTokenMail.email;
        const user = await User.findOne({email: email});
        const userData = {
            name: user.name,
            role: user.role,
            bio: user.bio,
            avatar: user.avatar,
            username: user.username,
            links: user.links.length
        }
        return res.json({message: 'User data loaded', userData, status: 'Okay'})
    } catch (err) {
        return res.json({status: 'error', error: err.message})
    }
}

module.exports = { dashboardData }