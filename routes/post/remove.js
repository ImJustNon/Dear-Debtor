const express = require('express');
const router = express.Router();
const connection = require("../../database/postgreSQL/connect.js");

router.post('/remove', async(req, res) =>{
    const { password, id } = req.body ?? {};

    if(!password || !id) return res.send("ID or Password fail");
    let args = id.trim().split(/ +/g);
    if(args.some(isNaN) && !args.includes("all")) return res.send("You Can Enter Only Number Of ID or Use 'all'");

    await connection.query(`SELECT * FROM admin`,async(e, password_Result) =>{
        if(!e){
            if(admin_Result.rows !== undefined){
                let admin_pass = [];
                await admin_Result.rows.forEach(async(x) => admin_pass.push(x.password));
                if(admin_pass.includes(String(password))){
                    if(args.includes("all")){
                        if(args.lenght > 1){
                            await connection.query(`TRUNCATE TABLE dabtor`, async(error, result) =>{
                                if(!error){
                                    return res.send("success");
                                }
                                else {
                                    return res.send(error);
                                }
                            });
                        }
                        else {
                            return res.send("You can choose only ID or all");
                        }
                    }
                    else{
                        args.forEach(async(Id) =>{
                            await connection.query(`DELETE FROM dabtor WHERE id=${Id}`, async(err, result) =>{
                                if(!err){
                                    console.log(`remove ID:${Id} success`);
                                }
                                
                                /*if(!err){
                                    res.send("Success");
                                }
                                else{s
                                    res.send(err);
                                }*/
                            });
                        });     
                        return res.send("success");
                    }
                }
                else{
                    res.send("password Fail");
                }
            }
        }
        else {
            res.send(e);
        }
    });
});
module.exports= router;




