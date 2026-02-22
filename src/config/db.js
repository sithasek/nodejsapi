const mongoose = require('mongoose');
// const { MongoClient } = require('mongodb');
const mondbUrl = "mongodb+srv://sithasek_db_user:lykqaFaibiKESthE@cluster0.zgy3vnq.mongodb.net/class1?appName=Cluster0";
// const dbName = "class1";


const connectToMongoDB = () => {
  return mongoose.connect(mondbUrl);
}

module.exports = connectToMongoDB;
