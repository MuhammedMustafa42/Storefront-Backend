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
const cyberwares_store_1 = require("../../models/cyberwares-store");
const product = new cyberwares_store_1.Cyberware();
describe('cyberwares Model', () => {
    it('should have an index method', () => {
        expect(product.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(product.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(product.create).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(product.delete).toBeDefined();
    });
    it('should have a update method', () => {
        expect(product.update).toBeDefined();
    });
    it('create method should add a new cyberware', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield product.create({
            name: 'monowire',
            price: 150,
        });
        expect(result).toEqual({
            id: 1,
            name: 'monowire',
            price: 150,
        });
    }));
    it('index method should return a list of cyberwares', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield product.index();
        expect(result).toEqual([
            {
                id: 1,
                name: 'monowire',
                price: 150,
            },
        ]);
    }));
    it('show method should return a specific cyberware', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield product.show(1);
        expect(result).toEqual({
            id: 1,
            name: 'monowire',
            price: 150,
        });
    }));
    it('delete method should remove a specific cyberware', () => __awaiter(void 0, void 0, void 0, function* () {
        product.delete(1);
        const result = yield product.index();
        expect(result).toEqual([]);
    }));
});
