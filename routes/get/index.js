const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    res.redirect("/save");
});
module.exports= router;