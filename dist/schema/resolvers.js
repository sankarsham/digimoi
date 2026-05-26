// In-memory array to store registered users temporarily
const users = [];
export const resolvers = {
    Query: {
        users: () => users,
    },
    Mutation: {
        register: (_, args) => {
            const newUser = {
                id: String(users.length + 1),
                username: args.username,
                mobileNumber: args.mobileNumber,
                type: args.type,
                address: args.address,
            };
            users.push(newUser);
            return newUser;
        },
    },
};
//# sourceMappingURL=resolvers.js.map