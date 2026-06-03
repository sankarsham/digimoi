import { UserService } from "./User.services.js";

// Only Admin (A) and SuperAdmin (S) can manage users
const ALLOWED_ROLES = ["A", "S"];

function requireAdminOrSuperAdmin(context: any) {
    const userType = context?.user?.userType;
    if (!userType || !ALLOWED_ROLES.includes(userType)) {
        throw new Error("Access denied. Only Admin or SuperAdmin can perform this action.");
    }
}

export const userResolvers = {
    Query: {
        getAllUsers: async (_: any, __: any, context: any) => {
            requireAdminOrSuperAdmin(context);
            return UserService.getAllUsers();
        }
    },
    Mutation: {
        register: async (_: any, { input }: any, context: any) => {
            requireAdminOrSuperAdmin(context);
            return UserService.register(input);
        },
        login: async (_: any, { input }: any) => {
            // Login is public — no role check
            return UserService.loginUser(input);
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
