export const typeDefs = `#graphql
  type User {
    id: ID!
    username: String!
    mobileNumber: String!
    type: String!
    address: String!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    register(username: String!, mobileNumber: String!, type: String!, address: String!): User
  }
`;
//# sourceMappingURL=base.type.js.map