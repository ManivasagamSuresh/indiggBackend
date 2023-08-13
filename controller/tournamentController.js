const express = require("express");
const { Connection, disConnect } = require("../dbConnection");
const router = express.Router();
const env = require("dotenv").config();
const mongodb = require("mongodb");


const addTournament = async(req,res)=>{
    try {
        const db =await Connection();
        req.body.participants = [];
        const tournament =await db.collection("tournament").insertOne(req.body);
        await disConnect();
        res.status(201).send("Tournament Added");
    } catch (error) {
        console.log(error);
    }
}

const getTournament = async(req,res)=>{
    try {
        const db =await Connection();
        const tournament =await db.collection("tournament").find().toArray()
        await disConnect();
        res.status(200).send(tournament);
        
    } catch (error) {
        console.log(error);
    }
}


const getTournamentId = async(req,res)=>{
    try {
        const db =await Connection();
        const tournament =await db.collection("tournament").findOne({_id:new mongodb.ObjectId(req.params.id)})
        await disConnect();
        res.status(200).send(tournament);
        
    } catch (error) {
        console.log(error);
    }
}

const deleteTournament = async(req,res)=>{
    try {
        const db =await Connection();
        const tournament =await db.collection("tournament").deleteOne({_id:new mongodb.ObjectId(req.params.id)});
        await disConnect();
        res.status(200).send("Tournament deleted");
        
    } catch (error) {
        console.log(error);
    }
}

const editTournament = async(req,res)=>{
    try {
        const db =await Connection();
        delete req.body._id;
        const tournament =await db.collection("tournament").updateOne({_id:new mongodb.ObjectId(req.params.id)},{$set:req.body});
        await disConnect();
        res.status(200).send(tournament);
        
    } catch (error) {
        console.log(error);
    }
}


const addParticipant = async(req,res)=>{
    try {
        const db =await Connection();
        
        const tournament =await db.collection("tournament").updateOne({_id:new mongodb.ObjectId(req.params.id)},{$addToSet:{participants:req.body}});
        const user =await db.collection("users").updateOne({_id: new mongodb.ObjectId(req.body._id)},{$addToSet:{tournaments: req.params.id}});
        await disConnect();
        res.status(200).send(tournament);
        
    } catch (error) {
        console.log(error);
    }
}

const deleteParticipant = async(req,res)=>{
    try {
        const db =await Connection();
        const tournament =await db.collection("tournament").updateOne({_id:new mongodb.ObjectId(req.params.id)},{$pull:{participants:{_id: req.body._id}
    }});
        const user =await db.collection("users").updateOne({_id: new mongodb.ObjectId(req.body._id)},{$pull:{tournaments: new mongodb.ObjectId(req.params.id)}});
        await disConnect();
        res.status(200).send(tournament);
        
    } catch (error) {
        console.log(error);
    }
}

const editParticipant = async(req,res)=>{
    try {
        const db =await Connection();
        
        const tournament =await db.collection("tournament").updateOne({_id:new mongodb.ObjectId(req.params.id),"participants._id": req.body._id},{$set:{"participants.$.name": req.body.name,
        "participants.$.email": req.body.email,}});
        
        await disConnect();
        res.status(200).send(tournament);
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {addTournament, getTournament, getTournamentId, deleteTournament, editTournament, addParticipant, deleteParticipant, editParticipant }