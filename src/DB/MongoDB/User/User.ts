import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    username?: string;
    mobile?: string;
    userType?: string;
    address: string;
    email?: string;
    password?: string;
    gender: string;
    createdTime: Date;
    updatedTime: Date;
}

const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        enum: ["A", "S", "O"],
    },
    address:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender:{
        type: String,
        enum: ["MALE", "FEMALE", "OTHER"],
    },
    createdTime: {
        type: Date,
        default: Date.now,
    },
    updatedTime: {
        type: Date,
        default: Date.now,
    },
}
);

export const userModel = mongoose.model<IUser>("User", UserSchema);

