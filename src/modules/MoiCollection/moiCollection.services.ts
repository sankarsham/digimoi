import { MoiCollectionModel } from "../../DB/MongoDB/User/MoiCollection.js";
import { moiModel } from "../../DB/MongoDB/User/CreateEvent.js";
import { Types } from "mongoose";

export const MoiCollectionService = {
    async createMoiCollection(input: any) {
        const {
            eventId,
            operatorId,
            name,
            place,
            native,
            work,
            phoneNumber,
            operatorName,
            amount,
            cashBreakdown,
            description,
        } = input;
        
        if (!eventId || !Types.ObjectId.isValid(eventId)) {
            throw new Error("Invalid event ID");
        }

        const event = await moiModel.findById(eventId);
        if (!event) {
            throw new Error("Event not found");
        }

        const moiData: any = {
            eventId: new Types.ObjectId(eventId),
            name,
            place,
            native,
            work,
            phoneNumber,
            operatorName,
            amount,
            cashBreakdown: cashBreakdown || [],
            description,
        };

        if (operatorId && Types.ObjectId.isValid(operatorId)) {
            moiData.operatorId = new Types.ObjectId(operatorId);
        }

        const newMoi = await MoiCollectionModel.create(moiData);

        const populatedMoi = await MoiCollectionModel.findById(newMoi._id).lean().exec();

        if (!populatedMoi) {
            throw new Error("Failed to create Moi collection");
        }

        return {
            id: populatedMoi._id.toString(),
            eventId: populatedMoi.eventId.toString(),
            operatorId: populatedMoi.operatorId ? populatedMoi.operatorId.toString() : null,
            name: populatedMoi.name || null,
            place: populatedMoi.place || null,
            native: populatedMoi.native || null,
            work: populatedMoi.work || null,
            phoneNumber: populatedMoi.phoneNumber || null,
            operatorName: populatedMoi.operatorName || null,
            amount: populatedMoi.amount || null,
            cashBreakdown: populatedMoi.cashBreakdown || [],
            description: populatedMoi.description || null,
            createdTime: populatedMoi.createdTime ? new Date(populatedMoi.createdTime).toISOString() : null,
        };
    },
    
    async updateMoiCollection(id: string, input: any){
       const updateMoi = await MoiCollectionModel.findByIdAndUpdate(id, input, { returnDocument: 'after' }).lean().exec();
       if (!updateMoi) {
        throw new Error("Moi collection Error")
       }

       return {
        id: updateMoi._id.toString(),
        eventId: updateMoi.eventId.toString(),
        operatorId: updateMoi.operatorId?.toString(),
        name: updateMoi.name || null,
        place: updateMoi.place || null,
        native: updateMoi.native || null,
        work: updateMoi.work || null,
        phoneNumber: updateMoi.phoneNumber || null,
        operatorName: updateMoi.operatorName || null,
        amount: updateMoi.amount || null,
        cashBreakdown: updateMoi.cashBreakdown || [],
        description: updateMoi.description || null,
        createdTime: updateMoi.createdTime ? new Date(updateMoi.createdTime).toString(): null,
        

       }
    },
    async getMoiByEvent(eventId: string) {
        if (!eventId || !Types.ObjectId.isValid(eventId)) {
            throw new Error("Invalid event ID");
        }

        const moiList = await MoiCollectionModel.find({ eventId: new Types.ObjectId(eventId) }).lean().exec();

        return moiList.map((moi) => ({
            id: moi._id.toString(),
            eventId: moi.eventId.toString(),
            operatorId: moi.operatorId ? moi.operatorId.toString() : null,
            name: moi.name || null,
            place: moi.place || null,
            native: moi.native || null,
            work: moi.work || null,
            phoneNumber: moi.phoneNumber || null,
            operatorName: moi.operatorName || null,
            amount: moi.amount || null,
            cashBreakdown: moi.cashBreakdown || [],
            description: moi.description || null,
            createdTime: moi.createdTime ? new Date(moi.createdTime).toISOString() : null,
        }));
    }
};
