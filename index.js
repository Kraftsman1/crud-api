const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();

require('dotenv').config();

// Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts')

// Middleware
app.use(express.json());

app.post('/api/v1/', (req, res) => {
    res.status(200).send('Crud API - v1.0.0');
});
// Use Routes
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);

// Connect to MongoDB
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once('open', () => console.log('Connected to Databse Successfully'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});