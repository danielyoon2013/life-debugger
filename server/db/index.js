const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const mongoUri = 'mongodb://**************.ap-northeast-2.compute.amazonaws.com/lifedebugger';


const db = mongoose.connection;

db.on('error', () => {
  console.error.bind(console, 'connection error:') 
});

db.once('open', () => {
  console.log("Connected to DB");
});

mongoose.connect(mongoUri, {useMongoClient: true});

module.exports = db;
