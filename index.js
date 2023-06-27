const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();

require('dotenv').config();

// Middleware
app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

// connect to mongodb
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once('open', () => console.log('Connected to Databse Successfully'));