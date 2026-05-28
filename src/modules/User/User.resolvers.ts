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
        }
    },
};
