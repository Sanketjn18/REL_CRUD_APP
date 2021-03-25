const express = require('express');
const connectDB = require('./DB/Conncection');
const app = express();
const cors = require('cors');

connectDB();
app.use(express.json({ extended: false }));
app.use(cors());
app.use('/api/user', require('./Api/User'));
// app.use('/api/getUser', require('./Api/getUser'));
const Port = process.env.Port || 5000;

app.listen(Port, () => console.log('Server started on '+Port));
