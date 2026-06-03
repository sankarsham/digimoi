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
            description,
        } = input;

        const newEvent = await moiModel.create({
            functionName,
            partyUsername,
            place,
            date: date || undefined,
            tamilDate,
            contactNumber,
            operatorName,
            description,
        });

        const populatedEvent = await moiModel.findById(newEvent._id).lean().exec();

        if (!populatedEvent) {
            throw new Error("Failed to create event");
        }

        return {
            id: populatedEvent._id.toString(),
            functionName: populatedEvent.functionName || null,
            partyUsername: populatedEvent.partyUsername || null,
            place: populatedEvent.place || null,
            date: populatedEvent.date || null,
            tamilDate: populatedEvent.tamilDate || null,
            contactNumber: populatedEvent.contactNumber || null,
            operatorName: populatedEvent.operatorName || null,
            description: populatedEvent.description || null,
            createdTime: populatedEvent.createdTime
                ? new Date(populatedEvent.createdTime).toISOString()
                : null,
        };
    },

    async getAllEvents() {
        const events = await moiModel.find().lean().exec();
        return events.map((event) => ({
            id: event._id.toString(),
            functionName: event.functionName || null,
            partyUsername: event.partyUsername || null,
            place: event.place || null,
            date: event.date || null,
            tamilDate: event.tamilDate || null,
            contactNumber: event.contactNumber || null,
            operatorName: event.operatorName || null,
            description: event.description || null,
            createdTime: event.createdTime
                ? new Date(event.createdTime).toISOString()
                : null,
        }));
    },

    async updateEvent(id: string, input: any) {
        const updatedEvent = await moiModel
            .findByIdAndUpdate(id, input, { new: true })
            .lean()
            .exec();

        if (!updatedEvent) {
            throw new Error("Event not found");
        }

        return {
            id: updatedEvent._id.toString(),
            functionName: updatedEvent.functionName || null,
            partyUsername: updatedEvent.partyUsername || null,
            place: updatedEvent.place || null,
            date: updatedEvent.date || null,
            tamilDate: updatedEvent.tamilDate || null,
            contactNumber: updatedEvent.contactNumber || null,
            operatorName: updatedEvent.operatorName || null,
            description: updatedEvent.description || null,
            createdTime: updatedEvent.createdTime
                ? new Date(updatedEvent.createdTime).toISOString()
                : null,
        };
    },

    async deleteEvent(id: string) {
        const deletedEvent = await moiModel.findByIdAndDelete(id);
        if (!deletedEvent) {
            throw new Error("Event not found");
        }
        return "Event deleted successfully";
    },
};
