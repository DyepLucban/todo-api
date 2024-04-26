"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TodoController_1 = require("../controllers/TodoController");
const router = express_1.default.Router();
router.get('/task', TodoController_1.getAllTask);
router.post('/task', TodoController_1.createTask);
router.put('/task/:id', TodoController_1.updateTask);
router.delete('/task/:id', TodoController_1.deleteTask);
exports.default = router;
