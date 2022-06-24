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
exports.token = void 0;
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
const request = (0, supertest_1.default)(index_1.default);
exports.token = '';
describe('Users handlers', () => {
    it('creates user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.post('/user').send({
            firstname: 'muhammed',
            lastname: 'mustafa',
            email: 'muhammedmustafa@udacity',
            password_digest: 1234,
        });
        exports.token = res.body;
        expect(res.status).toBe(200);
    }));
    it('shows a list of users', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .get('/users')
            .set('Authorization', 'Bearer ' + exports.token);
        expect(res.status).toBe(200);
        expect(res.body).toBeTruthy();
        expect(res.body.length).toEqual(1);
        expect(res.body[0].id).toEqual(1);
    }));
    it('show user by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .get('/user/1')
            .set('Authorization', 'Bearer ' + exports.token);
        expect(res.status).toBe(200);
        expect(res.body).toBeTruthy();
        expect(res.body.firstname).toEqual('muhammed');
        expect(res.body.lastname).toEqual('mustafa');
        expect(res.body.email).toEqual('muhammedmustafa@udacity');
    }));
    it('delete user by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .delete('/deluser/1')
            .set('Authorization', 'Bearer ' + exports.token);
        expect(res.status).toBe(200);
    }));
});
