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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
const _1_users_spec_1 = require("./1-users_spec");
const request = (0, supertest_1.default)(index_1.default);
describe('cyberwares handlers', () => {
    it('creates a cyberware', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .post('/cyberware')
            .send({ name: 'monowire', price: 150 })
            .set('Authorization', 'Bearer ' + _1_users_spec_1.token);
        expect(res.status).toBe(200);
    }));
    it('show all cyberwares', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get('/cyberwares');
        expect(res.status).toBe(200);
        expect(res.body).toBeTruthy();
        expect(res.body.length).toEqual(1);
        expect(res.body[0].id).toEqual(1);
    }));
    it('get cyberware by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get('/cyberware/1');
        expect(res.status).toBe(200);
        expect(res.body).toBeTruthy();
        expect(res.body.name).toEqual('monowire');
        expect(res.body.price).toEqual(150);
    }));
    it('deletes cyberware by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .delete('/delcyberware/1')
            .set('Authorization', 'Bearer ' + _1_users_spec_1.token);
        expect(res.status).toBe(200);
    }));
});
