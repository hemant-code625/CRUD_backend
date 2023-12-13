import express from "express";
import {StudentModel} from "../models/main.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const students = await StudentModel.find({});
        res.json({ "Students Registered": students });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/:prn", async (req, res) => {
    const { prn } = req.params;
    const { name, batch } = req.body;
    try {
        const updatedStudent = await StudentModel.updateOne({prn}, {name, batch});
        console.log("Student updated successfully");
        res.json({ "updatedStudent": updatedStudent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    const { name, prn, batch } = req.body;
    const objWithPrn = await StudentModel.find({prn});
    try {
        if(!name || !prn || !batch){
            return res.status(400).json({ error: "Please fill all the details" });
        }
        else if (objWithPrn.length > 0){
            return res.status(400).json({ error: "PRN already exists" });
        }
        else{
            const newStudent = new StudentModel({ name, prn, batch });
            await newStudent.save();
            res.json({ "newStudent":{ name, prn, batch } });
        }
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:prn", async (req, res) => {
    const { prn } = req.params;
    try {
        const deletedStudent = await StudentModel.deleteOne({prn});
        console.log("Student deleted successfully");
        res.json({ "deletedStudent": deletedStudent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export { router as UserRouter };