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
            res.status(400).send("User Already Exist")
        }else{
            const hash = await bcrypt.hash(req.body.password,10);
        req.body.password = hash;
        req.body.tournaments = [];
        const user =await db.collection("users").insertOne(req.body);
        await disConnect();
        res.status(201).send("User Register");
        }
        
    } catch (error) {
        console.log(error);
    }
}

const login = async(req,res)=>{
    try {
        const db =await Connection();
        const user =await db.collection("users").findOne({email:req.body.email});
        const compare = await bcrypt.compare(req.body.password,user.password);
        if(compare){
            res.status(201).send("success");
            await disConnect();
        }
        else{
            res.status(401).send("UnAuthorized");
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