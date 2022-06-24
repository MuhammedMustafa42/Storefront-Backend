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
const orders_1 = require("../models/orders");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const productOrder = new orders_1.Order();
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
        const orders = yield productOrder.index();
        res.json(orders);
    }
    catch (error) {
        res.status(400).json(error);
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
        const order = yield productOrder.show(req.params.id);
        res.json(order);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const order = yield productOrder.create(req.body);
        res.json(order);
    }
    catch (error) {
        res.status(400).json(error);
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
        const deleteOrder = yield productOrder.delete(req.params.id);
        res.json(deleteOrder);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const updateOrder = {
            user_id: req.body.user_id,
            status: req.body.status,
        };
        const updatedOrder = yield productOrder.update(req.body.id, updateOrder);
        res.json(updatedOrder);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const order = yield productOrder.orderProduct(req.body);
        res.json(order);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
const orders_routes = (app) => {
    app.get('/orders', index);
    app.get('/order/:id', show);
    app.post('/order', create);
    app.delete('/delorder/:id', destroy);
    app.put('updateorder', update);
    app.post('/placeorder', createOrder);
};
exports.default = orders_routes;
