
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
        cashBreakdown: [CashBreakdown]
        description: String
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
        cashBreakdown: [CashBreakdownInput]
        description: String
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
        cashBreakdown: [CashBreakdownInput]
        description: String
    }

    extend type Mutation {
        createMoiCollection(input: CreateMoiCollectionInput!): MoiCollection
        updateMoiCollection(id: ID!, input: UpdateMoiCollectionInput!): MoiCollection
    }

    extend type Query {
        getMoiByEvent(eventId: ID!): [MoiCollection]
    }
`;
