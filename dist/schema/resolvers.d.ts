export declare const resolvers: {
    Query: {
        users: () => any[];
    };
    Mutation: {
        register: (_: any, args: {
            username: string;
            mobileNumber: string;
            type: string;
            address: string;
        }) => {
            id: string;
            username: string;
            mobileNumber: string;
            type: string;
            address: string;
        };
    };
};
//# sourceMappingURL=resolvers.d.ts.map