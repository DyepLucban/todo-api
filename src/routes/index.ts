import express from 'express';
import { getAllTask, createTask, updateTask, deleteTask } from '../controllers/TodoController';

const router = express.Router();

router.get('/task', getAllTask);
router.post('/task', createTask);
router.put('/task/:id', updateTask);
router.delete('/task/:id', deleteTask);

export default router;