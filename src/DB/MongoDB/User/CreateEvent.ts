import mongoose, { Schema, Document } from "mongoose";

export interface IMoi extends Document {
    functionName?: string;
    partyUsername?: string;
    place?: string;
    date?: string;
    tamilDate?: string;
    contactNumber?: number;
    operatorName?: string;
    description?: string;
    day: string;
    eventPlace: string;
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
        type: String,
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
    description: {
        type: String,
    },
    day: {
        type: String,
    },
    eventPlace: {
        type: String,
    },
    createdTime: {
        type: Date,
        default: Date.now,
    },
});

export const moiModel = mongoose.model<IMoi>("Moi", MoiSchema);
