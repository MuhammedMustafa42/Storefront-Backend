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
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const customer = new users_1.User();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const headerAuth = req.headers.authorization;
        const token = headerAuth.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (error) {
        res.status(401);
        res.json(`Access denied, invalid token ${error}`);
        return;
    }
    try {
        const users = yield customer.index();
        res.json(users);
    }
    catch (error) {
        throw new Error(`Cannot view users ${error}`);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const headerAuth = req.headers.authorization;
        const token = headerAuth.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (error) {
        res.status(401);
        res.json(`Access denied, invalid token ${error}`);
        return;
    }
    try {
        const user = yield customer.show(parseInt(req.params.id));
        res.json(user);
    }
    catch (error) {
        throw new Error(`Cannot show user ${error}`);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield customer.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password_digest: req.body.password_digest,
        });
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (error) {
        throw new Error(`Cannot create user ${error}`);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const headerAuth = req.headers.authorization;
        const token = headerAuth.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        if (decoded.user.email !== req.body.email) {
            throw new Error(`Email doesn't match`);
        }
    }
    catch (error) {
        res.json(error);
    }
    try {
        const updateUser = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password_digest: req.body.password_digest,
        };
        const updatedUser = yield customer.update(req.body.id, updateUser);
        res.json(updatedUser);
    }
    catch (error) {
        throw new Error(`Cannot update user ${error}`);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const headerAuth = req.headers.authorization;
        const token = headerAuth.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (error) {
        res.status(401);
        res.json(`Access denied, invalid token ${error}`);
        return;
    }
    try {
        const remove = yield customer.delete(parseInt(req.params.id));
        res.json(remove);
    }
    catch (error) {
        throw new Error(`Cannot delete user ${error}`);
    }
});
const users_routes = (app) => {
    app.get('/users', index);
    app.get('/user/:id', show);
    app.post('/user', create);
    app.put('/updateuser', update);
    app.delete('/deluser/:id', destroy);
};
exports.default = users_routes;
