const express = require("express");
const app = express();

const cors = require("cors");
const env = require("dotenv").config();

const user = require("./Routes/user")
const tournament = require("./Routes/tournament")

app.use(express.json());
// app.use(cors({origin:"http://localhost:3000"}));
app.use(cors({origin:"https://steady-shortbread-751776.netlify.app/"}));

app.use("/api/user",user)
app.use("/api/tournament",tournament)

app.listen(process.env.PORT || 5000,()=>{
    console.log("connected");
})