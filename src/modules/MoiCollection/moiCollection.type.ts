
import { gql } from "graphql-request";

export const moiCollectionType = gql`
    type CashBreakdown {
        note: Float
        count: Float
    }

    input CashBreakdownInput {
        note: Float!
        count: Float!
    }

    type MoiCollection {
        id: ID!
        eventId: ID!
        operatorId: ID
        name: String
        place: String
        native: String
        work: String
        phoneNumber: String
        operatorName: String
        amount: Float
        amountReceived: Float
        balance: Float
        cashBreakdown: [CashBreakdown]
        createdTime: String
    }

    input CreateMoiCollectionInput {
        eventId: ID!
        operatorId: ID
        name: String
        place: String
        native: String
        work: String
        phoneNumber: String
        operatorName: String
        amount: Float
        amountReceived: Float
        balance: Float
        cashBreakdown: [CashBreakdownInput]
    }

    input UpdateMoiCollectionInput {
        eventId: ID
        operatorId: ID
        name: String
        place: String
        native: String
        work: String
        phoneNumber: String
        operatorName: String
        amount: Float
        amountReceived: Float
        balance: Float
        cashBreakdown: [CashBreakdownInput]
    }

    extend type Mutation {
        createMoiCollection(input: CreateMoiCollectionInput!): MoiCollection
        updateMoiCollection(id: ID!, input: UpdateMoiCollectionInput!): MoiCollection
        deleteMoiCollection(id: ID!): String
    }

    type PaginatedMoiCollection {
        data: [MoiCollection]
        total: Int
        totalMembers: Int
        totalAmount: Float
        page: Int
        limit: Int
    }

    extend type Query {
        getMoiByEvent(eventId: ID!, page: Int, limit: Int, search: String): PaginatedMoiCollection
    }
`;
