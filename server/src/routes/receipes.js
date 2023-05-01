import express from "express"
import mongoose from "mongoose";
import { ReceipeModel } from "../models/Receipes.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try { 
        const response = await ReceipeModel.find({});
        res.json(response)
    }
    catch (err) {
        res.json(err)
    }
})

router.post("/", async (req, res) => {
    const receipe = new ReceipeModel(req.body)
    try { 
        const response = await receipe.save({});
        res.json(response)
    }
    catch (err) {
        res.json(err)
    }
})

router.put("/", async (req, res) => {
    {userId, receipeId}
    try { 
        const response = await receipe.save({});
        res.json(response)
    }
    catch (err) {
        res.json(err)
    }
})


export { router as receipeRouter };