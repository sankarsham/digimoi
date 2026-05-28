import { userResolvers } from "../modules/User/User.resolvers.js";
import { createEventResolvers } from "../modules/Moi/createEvent.resolvers.js";
import { moiCollectionResolvers } from "../modules/MoiCollection/moiCollection.resolvers.js";

export const resolvers = [
    userResolvers,
    createEventResolvers,
    moiCollectionResolvers,
];