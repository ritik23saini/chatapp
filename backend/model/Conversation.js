import mongoose from "mongoose";

const conversationSchema = mongoose.Schema({
    Participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    Messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "messagemodel",
    }]

}, { timestamps: true });

export const Conversationmodel = mongoose.model("Conversationmodel", conversationSchema)
