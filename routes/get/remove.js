const express = require('express');
const router = express.Router();
const connection = require("../../database/postgreSQL/connect.js");

router.get('/remove', (req, res) =>{
    connection.query(`SELECT * FROM dabtor`, (err, result) =>{
        res.render("pages/remove", {
            debtor: result.rows,
        });
    });
});
module.exports= router;