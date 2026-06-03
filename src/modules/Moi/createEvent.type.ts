import { gql } from "graphql-request";

export const createEventType = gql`
    type Event {
        id: ID!
        functionName: String
        partyUsername: String
        place: String
        date: String
        tamilDate: String
        contactNumber: Float
        operatorName: String
        description: String
        createdTime: String
    }

    input CreateEventInput {
        functionName: String
        partyUsername: String
        place: String
        date: String
        tamilDate: String
        contactNumber: Float
        operatorName: String
        description: String
    }

    input UpdateEventInput {
        functionName: String
        partyUsername: String
        place: String
        date: String
        tamilDate: String
        contactNumber: Float
        operatorName: String
        description: String
    }

    extend type Mutation {
        createEvent(input: CreateEventInput!): Event
        updateEvent(id: ID!, input: UpdateEventInput!): Event
        deleteEvent(id: ID!): String
    }
    
    extend type Query {
        getAllEvents: [Event]
    }
`;
