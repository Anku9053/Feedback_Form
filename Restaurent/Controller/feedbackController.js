const express =require("express");
const Feedback = require("../model/feedbackmodel.js");
// const { Feedback } = require("../model/feedbackmodel.js");

const router = express.Router();



router.post("/",async(req,res)=>{
    const payload = req.body;

    try {
    
        const newFeedback  = new Feedback(payload);
        await newFeedback.save();
        res.status(200).json({msg:"Successful Feedback created",feedback:payload})

    } catch (error) {
        res.status(400).send(error.message)
    }
})


router.get("/",async(req,res)=>{
    try {

        const feedback = await Feedback.find().lean().exec();
        res.status(200).send(feedback)
        
    } catch (error) {
        res.status(400).send(error)
    }
})




module.exports={
    router
}