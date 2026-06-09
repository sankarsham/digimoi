import { MoiCollectionService } from "./moiCollection.services.js";

export const moiCollectionResolvers = {
    Query: {
        getMoiByEvent: async (_: any, { eventId, page = 1, limit = 10, search = "" }: any, context: any) => {
            if (!context || !context.user) {
                throw new Error("Unauthorized");
            }
            return MoiCollectionService.getMoiByEvent(eventId, page, limit, search);
        }
    },
    Mutation: {
        createMoiCollection: async (_: any, { input }: any, context: any) => {
            if (!context || !context.user) {
                throw new Error("Unauthorized");
            }
            if (context.user.userType !== "O" && context.user.userType !== "A" && context.user.userType !== "S") {
                throw new Error("Unauthorized: Operator or Admin access required");
            }
            return MoiCollectionService.createMoiCollection(input);
        },

        updateMoiCollection: async (_: any, { id, input }: any, context: any) => {
            if (!context || !context.user) {
                throw new Error("Unauthorized");
            }
            if (context.user.userType !== "A" && context.user.userType !== "S") {
                throw new Error("Unauthorized: Admin or SuperAdmin access required to update");
            }
            return MoiCollectionService.updateMoiCollection(id, input);
        },

        deleteMoiCollection: async (_: any, { id }: any, context: any) => {
            if (!context || !context.user) {
                throw new Error("Unauthorized");
            }
            if (context.user.userType !== "A" && context.user.userType !== "S") {
                throw new Error("Unauthorized: Admin or SuperAdmin access required to delete");
            }
            return MoiCollectionService.deleteMoiCollection(id);
        }
    }
};
