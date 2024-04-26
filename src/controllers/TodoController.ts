import { Request, Response } from 'express';
import { pool } from '../config/database';
import { Tasks } from '../models/Tasks';

export const getAllTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM tasks ORDER BY id');
    const tasks = result.rows as Tasks[];
    client.release();
    res.json(tasks);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
  const { task_name } = req.body;
  
  try {
    const client = await pool.connect();
    const result = await client.query('INSERT INTO tasks (task_name) VALUES ($1) RETURNING *', [task_name]);
    const newTask = result.rows[0] as Tasks;
    client.release();
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task', error);
    res.status(500).send('Internal Server Error');
  }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { task_name } = req.body

  try {
    const client = await pool.connect();
    const result = await client.query('UPDATE tasks SET task_name = $1 WHERE id = $2 RETURNING *', [task_name, id]);

    if (result.rowCount === 0) {
      res.status(404).json({ message: 'Task not found!'});
    }

    const updatedTask = result.rows[0] as Tasks;
    client.release();
    res.status(201).json(updatedTask);
  } catch (error) {
    console.error('Error updating task', error);
    res.status(500).send('Internal Server Error');    
  }
}

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const client = await pool.connect();
    const result = await client.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    
    if (result.rowCount === 0) {
      res.status(404).json({ message: 'Task not found!'});
    }

    const updatedTask = result.rows[0] as Tasks;
    client.release();
    res.status(201).json(updatedTask);
  } catch (error) {
    console.error('Error deleting task', error);
    res.status(500).send('Internal Server Error');    
  }
}
