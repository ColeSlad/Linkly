require('dotenv').config()

const express = require('express')
const app = express();
const cors = require('cors');


const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

// Route handlers
const { registerUser, loginUser } = require('./controllers/auth');
const { dashboardData } = require('./controllers/dashboard');
const { getUserData } = require('./controllers/getUserData');
const { saveSocials, saveProfile, saveLinks } = require('./controllers/saveItems');
const { loadSocials, loadLinks } = require('./controllers/loadPrevious')



app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

mongoose.connect(process.env.MONGO_URL).then(() => console.log('mongodb connected')).catch((err) => console.log(err.message + " line 18"));

// test
app.get('/', (req, res) => {
    res.send('hello!');
})

// auth routes
app.post('/api/register', registerUser);
app.post('/api/login', loginUser);

// Requires valid token on frontend from local storage
app.post('/data/dashboard', dashboardData);

// Public profile lookup by username
app.get('/get/:username', getUserData);

// Save/load user settings and links
app.post('/save/socials', saveSocials);
app.post('/load/socials', loadSocials);
app.post('/save/profile', saveProfile);

app.post('/load/links', loadLinks);
app.post('/save/links', saveLinks);
// app.get('/get/socials/:username', getUserSocials);

const port = process.env.PORT || 8000;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})