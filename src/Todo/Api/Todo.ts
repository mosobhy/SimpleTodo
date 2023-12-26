import express, { Request, Response } from 'express'
import { User } from '../../Database/Documents/User';
import { Todo, TodoDocument } from '../../Database/Documents/Task';
import { RequestWithUser } from '../Middlewares/AuthenticateUser';


const todo: express.Router = express.Router();


todo.post('/', async (req: RequestWithUser, res: Response) => {
    const { task } = req.body;
    const userId = await User.findOne({ username: req.user?.username })
    console.log(userId)
    const todo = new Todo({ user: userId, task });
    await todo.save();
    res.json(todo);
});
  
todo.get('/', async (req: RequestWithUser, res: Response) => {
    const userId = await User.findOne({ username: req.user?.username })
    const todos = await Todo.find({ user: userId });
    res.json(todos);
});
  
todo.put('/:id', async (req: RequestWithUser, res: Response) => {
    const id = req.params.id;
    const { task } = req.body;
    const todo = await Todo.findByIdAndUpdate(
        id,
        { task },
        { new: true }
        ) as TodoDocument;
    res.json(todo);
});
  
todo.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await Todo.findByIdAndDelete(id);
    res.json({ message: 'Todo deleted' });
});


export default todo;