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
const cyberwares_store_1 = require("../models/cyberwares-store");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cyberwareStore = new cyberwares_store_1.Cyberware();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cyberwares = yield cyberwareStore.index();
        res.json(cyberwares);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cyberware = yield cyberwareStore.show(req.params.id);
        res.json(cyberware);
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
        const newCyberware = yield cyberwareStore.create(req.body);
        res.json(newCyberware);
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
        const deleteCyberware = yield cyberwareStore.delete(req.params.id);
        res.json(deleteCyberware);
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
        const updateCyberware = {
            name: req.body.name,
            price: req.body.price,
        };
        const updatedCyberware = yield cyberwareStore.update(req.body.id, updateCyberware);
        res.json(updatedCyberware);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
const cyberwares_routes = (app) => {
    app.get('/cyberwares', index);
    app.get('/cyberware/:id', show);
    app.post('/cyberware', create);
    app.delete('/delcyberware/:id', destroy);
    app.put('updatecyberware', update);
};
exports.default = cyberwares_routes;
