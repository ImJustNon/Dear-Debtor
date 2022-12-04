const express = require('express');
const { Result } = require('express-validator');
const router = express.Router();
const connection = require("../../database/postgreSQL/connect.js");

router.post('/save', async(req, res) =>{
    const { password, name, amount, what, date } = req.body ?? {};

    if(!name || !amount || !password || isNaN(amount)){
        return res.send("fail");
    }
    console.log()

    let DATE = getDate();
    if(date) DATE = date

    await connection.query(`SELECT * FROM admin`, async(err, admin_Result) =>{
        if(!err){
            if(admin_Result.rows !== undefined){
                let admin_pass = [];
                await admin_Result.rows.forEach(async(x) => admin_pass.push(x.password));
                if(admin_pass.includes(String(password))){
                    await connection.query(`INSERT INTO dabtor (name,amount,date,what) VALUES ('${name}',${amount},'${DATE}','${what}')`, (debtor_Err, debtor_Result) =>{
                        if(debtor_Err){
                            res.send(debtor_Err);
                        }
                        else {
                            res.send("success");  
                        }
                    });
                }
                else{
                    res.send("password Fail");
                }
            }
        }
        else {
            res.send(err.message);
        }
    });
});

function getDate(){
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();   
    let current_Date = `${String(date)}/${String(month)}/${String(year)}`;
    return current_Date;
}

async function generate_Id(res){
    return new Promise(async(resolve, reject) => {
        let random_Id = Math.floor(Math.random() * 1000) + 1;
            await connection.query(`SELECT * FROM dabtor WHERE id=${random_Id}`, async (error, result) =>{
                if(!error){
                    if(result.rows.length == 0){
                        resolve(random_Id);
                    }
                }
                else {
                    await res.send("generate Id fail\n\n"+error);
                }
            });
    });
}

function waitUntil(condition){
    return new Promise((resolve) => {
        let interval = setInterval(() => {
            if (!condition()) {
                return;
            }
            clearInterval(interval);
            resolve();
        }, 100);
    });
}
module.exports = router;