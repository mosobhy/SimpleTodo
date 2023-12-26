import mongoose from 'mongoose'


export interface UserDocument extends Document {
    username: string;
    password: string;
}

export const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

export const User = mongoose.model<UserDocument>('User', userSchema);