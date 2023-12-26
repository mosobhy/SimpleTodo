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
const express_1 = __importDefault(require("express"));
const User_1 = require("../../Database/Documents/User");
const Task_1 = require("../../Database/Documents/Task");
const todo = express_1.default.Router();
todo.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { task } = req.body;
    const userId = yield User_1.User.findOne({ username: (_a = req.user) === null || _a === void 0 ? void 0 : _a.username });
    console.log(userId);
    const todo = new Task_1.Todo({ user: userId, task });
    yield todo.save();
    res.json(todo);
}));
todo.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = yield User_1.User.findOne({ username: (_b = req.user) === null || _b === void 0 ? void 0 : _b.username });
    const todos = yield Task_1.Todo.find({ user: userId });
    res.json(todos);
}));
todo.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { task } = req.body;
    const todo = yield Task_1.Todo.findByIdAndUpdate(id, { task }, { new: true });
    res.json(todo);
}));
todo.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield Task_1.Todo.findByIdAndDelete(id);
    res.json({ message: 'Todo deleted' });
}));
exports.default = todo;
