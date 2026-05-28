import { moiModel } from "../../DB/MongoDB/User/CreateEvent.js";

export const CreateEventService = {
    async createEvent(input: any) {
        const {
            functionName,
            partyUsername,
            place,
            date,
            tamilDate,
            contactNumber,
            operatorName,
        } = input;

        const exists = await moiModel.findOne({ functionName, partyUsername });
        // if (exists) {
        //     throw new Error("Event with this function name and party username already exists");
        // }

        const newEvent = await moiModel.create({
            functionName,
            partyUsername,
            place,
            date,
            tamilDate,
            contactNumber,
            operatorName,
        });

        const populatedEvent = await moiModel.findById(newEvent._id).lean().exec();

        if (!populatedEvent) {
            throw new Error("Failed to create event");
        }

        return {
            id: populatedEvent._id.toString(),
            functionName: populatedEvent.functionName,
            partyUsername: populatedEvent.partyUsername,
            place: populatedEvent.place,
            date: populatedEvent.date ? new Date(populatedEvent.date).toISOString() : null,
            tamilDate: populatedEvent.tamilDate || null,
            contactNumber: populatedEvent.contactNumber || null,
            operatorName: populatedEvent.operatorName || null,
            createdTime: populatedEvent.createdTime ? new Date(populatedEvent.createdTime).toISOString() : null,
        };
    },

    async getAllEvents() {
        const events = await moiModel.find();
        return events.map((event) => ({
            id: event._id,
            functionName: event.functionName,
            partyUsername: event.partyUsername,
            place: event.place,
            date: event.date?.toISOString(),
            tamilDate: event.tamilDate,
            contactNumber: event.contactNumber,
            operatorName: event.operatorName || null,
            createdTime: event.createdTime?.toISOString(),
        }));
    },

    async updateEvent(id: string, input: any) {
        const updatedEvent = await moiModel.findByIdAndUpdate(id, input, { new: true }).lean().exec();
        if (!updatedEvent) {
            throw new Error("Event not found");
        }
        return {
            id: updatedEvent._id.toString(),
            functionName: updatedEvent.functionName,
            partyUsername: updatedEvent.partyUsername,
            place: updatedEvent.place,
            date: updatedEvent.date ? new Date(updatedEvent.date).toISOString() : null,
            tamilDate: updatedEvent.tamilDate || null,
            contactNumber: updatedEvent.contactNumber || null,
            operatorName: updatedEvent.operatorName || null,
            createdTime: updatedEvent.createdTime ? new Date(updatedEvent.createdTime).toISOString() : null,
        };
    },

    async deleteEvent(id: string) {
        const deletedEvent = await moiModel.findByIdAndDelete(id);
        if (!deletedEvent) {
            throw new Error("Event not found");
        }
        return "Event deleted successfully";
    }
};

