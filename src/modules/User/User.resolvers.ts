import { UserService } from "./User.services.js";

export const userResolvers = {
    Query: {
        getAllUsers: async () =>{
            return UserService.getAllUsers();
        }
    },
    Mutation: {
        register: async (_: any, { input }: any) => {
            return UserService.register(input);
        },
        login: async (_: any, { input }: any) => {
            return UserService.loginUser(input);
        },
        logoutUser: async (_: any, { id }: any) => {
            return UserService.logoutUser(id);
        },
        updateUser: async (_: any, { id, input }: any, context: any) => {
            requireAdminOrSuperAdmin(context);
            return UserService.updateUser(id, input);
        },
        deleteUser: async (_: any, { id }: any, context: any) => {
            requireAdminOrSuperAdmin(context);
            return UserService.deleteUser(id);
        },
    },
};
