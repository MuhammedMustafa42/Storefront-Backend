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
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../../models/users");
const customer = new users_1.User();
describe('users Model', () => {
    it('should have an index method', () => {
        expect(customer.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(customer.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(customer.create).toBeDefined();
    });
    it('should have an authenticate method', () => {
        expect(customer.authenticate).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(customer.delete).toBeDefined();
    });
    it('should have a update method', () => {
        expect(customer.update).toBeDefined();
    });
    it('create method should add a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield customer.create({
            firstname: 'muhammed',
            lastname: 'mustafa',
            email: 'muhammedmustafa@udacity',
            password_digest: '1234',
        });
        expect(result).toEqual({
            id: 1,
            firstname: 'muhammed',
            lastname: 'mustafa',
            email: 'muhammedmustafa@udacity',
            password_digest: '1234',
        });
    }));
    it('index method should return a list of users', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield customer.index();
        expect(result).toEqual([
            {
                id: 1,
                firstname: 'muhammed',
                lastname: 'mustafa',
                email: 'muhammedmustafa@udacity',
                password_digest: '1234',
            },
        ]);
    }));
    it('show method should return a specific user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield customer.show(1);
        expect(result).toEqual({
            id: 1,
            firstname: 'muhammed',
            lastname: 'mustafa',
            email: 'muhammedmustafa@udacity',
            password_digest: '1234',
        });
    }));
    it('delete method should remove a specific user', () => __awaiter(void 0, void 0, void 0, function* () {
        customer.delete(1);
        const result = yield customer.index();
        expect(result).toEqual([]);
    }));
});
