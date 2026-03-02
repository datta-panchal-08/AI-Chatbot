import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    profilepic: { type: String, default: "" },
    profilePublicId: { type: String, default: "" },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
},{timestamps:true});

export const User = mongoose.model("User",userSchema);
