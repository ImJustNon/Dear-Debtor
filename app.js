const express = require('express');
const app = express();
const config = require('./configs/config.js');
const fs = require('fs');

//config express
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//load database connection
require("./database/postgreSQL/connect.js");

fs.readdirSync("./routes").forEach(async folders => {
    fs.readdirSync(`./routes/${folders}`).forEach(async files => {
        let router = require(`./routes/${folders}/${files}`);
        app.use(router);
        console.log(`[Routes] Loaded : ${folders}/${files}`);
    });
});

// locad handlers
fs.readdirSync("./handlers").forEach(async(files) => {
    require(`./handlers/${files}`)();
    console.log(`[Handlers] Loaded : ${files}`);
});

// listen port
app.listen(config.express.server_Port, async() =>{
    console.log(`[App] Listening on port : ${config.express.server_Port}`);
});