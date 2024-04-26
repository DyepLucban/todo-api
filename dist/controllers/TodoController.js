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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getAllTask = void 0;
const database_1 = require("../config/database");
const getAllTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield database_1.pool.connect();
        const result = yield client.query('SELECT * FROM tasks ORDER BY id');
        const tasks = result.rows;
        client.release();
        res.json(tasks);
    }
    catch (error) {
        res.status(500).send('Internal Server Error');
    }
});
exports.getAllTask = getAllTask;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { task_name } = req.body;
    try {
        const client = yield database_1.pool.connect();
        const result = yield client.query('INSERT INTO tasks (task_name) VALUES ($1) RETURNING *', [task_name]);
        const newTask = result.rows[0];
        client.release();
        res.status(201).json(newTask);
    }
    catch (error) {
        console.error('Error creating task', error);
        res.status(500).send('Internal Server Error');
    }
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { task_name } = req.body;
    try {
        const client = yield database_1.pool.connect();
        const result = yield client.query('UPDATE tasks SET task_name = $1 WHERE id = $2 RETURNING *', [task_name, id]);
        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Task not found!' });
        }
        const updatedTask = result.rows[0];
        client.release();
        res.status(201).json(updatedTask);
    }
    catch (error) {
        console.error('Error updating task', error);
        res.status(500).send('Internal Server Error');
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const client = yield database_1.pool.connect();
        const result = yield client.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Task not found!' });
        }
        const updatedTask = result.rows[0];
        client.release();
        res.status(201).json(updatedTask);
    }
    catch (error) {
        console.error('Error deleting task', error);
        res.status(500).send('Internal Server Error');
    }
});
exports.deleteTask = deleteTask;
