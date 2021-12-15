// Model for User definition

import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
    {
        title: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
      estimatedTime: {
        type: String,
        required: true
      },
      remainderTime: {
        type: String,
        required: true
      },
      isCompleted: {
        type: Boolean
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  );
  
  const Task = mongoose.model("Task", taskSchema);
  
  export default Task;