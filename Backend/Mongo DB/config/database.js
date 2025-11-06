const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'mongodb_online';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  const db = client.db(dbName);
  console.log('Connected successfully to database')
  return db;
}

module.exports = main;