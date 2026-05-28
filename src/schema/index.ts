import { baseType } from "./base.type.js";
import { userType } from "../modules/User/User.type.js";
import { createEventType } from "../modules/Moi/createEvent.type.js";
import { moiCollectionType } from "../modules/MoiCollection/moiCollection.type.js";

export const typeDefs = [
    baseType,
    userType,
    createEventType,
    moiCollectionType,
];