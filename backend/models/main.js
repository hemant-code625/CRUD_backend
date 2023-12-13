import mongoose from "mongoose";
const structure = mongoose.Schema({

    name: {type: String, require: true},
    prn: {type: Number, require: true},
    batch: {type: String, require: true},

});
export const StudentModel = mongoose.model("students",structure);