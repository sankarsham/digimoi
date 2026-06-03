import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICashBreakdown {
    note: number;
    count: number;
}

export interface IMoiCollection extends Document {
    eventId: Types.ObjectId;
    operatorId?: Types.ObjectId;
    name?: string;
    place?: string;
    native?: string;
    work?: string;
    phoneNumber?: string;
    operatorName?: string;
    amount?: number;
    cashBreakdown?: ICashBreakdown[];
    description?: string;
    createdTime: Date;
}

const CashBreakdownSchema = new Schema<ICashBreakdown>({
    note: { type: Number, required: true },
    count: { type: Number, required: true },
}, { _id: false });

const MoiCollectionSchema = new Schema<IMoiCollection>({
    eventId: {
        type: Schema.Types.ObjectId,
        ref: "Moi",
        required: true,
    },
    operatorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    name: {
        type: String,
    },
    place: {
        type: String,
    },
    native: {
        type: String,
    },
    work: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    operatorName: {
        type: String,
    },
    amount: {
        type: Number,
    },
    cashBreakdown: {
        type: [CashBreakdownSchema],
        default: [],
    },
    description: {
        type: String,
        required: true,
    },
    createdTime: {
        type: Date,
        default: Date.now,
    },
});

export const MoiCollectionModel = mongoose.model<IMoiCollection>("MoiCollection", MoiCollectionSchema);
