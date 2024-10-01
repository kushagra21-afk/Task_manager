const router = require("express").Router();
const Task = require("../models/Task");
const User = require("../models/User");
const verifyToken = require("../middleware/verify.token")
const {createTaskSchema,updateTaskSchema}=require("../utils/validator")

router.post("/",verifyToken, async (req, res) => {
  const { error } = createTaskSchema.validate(req.body);
  if (error) return res.status(400).json({ message: "Invalid input" });
  else{const newTask = new Task({...req.body, userId: req.user.id});
  try {
    const savedTask = await newTask.save();
    res.status(200).json(savedTask);
  } catch (err) {
    res.status(500).json(err);
  }}
});

router.put("/:id", verifyToken , async (req, res) => {
  const { error } = updateTaskSchema.validate(req.body);
  if (error) return res.status(400).json({ message: "Invalid input" });
  else{
    try {
    const task = await Task.findById(req.params.id);
    if (task.userId === req.user.id) {
      await task.updateOne({ $set: req.body });
      res.status(200).json("the task has been updated");
    } else {
      res.status(403).json("you can update only your task");
    }
  } catch (err) {
    res.status(500).json(err);
  }}
});

router.delete("/:id",verifyToken, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task.userId === req.user.id) {
      await task.deleteOne();
      res.status(200).json("the task has been deleted");
    } else {
      res.status(403).json("you can delete only your task");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id",verifyToken, async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      res.status(200).json(task);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
router.get('/', verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({userId: req.user.id});
    res.status(200).json(tasks); 
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks', error: err });
  }
});
module.exports = router;
