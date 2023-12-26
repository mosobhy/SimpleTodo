import mongoose from 'mongoose'


export interface TodoDocument extends Document {
    user: string;
    task: string;
}
  
export const todoSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    task: String,
});
  
export const Todo = mongoose.model<TodoDocument>('Todo', todoSchema);