import mongoose, { Schema, Document } from "mongoose";

export interface IMoi extends Document{
    functionName?:string;
    partyUsername?:string;
    place?:string;
    date?: Date;
    tamilDate?: string;
    contactNumber?:number;
    operatorName?: string;
    createdTime: Date;
    
}


const MoiSchema = new Schema<IMoi>({
    functionName: {
        type: String,
    },
    partyUsername: {
        type: String,
    },
    place: {
        type: String,
    },
    date: {
        type: Date,
    },
    tamilDate: {
        type: String,
    },
    contactNumber: {
        type: Number,
    },
    operatorName: {
        type: String,
    },
    createdTime: {
        type: Date,
        default: Date.now,
    },
});

export const moiModel = mongoose.model<IMoi>("Moi", MoiSchema);
