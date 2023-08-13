const express = require("express");
const { Connection, disConnect } = require("../dbConnection");
const router = express.Router();
const env = require("dotenv").config();
const bcrypt = require("bcrypt");
const mongodb = require("mongodb");

const signUp = async(req,res)=>{
    try {
        const db =await Connection();
        const data = await db.collection("users").findOne({email: req.body.email });
        
        if(data){
            res.status(400).send("Email already Exist, kindly login to continue")
        }else{
            const hash = await bcrypt.hash(req.body.password,10);
        req.body.password = hash;
        delete req.body.confirmpassword;
        req.body.tournaments = [];
        req.body.admin = 0;
        const user =await db.collection("users").insertOne(req.body);
        await disConnect();
        res.status(201).send("User Registered");
        }
        
    } catch (error) {
        console.log(error);
    }
}

const login = async(req,res)=>{
    try {
        const db =await Connection();
        const user =await db.collection("users").findOne({email:req.body.email});
        if(user){

            const compare = await bcrypt.compare(req.body.password,user.password);
            if(compare){
                const {password, ...otherinfo} = user
                res.status(201).send(otherinfo);
                await disConnect();
            }
            else{
                res.status(401).send("UnAuthorized, Email and password does not matched");
            }
        }else{
            res.status(401).send("User Not Registers, Kindly signup to continue");
        }
        
    } catch (error) {
        console.log(error);
    }
}


const getUser = async(req,res)=>{
    try {
        const db =await Connection();
        const user =await db.collection("users").find().toArray();
        await disConnect();
        res.status(201).send(user);
    } catch (error) {
        console.log(error);
    }
}

const editUser = async(req,res)=>{
    try {
        const db =await Connection();
        delete req.body._id;
        
        const user =await db.collection("users").updateOne({_id:new mongodb.ObjectId(req.params.id)},{$set: req.body});
        await disConnect();
        res.status(201).send(user);
    } catch (error) {
        console.log(error);
    }
}

const deleteUser = async(req,res)=>{
    try {
        const db =await Connection();
        const user =await db.collection("users").deleteOne({_id:new mongodb.ObjectId(req.params.id)});
        await disConnect();
        res.status(201).send("User Deleted");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {signUp,login,getUser,editUser,deleteUser}