"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("./Documents/User");
const Task_1 = require("./Documents/Task");
dotenv_1.default.config();
mongoose_1.default.connect(`${String(process.env.DATABASE_HOST) + String(process.env.DATABASE_NAME)}`);
console.log(String(process.env.DATABASE_HOST));
console.log(String(process.env.DATABASE_NAME));
const userSeedData = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
];
const todoSeedData = [
    { user: 'user1', task: 'Task 1 for User 1' },
    { user: 'user1', task: 'Task 2 for User 1' },
    { user: 'user2', task: 'Task 1 for User 2' },
];
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_1.User.deleteMany({});
        yield Task_1.Todo.deleteMany({});
        const users = yield User_1.User.create(userSeedData);
        const userIds = users.map(user => user._id);
        const todos = todoSeedData.map(todo => {
            const userId = userIds.find(id => todo.user === id.toString());
            return Object.assign(Object.assign({}, todo), { user: userId });
        });
        yield Task_1.Todo.create(todos);
        console.log('Database seeded successfully');
    }
    catch (error) {
        console.error('Error seeding database:', error.message);
    }
    finally {
        mongoose_1.default.connection.close();
    }
});
seedDatabase();
