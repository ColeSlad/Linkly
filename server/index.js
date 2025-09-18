require('dotenv').config()

const express = require('express')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const { registerUser, loginUser } = require('./controllers/auth');
const { dashboardData } = require('./controllers/dashboard');
const { getUserData } = require('./controllers/getUserData');
const { saveSocials, saveProfile, saveLinks } = require('./controllers/saveItems');
const { loadSocials, loadLinks } = require('./controllers/loadPrevious')


app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(() => console.log('mongodb connected')).catch((err) => console.log(err.message + " line 18"));

app.get('/', (req, res) => {
    res.send('hello!');
})

app.post('/api/register', registerUser);
app.post('/api/login', loginUser);

app.post('/data/dashboard', dashboardData);

app.get('/get/:username', getUserData);

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