import express, { Request, Response } from 'express'
import authenticateUser from './Middlewares/AuthenticateUser';
import jwt from 'jsonwebtoken'
import todo  from './Api/Todo'
import { User } from '../Database/Documents/User';


const mainiRoute: express.Router = express.Router();


mainiRoute.post('/resgister', async (req: Request, res: Response) => {
    const { username, password } = req.body
    const user = new User({ username, password })
    await user.save()
    res.json({ message: "User registered successfully"})
})

mainiRoute.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ username: user.username }, String(process.env.JWT_SECRET_KEY), {
        expiresIn: '1h',
    });

    res.json({ token });
})

mainiRoute.use(authenticateUser);
mainiRoute.use('/todos/', todo);


export default mainiRoute;