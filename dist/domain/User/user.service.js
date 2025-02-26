"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_repository_1 = require("./user.repository");
class UserService {
    async getAllUsers() {
        return await user_repository_1.UserRepository.find();
    }
    async getUserById(id) {
        return await user_repository_1.UserRepository.findOneBy({ id });
    }
    async createUser(data) {
        const user = user_repository_1.UserRepository.create(data);
        return await user_repository_1.UserRepository.save(user);
    }
    async updateUser(id, data) {
        const user = await this.getUserById(id);
        if (!user)
            return null;
        return await user_repository_1.UserRepository.save({ ...user, ...data });
    }
    async deleteUser(id) {
        const result = await user_repository_1.UserRepository.delete(id);
        return result.affected !== 0;
    }
}
exports.UserService = UserService;
