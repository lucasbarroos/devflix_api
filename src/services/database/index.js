const mongoose = require('mongoose');
require('dotenv').config();

const URL = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
};

const connect = async () => {
  mongoose.connect(URL, connectionOptions, (err) => {
    if (err) console.log('Error to connect the database');
    console.log('Mongodb connected');
  });
};

module.exports = { connect };
