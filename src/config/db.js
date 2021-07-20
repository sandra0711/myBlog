require('dotenv').config();

const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};
const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env;

function dbConnect() {
  mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, options, (err) => {
    if (err) { return console.log(err); }
    return console.log('Success connecting to mongo');
  });
}

module.exports = dbConnect;
