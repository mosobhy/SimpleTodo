import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { User } from './Documents/User';
import { Todo } from './Documents/Task';

dotenv.config()

mongoose.connect(`${String(process.env.DATABASE_HOST) + String(process.env.DATABASE_NAME)}`)

console.log(String(process.env.DATABASE_HOST))
console.log(String(process.env.DATABASE_NAME))


const userSeedData = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
];

const todoSeedData = [
    { user: 'user1', task: 'Task 1 for User 1' },
    { user: 'user1', task: 'Task 2 for User 1' },
    { user: 'user2', task: 'Task 1 for User 2' },
];

const seedDatabase = async () => {
    try {
        await User.deleteMany({});
        await Todo.deleteMany({});

        const users = await User.create(userSeedData);
        const userIds = users.map(user => user._id);

        const todos = todoSeedData.map(todo => {
        const userId = userIds.find(id => todo.user === id.toString());
        return { ...todo, user: userId };
        });

        await Todo.create(todos);

        console.log('Database seeded successfully');
    } catch (error: any) {
        console.error('Error seeding database:', error.message);
    } finally {
        mongoose.connection.close();
    }
};

seedDatabase();