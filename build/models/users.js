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
exports.User = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;
class User {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = 'SELECT * FROM users';
                const result = yield connect.query(sql);
                connect.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Cannot get all users ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = 'SELECT * FROM users WHERE id = ($1)';
                const result = yield database_1.default.query(sql, [id]);
                connect.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Cannot find user ${error}`);
            }
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = 'INSERT INTO users (firstname, lastname, email, password_digest) VALUES ($1, $2, $3, $4) RETURNING *';
                const hash = bcrypt_1.default.hashSync(user.password_digest + pepper, parseInt(saltRounds));
                const result = yield connect.query(sql, [
                    user.firstname,
                    user.lastname,
                    user.email,
                    hash,
                ]);
                connect.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Cannot create user ${error}`);
            }
        });
    }
    authenticate(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = 'SELECT password_digest FROM users WHERE email=($1)';
                const result = yield connect.query(sql, [email]);
                connect.release();
                if (result.rows.length) {
                    const user = result.rows[0];
                    if (bcrypt_1.default.compareSync(password + pepper, user.password_digest)) {
                        return user;
                    }
                }
                return null;
            }
            catch (error) {
                throw new Error(`Cannot authenticate user ${error}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
                const result = yield connect.query(sql, [id]);
                connect.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Cannot delete user ${error}`);
            }
        });
    }
    update(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'UPDATE users SET firstname = $1, lastname = $2, email = $3, password_digest = $4 WHERE id = $(5) RETURNING *';
                const result = yield conn.query(sql, [user.firstname, user.lastname, user.email, user.password_digest, id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Cannot edit user ${error}`);
            }
        });
    }
}
exports.User = User;
