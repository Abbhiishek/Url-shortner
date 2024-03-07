require('dotenv').config()
const express = require('express');
const connectDB = require('./connectdb');
const Urlrouter = require('./routes/url');
const Url = require('./models/url');
const path = require('path');

const PORT = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

connectDB(process.env.MONGO_URI)

app.get('/', async (req, res) => {
    const urls = await Url.find();
    res.render("home", { urls });
});

app.use('/shortner', Urlrouter);

app.get('/r/:shortid', async (req, res) => {
    const shortid = req.params.shortid;
    const result = await Url.findOneAndUpdate(
        { shortcode: shortid },
        {
            $push: {
                visits: {
                    timestamp: Date.now()
                }
            }
        }
    )
    res.redirect(result.originalUrl);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


module.exports = app;