const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcrypt-inzi');
const path = require("path")
const jwt = require('jsonwebtoken')
const cookiparser = require('cookie-parser');
const ls = require("local-storage")
const e = require("express");
// const { request } = require("http");
// const { response } = require("express");
// const { json } = require("express/lib/response");
// const e = require("cors");
// import express from "express";
// import cors from "cors"
// import axios from "axios";
// import morgan from "morgan";
// import mongoose from "mongoose";
// const app = express();
// const axios = axios();
// const dburi = process.env.DBURI
var SERVER_SECRET = process.env.SECRET || "3456";

const port = process.env.PORT || 3000;

app.use(morgan());
app.use(express.json());
app.use(cors('short'));
app.use(cookiparser());
app.use('/', express.static(path.resolve(path.join())));
const dbURI = "mongodb+srv://saqib:saqib@cluster0.wdqfa.mongodb.net/saqib?retryWrites=true&w=majority"

mongoose.connection.on('connected', () => {
    console.log('mongoose is connected');
});
mongoose.connection.on('disconnected', () => {
    console.log('mongoosse is disconnected');
    process.exit(1)
});
mongoose.connection.on('err', (err) => {
    console.log('mongoose connection problem isIn', err);
    process.exit(1)
});
mongoose.connection.on('SIGNIN', () => {
    console.log('mongoose is turminated');
    mongoose.connection.close('closed', () => {
        console.log('mongoose is closed');
        process.exit(0)
    })
})


mongoose.connect(dbURI)
    .then(() => {
        console.log("connected")
    })
    .catch((err) => {
        console.log(err)
    });
const foamSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,



    createdOn: { type: Date, 'default': Date.now }

})
var foam = mongoose.model('users', foamSchema)
app.use((req, res, next) => {
    console.log('starting server', req.body);
    next();

});

// app.get("/users", (req, res) => {
//     foam.find({}, (err, data) => {
//         if (!err) {

//             res.send('this is a response',data)
//         }
//         else {
//             res.status(500).send("Error")
//         }
//     })
// })    
app.post('/user', (req, res) => {

    if (!req.body.firstName ||
        !req.body.lastName ||
        !req.body.email ||
        !req.body.password) {
        res.status(400).send({
            message: "InValed DAta"
        });
        return;
    }

    foam.findOne({ email: req.body.email }, (err, data) => {
        if (err) {
            console.log("err no 90", err);
        }

        else if (!data) {
            bcrypt.stringToHash(req.body.password).then(hashPassword => {
                console.log(hashPassword);
                const newUser = new foam({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hashPassword
                });
                newUser.save().then((err, data) => {
                    console.log('user created success', data);
                    res.send({ message: "users created SuccessFully" })
                }).catch((err) => {
                    console.log(err, "err no 106");
                    res.send({ message: "SignUp Failed" })
                })
            });
        }
        else {
            res.status(403).send({
                message: 'UserAlrady Exist'
            });
        }
    })
})
app.post('/login', (req, res) => {
    const UserEmail = req.body.email
    const UserPassward = req.body.password
    // console.log(loginEmail);
    // console.log(loginPassward);
    ls.set("loginemail", UserEmail)
    if (!UserEmail || !UserPassward) {
        res.status(200).send({
            message: 'plz create account'
        });
    }
    else {

        foam.findOne({ email: UserEmail }, (error, loginReq) => {
            if (error) {
                res.status(500).send({
                    megssage: 'user not found'
                })
                console.log('line number 139 ka error', error);
            } else if (loginReq) {
                // console.log('line 141 ka login req', loginReq);
                bcrypt.varifyHash(UserPassward, loginReq.password).then(match => {

                    if (match) {
                        var token = jwt.sign({
                            email: loginReq.email,
                            password: loginReq.password,
                            ip: req.connection.remoteAddress
                        }, SERVER_SECRET);
                        // res.cookie('jtoken',token, {
                        //     maxAge:86_400_00,
                        //     httpOnly: true
                        // });
                        res.status(201).send({
                            message: 'login successfully'
                        });

                        // loginReq:{
                        //     email:loginReq.email,
                        //     password:loginReq.password

                        // console.log("ye mila h is m match " + match);
                        // console.log("ye mila h is m token " + response.data);
                        // console.log("ye mila h is m token " + loginReq);
                    } else {
                        console.log('line 165 not match');
                        res.status(404).send({
                            message: 'incorrect password'
                        })
                        // console.log('incorrect password ka message' + error.response.data.message);
                    }
                }).catch((err) => {
                    console.log('line 173 ka err', err);
                })
            } else {
                res.status(403).send({
                    message: 'inCorrect Email'
                })
            }
        });
    }

    // if (req.body.loginEmail===res.data.email || req.body.loginPassward===res.data.password) {
    //     alert("LogIn Successfully") }

    // else {
    //     res.status(505).send("Invalid email")
    //     alert("Invalid Email & Password")
    // }

})


