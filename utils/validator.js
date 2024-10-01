const Joi = require("joi");

const createTaskSchema = Joi.object({
  title: 
  Joi
  .string()
  .min(3)
  .max(100)
  .required(),

  description: 
  Joi
  .string()
  .min(10)
  .max(1000),

  dueDate: 
  Joi
  .date(),

  status: 
  Joi
  .string()
  .valid("To Do", "In Progress", "Completed"),

  userId: 
  Joi
  .string()
  .required(),

  priority: Joi.string().valid("Low", "Medium", "High")
});
const updateTaskSchema = Joi.object({
    title: 
    Joi
    .string()
    .min(3)
    .max(100),

    description: 
    Joi
    .string()
    .min(10)
    .max(1000),

    dueDate: 
    Joi
    .date(),

    status: 
    Joi
    .string()
    .valid("To Do", "In Progress", "Completed"),

    userId: 
    Joi
    .string(),

    priority: 
    Joi
    .string()
    .valid("Low", "Medium", "High"),
  });

module.exports = { createTaskSchema,updateTaskSchema};
