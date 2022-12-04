const { Client } = require('pg');
const config = require("../../configs/config.js");

const client = new Client(config.database.postgreSQL);

client.connect(err => {
    if (err) {
      console.error(`[Database] PostgreSQL : Cannot connect to database ERROR : ${err}`);
    } else {
      console.log("[Database] PostgreSQL : Connected");
    }
});

module.exports = client;