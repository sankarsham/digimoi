import { userModel } from "../../DB/MongoDB/User/User.js";
import bcrypt from "bcryptjs";
import { signToken } from "../../helpers/validation.js";

export const UserService = {

    async getAllUsers() {
        const users = await userModel.find();
        return users.map((user) =>({
            id: user._id,
            username: user.username,
            mobile: user.mobile,
            userType: user.userType,
            address: user.address,
            email: user.email,
            gender: user.gender,
        
        }))
        
    },
    async register(input: any) {
        const { username, mobile, userType, address, email, password, gender } = input;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            throw new Error("User already exists with this email");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            username,
            mobile,
            userType: userType || "null",
            address,
            email,
            password: hashedPassword,
            gender: gender || "null",
        });

        const token = signToken({ id: newUser._id, email: newUser.email, userType: newUser.userType });

        return {
            user: {
                id: newUser._id,
                username: newUser.username,
                mobile: newUser.mobile,
                userType: newUser.userType,
                address: newUser.address,
                email: newUser.email,
                gender: newUser.gender,
                createdTime: newUser.createdTime?.toISOString(),
            },
            token,
        };
    },
    async loginUser(input: any){
        const { email, password } = input;
        const user = await userModel.findOne({ email });

        if (!user || !user.password){
            throw new Error("Invalid email or password");
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }

        const token = signToken({ id: user._id, email: user.email, userType: user.userType });

        return {
            user: {
                id: user._id,
                username: user.username,
                mobile: user.mobile,
                userType: user.userType,
                address: user.address,
                email: user.email,
                gender: user.gender,
                createdTime: user.createdTime?.toISOString(),
            },
            token,
        };
    },

    async updateUser(id: string, input: any) {
        const updatedUser = await userModel
            .findByIdAndUpdate(id, input, { new: true })
            .exec();

        if (!updatedUser) {
            throw new Error("User not found");
        }

        return {
            id: updatedUser._id,
            username: updatedUser.username,
            mobile: updatedUser.mobile,
            userType: updatedUser.userType,
            address: updatedUser.address,
            email: updatedUser.email,
            gender: updatedUser.gender,
            createdTime: updatedUser.createdTime ? new Date(updatedUser.createdTime).toISOString() : null,
        };
    },

    async deleteUser(id: string) {
        const deletedUser = await userModel.findByIdAndDelete(id);
        if (!deletedUser) {
            throw new Error("User not found");
        }
        return "User deleted successfully";
    },
};