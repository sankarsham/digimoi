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
            createdTime: populatedMoi.createdTime ? new Date(populatedMoi.createdTime).toISOString() : null,
        };
    },

    async updateMoiCollection(id: string, input: any) {
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
            createdTime: updateMoi.createdTime ? new Date(updateMoi.createdTime).toISOString() : null,


        }
    },
    async deleteMoiCollection(id: string) {
        if (!id || !Types.ObjectId.isValid(id)) {
            throw new Error("Invalid Moi collection ID");
        }
        const deletedMoi = await MoiCollectionModel.findByIdAndDelete(id).exec();
        if (!deletedMoi) {
            throw new Error("Moi collection not found or already deleted");
        }
        return "Moi collection deleted successfully";
    },
    async getMoiByEvent(eventId: string, page: number = 1, limit: number = 10, search: string = "") {
        if (!eventId || !Types.ObjectId.isValid(eventId)) {
            throw new Error("Invalid event ID");
        }

        const query: any = { eventId: new Types.ObjectId(eventId) };

        console.log("SEARCH TERM IS:", typeof search, search);

        if (search && search !== "undefined" && search !== "null" && search.trim() !== "") {
            const orConditions: any[] = [
                { name: { $regex: search, $options: "i" } },
                { place: { $regex: search, $options: "i" } },
                { phoneNumber: { $regex: search, $options: "i" } },
                { native: { $regex: search, $options: "i" } },
                { operatorName: { $regex: search, $options: "i" } }
            ];

            const searchNumber = Number(search);
            if (!isNaN(searchNumber)) {
                orConditions.push({ amount: searchNumber });
            }

            query.$or = orConditions;
        }

        const skip = (page - 1) * limit;

        const [moiList, total, totalMembers, agg] = await Promise.all([
            MoiCollectionModel.find(query).sort({ createdTime: -1 }).skip(skip).limit(limit).lean().exec(),
            MoiCollectionModel.countDocuments(query),
            MoiCollectionModel.countDocuments({ eventId: new Types.ObjectId(eventId) }),
            MoiCollectionModel.aggregate([
                { $match: { eventId: new Types.ObjectId(eventId) } },
                { $group: { _id: null, totalAmount: { $sum: { $toDouble: "$amount" } } } }
            ])
        ]);

        const totalAmount = agg.length > 0 ? agg[0].totalAmount : 0;

        return {
            data: moiList.map((moi: any) => ({
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
                createdTime: moi.createdTime ? new Date(moi.createdTime).toISOString() : null,
            })),
            total,
            totalMembers,
            totalAmount,
            page,
            limit
        };
    }
};
