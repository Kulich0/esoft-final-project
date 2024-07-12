"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authorizeRole = (roles) => {
    return (req, res, next) => {
        var _a;
        const personal_token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!personal_token) {
            return res.status(401).json({ message: 'No authorization header provided' });
        }
        jsonwebtoken_1.default.verify(personal_token, process.env.JWT_ACCESS_SECRET, (err, decodedToken) => {
            var _a;
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }
            const decodedPersonal = decodedToken;
            req.personal = decodedPersonal;
            const personalRoles = ((_a = req.personal) === null || _a === void 0 ? void 0 : _a.roles) || [];
            const hasRole = roles.some(role => personalRoles.includes(role));
            if (!hasRole) {
                return res.status(403).json({ message: 'Access denied' });
            }
            next();
        });
    };
};
exports.default = authorizeRole;
