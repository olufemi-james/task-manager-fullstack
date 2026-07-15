const Task = require("../models/Task");



// GET all tasks
const getTasks = async (req, res) => {
    const filter = {
        user: req.user.id
    };
   
    let sort = {};
    if(req.query.sort){
        sort[req.query.sort] = 1;
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 100;

    if (page < 1 || limit < 1) {
        return res.status(400).json({
            message: "page and limit must be positive numbers"
        });
    }
    

    const skip = (page - 1)* limit;

    if(req.query.completed !== undefined) {
        {
            if(req.query.completed !== "true" && 
               req.query.completed !== "false"
              ){ 
                return res.status(400).json({
                    message: "Completed must be true or false"
                })

               }
        }
        filter.completed = req.query.completed === "true";
    }
       

        if(req.query.priority){
            if(req.query.priority !== "low" &&
               req.query.priority !== "medium" &&
               req.query.priority !== "high"
            ){
                return res.status(400).json({
                    message: "priority can only be low, medium or high"
                })
            }
        filter.priority = req.query.priority;
    }

      if(req.query.search){
        filter.title= {
            $regex: req.query.search,
            $options: "i"

        }
      }



    const tasks = await Task.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit);

    res.json(tasks);
};

// GET specific task
const getTaskById = async (req, res) => {
   

    const foundTask = await Task.findOne({
        _id: req.params.id,
        user: req.user.id
    });

    if(!foundTask) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.json(foundTask);
};

// POST task
const createTask = async (req, res) => { 

   if(!req.body.title){
     return res.status(400).json({
        message: "Title is required"
     })
   }


    const newTask = await Task.create({
        title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    dueDate: req.body.dueDate,
    completed: req.body.completed,
    user: req.user.id
        
    });
res.status(201).json(newTask);
};
    

// UPDATE task
const updateTask = async (req, res) => {

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "No update data provided"
        });
    }

    const updatedTask = await Task.findOneAndUpdate({
        _id: req.params.id,
        user: req.user.id,

    },
      req.body,
        { new: true }
    );

    if (!updatedTask) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.json(updatedTask);
};

// DELETE task
const deleteTask = async (req, res) => {

    const deletedTask = await Task.findOneAndDelete({
        _id: req.params.id,
        user: req.user.id
    });

    if (!deletedTask) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.json({
        message: "Task deleted"
    });
};
module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};