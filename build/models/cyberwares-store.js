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
exports.Cyberware = void 0;
const database_1 = __importDefault(require("../database"));
class Cyberware {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = 'SELECT * FROM cyberwares';
                const result = yield connect.query(sql);
                connect.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Cannot get all cyberwares ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = 'SELECT * FROM cyberwares WHERE id = ($1)';
                const result = yield connect.query(sql, [id]);
                connect.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Cannot find cyberware ${error}`);
            }
        });
    }
    create(cyberware) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = 'INSERT INTO cyberwares (name, price) VALUES ($1, $2) RETURNING *';
                const result = yield connect.query(sql, [
                    cyberware.name,
                    cyberware.price,
                ]);
                connect.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Cannot create cyberware ${error}`);
            }
        });
    }
    update(id, cyberware) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = 'UPDATE cyberwares SET name = $1, price = $2 WHERE id = ($3) RETURNING *';
                const result = yield connect.query(sql, [
                    cyberware.name,
                    cyberware.price,
                    id,
                ]);
                connect.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Cannot edit cyberware ${error}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = 'DELETE FROM cyberwares WHERE id = ($1)';
                const result = yield connect.query(sql, [id]);
                connect.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Cannot delete cyberware ${error}`);
            }
        });
    }
}
exports.Cyberware = Cyberware;
