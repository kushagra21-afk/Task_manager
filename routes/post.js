const router = require("express").Router();
const Post = require("../models/Task");
const User = require("../models/User");
const {createTaskSchema,updateTaskSchema}=require("../utils/validator")
router.post("/", async (req, res) => {
  const { error } = createTaskSchema.validate(req.body);
  if (error) return res.status(400).json({ message: "Invalid input" });
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put("/:id", async (req, res) => {
  const { error } = updateTaskSchema.validate(req.body);
  if (error) return res.status(400).json({ message: "Invalid input" });
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });
router.get('/', verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks); 
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks', error: err });
  }
});
module.exports = router;
