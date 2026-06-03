import { gql } from "apollo-server-express";

export const userType = gql`
    enum UserType {
        SA
        A
        S
        O
    }

    enum Gender {
        MALE
        FEMALE
        OTHER
    }

    type User {
        id: ID!
        username: String!
        mobile: String!
        userType: UserType
        address: String!
        email: String!
        gender: Gender
        createdTime: String
    }

    input RegisterInput {
        username: String!
        mobile: String!
        userType: UserType
        address: String!
        email: String!
        password: String!
        gender: Gender
    }

    input UpdateUserInput {
        username: String
        mobile: String
        userType: UserType
        address: String
        email: String
        gender: Gender
    }

    type RegisterResponse {
        user: User
        token: String
    }

    input LoginInput {
        email: String!
        password: String!
    }

    extend type Query {
        getAllUsers: [User]
    }

    extend type Mutation {
        register(input: RegisterInput!): RegisterResponse!
        login(input: LoginInput!): RegisterResponse!
        updateUser(id: ID!, input: UpdateUserInput!): User!
        deleteUser(id: ID!): String!
    }
`;
