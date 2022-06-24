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
exports.Order = void 0;
const database_1 = __importDefault(require("../database"));
class Order {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Cannot get all orders ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders WHERE id = ($1)';
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Cannot get this order ${error}`);
            }
        });
    }
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *';
                const result = yield conn.query(sql, [order.user_id, order.status]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Cannot create order ${error}`);
            }
        });
    }
    update(id, order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'UPDATE orders SET status = $1 WHERE id = $(2) RETURNING *';
                const result = yield conn.query(sql, [order.status, id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Cannot edit the order ${error}`);
            }
        });
    }
    orderProduct(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO orders (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
                const result = yield conn.query(sql, [
                    order.order_id,
                    order.product_id,
                    order.quantity,
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Cannot place order ${error}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = 'DELETE FROM orders WHERE id = ($1)';
                const result = yield connect.query(sql, [id]);
                connect.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Cannot delete order ${error}`);
            }
        });
    }
}
exports.Order = Order;
