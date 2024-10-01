const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title:{
      type: String,
      max: 20,
      required: true,
    },
    description: {
      type: String,
      max: 500,
    },
    dueDate: {
      type: Date,
    },
    status: { 
      type: String, 
      enum: ['To Do', 'In Progress', 'Completed'], 
      default: 'To Do' 
    },
    priority: { 
      type: String, 
      enum: ['Low', 'Medium', 'High'], 
      default: 'Low' 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);