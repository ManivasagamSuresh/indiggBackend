const mongodb = require("mongodb");
const env = require("dotenv").config();

const url = process.env.DB_URL;
const mongoclient =new mongodb.MongoClient(url);
var db;
var connect;


const Connection = async()=>{
    try {
        const connect =await mongoclient.connect();
        const db =await connect.db("INDIGG");
        return db;    
    } catch (error) {
        console.log(error);
    }
    
}

const disConnect  = async()=>{
    try {
        if(connect){

            await  connect.close();
        }else{
            console.log("no Connection")
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {Connection,disConnect,db,connect}