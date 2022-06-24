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
const orders_1 = require("../../models/orders");
const store = new orders_1.Order();
describe('orders Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });
    it('should have a update method', () => {
        expect(store.update).toBeDefined();
    });
    it(`should have an orderProduct method`, () => {
        expect(store.orderProduct).toBeDefined();
    });
    it('create method should add a new order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.create({
            user_id: 1,
            status: 'active',
        });
        expect(result).toEqual({
            id: 1,
            user_id: 1,
            status: 'active',
        });
    }));
    it('index method should return a list of orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result).toEqual([
            {
                id: 1,
                user_id: 1,
                status: 'active',
            },
        ]);
    }));
    it('show method should return a specific order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.show(1);
        expect(result).toEqual({
            id: 1,
            user_id: 1,
            status: 'active',
        });
    }));
    it('delete method should remove a specific order', () => __awaiter(void 0, void 0, void 0, function* () {
        store.delete(1);
        const result = yield store.index();
        expect(result).toEqual([]);
    }));
});
