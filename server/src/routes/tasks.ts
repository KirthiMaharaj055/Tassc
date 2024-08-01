import express, { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import auth, { AuthRequest } from '../middleware/auth';
import Task from '../models/Task';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController';

const router = express.Router();

// Get all tasks
router.get('/', auth, async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await Task.find({ user: req.user!.id });
    res.json(tasks);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create a new task
router.post(
  '/tasks',
  [
    auth,
    body('title', 'Title is required').not().isEmpty(),
  ],
  async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, status, dueDate } = req.body;

    try {
      const newTask = new Task({
        title,
        description,
        status,
        dueDate,
        user: req.user!.id,
      });

      const task = await newTask.save();
      res.json(task);
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Update task
router.put('/:id', auth, async (req: AuthRequest, res: Response) => {
  const { title, description, status, dueDate } = req.body;

  // Build task object
  const taskFields = { title, description, status, dueDate, updatedAt: Date.now() };

  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    if (task.user.toString() !== req.user!.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    task = await Task.findByIdAndUpdate(req.params.id, { $set: taskFields }, { new: true });
    res.json(task);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete task
router.delete('/:id', auth, async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    if (task.user.toString() !== req.user!.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Task removed' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.use(auth);

export default router;
