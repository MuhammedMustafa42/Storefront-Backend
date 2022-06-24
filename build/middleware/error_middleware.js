"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (error, req, res, next) => {
    const errorStatus = error.status || 500;
    const errorMsg = error.message || 'something went wrong!';
    res.status(errorStatus).send(`${errorStatus}: ${errorMsg}`);
    next();
};
exports.default = errorMiddleware;