//login
//   app.post("login.html",(req,res)=>{
//       try{
//           const email = req.body.email
//           const password = req.body.password;

//           const userEmali = await foam

//         //   console.log(`E: ${email} and P:${password}`);

//       }catch (error){
//           res.status(400).send("invilid email")
//       }
//   })

/////abhi ka comment
// app.use((req, res, next) => {
//     console.log('cookie', req.cookies);
//     if (!req.cookies.jtoken) {
//         res.status(401).send("yea error ha 219")
//         return;
//     }
//     jwt.verify(req.cookies.jtoken, SERVER_SECRET, (err, decordData) => {
//         if (!err) {
//             const issueDate = decordData.iat * 1000
//             const nowData = new Date().getTime()
//             const diff = nowData - issueDate

//             if (diff > 30000) {
//                 res.status(401).send('token Expired');
//             } else {
//                 var token = jwt.sign({
//                     id: decordData.id,
//                     email: decordData.email.token,
//                 }, SERVER_SECRET)
//                 res.cookie('jtoken', token, {
//                     maxAge: 86_400_00,
//                     httpOnly: true
//                 })
//                 req.body.jtoken = decordData
//                 next()
//             }
//         } else {
//             res.status(401).send('invalid token')
//         }
//     })
// })
app.get('/home', (req, res) => {
    // const loginEmail = req.body.email;
    if (res) {

        foam.find({}, (err, data) => {
            if (!err) {
                // console.log("data: 255", data)
                res.send(data)
            } else {
                // console.log("err : 257", err);
                res.send(err)
            }
        })
    }
    // .then((users) => {
    //     console.log("get ke request ka users " + users);
    //     res.send(users)
    // }).catch((err) => {
    //     console.log("error get ke request ka " + err);
    // })
    // foam.find({email:loginEmail},(error,loginReq)=>{

    // console.log(loginReq);
    // const user = req.params._id
    // const userData = foam.findOne({_id:user})
    // console.log(user);
    // console.log(userData);
    // if(!user){
    //     res.status(404).send();
    // }else{
    //     res.send(user)
    // }

    // var email= ls.get("loginemail")
    // console.log("line number 245" , email)
    // if(email){
    //     res.status(500).send({
    //     message:"wellCome TO Home",
    //     email: email
    //     },
    //     console.log("line number 249",email)
    //     )
    // }else{
    //     res.status(501).send({
    //         message:"????"
    //     },console.log("line number 254",email)
    //     )

    // }
})


app.put('/update/:id',(req,res)=>{
    let update = {}
    if(req.body.firstName){
        update.firstName = req.body.firstName
    }
    console.log("update ke value " , update);
    foam.findByIdAndUpdate(req.params.id ,update,{new:true},(err,data)=>{
        if(!err){
            res.send(data)
            console.log("update ka data  " , data);
        }else{
            res.status(404).send("not Update")
            console.log("error chal rha h");
        }
    })
    console.log("update ke value " , update);
})

app.delete('/delete/:id',(req,res)=>{
    foam.findByIdAndRemove(req.params.id,(error,data)=>{
     if(!error){
         res.send("user deleted")
     }else{
         res.send("user Not deleted")
     }

    })
})

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port} port`)
})

