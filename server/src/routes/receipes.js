import express from "express"
import mongoose from "mongoose";
import { ReceipeModel } from "../models/Receipes.js";
import { UserModel } from "../models/Users.js";

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
   
    try { 
        const receipe = await ReceipeModel.findById(req.body.receipeID);
        const user = await UserMode.findById(req.body.userID);
        user.savedReceipes.push(receipe)
        await user.save()
        res.json({savedReceipes: user.savedReceipes})
    }
    catch (err) {
        res.json(err)
    }
})

router.get("/savedReceipes/ids", async (req, res) => {
   
    try { 
        const user = await UserModel.findById(req.body.userID)
        res.json({savedReceipes: user ?.savedReceipes})
    }
    catch (err) {
        res.json(err)
    }
})

router.get("/savedReceipes", async (req, res) => {
   
    try { 
        const user = await UserModel.findById(req.body.userID)
        const savedReceipes = await ReceipeModel.find({
            _id: { $in: user.savedReceipes },
        });
        res.json({savedReceipes})
    }
    catch (err) {
        res.json(err)
    }
})


export { router as receipeRouter };