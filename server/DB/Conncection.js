const mongoose = require('mongoose');

const URI ="mongodb+srv://dbuser:Sanket@007@cluster0.ggccd.mongodb.net/USER_DETAILS?retryWrites=true&w=majority";

const connectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  console.log('db connected..!');
};

module.exports = connectDB;
