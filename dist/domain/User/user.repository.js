"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_entity_1 = require("./user.entity");
const orm_1 = require("../../config/orm");
exports.UserRepository = orm_1.AppDataSource.getRepository(user_entity_1.User);
