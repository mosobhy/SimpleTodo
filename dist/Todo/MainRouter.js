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
const AuthenticateUser_1 = __importDefault(require("./Middlewares/AuthenticateUser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Todo_1 = __importDefault(require("./Api/Todo"));
const User_1 = require("../Database/Documents/User");
const mainiRoute = express_1.default.Router();
mainiRoute.post('/resgister', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = new User_1.User({ username, password });
    yield user.save();
    res.json({ message: "User registered successfully" });
}));
mainiRoute.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield User_1.User.findOne({ username, password });
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jsonwebtoken_1.default.sign({ username: user.username }, String(process.env.JWT_SECRET_KEY), {
        expiresIn: '1h',
    });
    res.json({ token });
}));
mainiRoute.use(AuthenticateUser_1.default);
mainiRoute.use('/todos/', Todo_1.default);
exports.default = mainiRoute;
