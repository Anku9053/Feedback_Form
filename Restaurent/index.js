const express = require("express");
const cors =require("cors")
const app  = express()
app.use(express.json());
app.use(cors())
const {connect} = require("./Database/db.js");
const { router } = require("./Controller/feedbackController.js");


app.use("/feedback",router)
const port =5000
app.listen(port,async(req,res)=>{
    try {
        await connect
        console.log(`Port is running at ${port}`)
    } catch (error) {
        console.log(error.message )
    }
})