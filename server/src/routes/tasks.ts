import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator'; 
import auth, { AuthRequest } from '../middleware/auth';
import Task, { ITask } from '../models/Task';

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

// Create new task
router.post(
  '/',
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
  const taskFields: Partial<ITask> = {};
  if (title) taskFields.title = title;
  if (description) taskFields.description = description;
  if (status) taskFields.status = status;
  if (dueDate) taskFields.dueDate = dueDate;

  try {
    let task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    // Ensure user owns task
    if (task.user.toString() !== req.user!.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: taskFields },
      { new: true }
    );

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

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Ensure user owns task
    if (task.user.toString() !== req.user!.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Task.deleteOne({ _id: req.params.id });

    res.json({ msg: 'Task removed' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
