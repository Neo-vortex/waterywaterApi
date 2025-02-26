"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const tsoa_1 = require("tsoa"); // Import tsoa decorators
const userService = new user_service_1.UserService(); // Dependency injection can be used here in real-world apps
let UserController = class UserController {
    /**
     * Retrieve all users
     */
    async getAllUsers() {
        return await userService.getAllUsers();
    }
    /**
     * Retrieve a user by ID
     * @param id User's ID
     */
    async getUserById(id) {
        const user = await userService.getUserById(id);
        if (!user) {
            throw new Error(`User with ID ${id} not found`); // Alternatively, use custom exceptions
        }
        return user;
    }
    /**
     * Create a new user
     * @param requestBody User details
     */
    async createUser(requestBody) {
        return await userService.createUser(requestBody);
    }
    /**
     * Update an existing user by ID
     * @param id User's ID
     * @param requestBody New data for the user
     */
    async updateUser(id, requestBody) {
        const user = await userService.updateUser(id, requestBody);
        if (!user) {
            throw new Error(`User with ID ${id} not found`);
        }
        return user;
    }
    /**
     * Delete a user by ID
     * @param id User's ID
     */
    async deleteUser(id) {
        const success = await userService.deleteUser(id);
        if (!success) {
            throw new Error(`User with ID ${id} not found`);
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, tsoa_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, tsoa_1.Get)('/{id}'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, tsoa_1.Post)('/'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, tsoa_1.Put)('/{id}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, tsoa_1.Delete)('/{id}'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, tsoa_1.Route)('users') // Base route for the controller
    ,
    (0, tsoa_1.Tags)('User') // Tag used for OpenAPI documentation grouping
], UserController);
