import { CreateEventService } from "./createEvent.services.js";

export const createEventResolvers = {
    Query: {
        getAllEvents: async (_: any, __: any, context: any) => {
            if (!context || !context.user) {
                throw new Error("Unauthorized");
            }
            
            return CreateEventService.getAllEvents();
        }
    },
    Mutation: {
        createEvent: async (_: any, { input }: any, context: any) => {
            if (!context || !context.user) {
                throw new Error("Unauthorized");
            }
            if (context.user.userType !== "A" && context.user.userType !== "S") {
                throw new Error("Unauthorized: Admin access required");
            }

            // if (context.user.userType !== "S") {
            //     throw new Error("Unauthorized: SuperAdmin access required");
            // }

            return CreateEventService.createEvent(input);
        },
        updateEvent: async (_: any, { id, input }: any, context: any) => {
            if (!context || !context.user) {
                throw new Error("Unauthorized");
            }
            if (context.user.userType !== "A" && context.user.userType !== "S") {
                throw new Error("Unauthorized: Admin access required");
            }
            return CreateEventService.updateEvent(id, input);
        },
        deleteEvent: async (_: any, { id }: any, context: any) => {
            if (!context || !context.user) {
                throw new Error("Unauthorized");
            }
            // Allow Admins and SuperAdmins to delete events
            if (context.user.userType !== "S" && context.user.userType !== "A") {
                throw new Error("Unauthorized: Admin or SuperAdmin access required");
            }
            return CreateEventService.deleteEvent(id);
        }
    }
};
