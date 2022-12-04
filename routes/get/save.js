const express = require('express');
const router = express.Router();
const connection = require("../../database/postgreSQL/connect.js");

router.get('/save', async(req, res) =>{
    await connection.query(`SELECT * FROM dabtor`, async(err, result) =>{
        res.render("pages/save", {
            debtor: await result.rows,
        });
    });
});
module.exports= router;