
const User = require("../models/User");



// GET USER
const getUser = async (req, res) => {
    const users = await User.find();

    res.json(users);

};

// GET SPECIFIC USER
const getUserByName = async (req, res) => {
    const foundUser = await User.findOne({
        name: req.params.name
    });

    if (!foundUser) {
        return res.status(404).json({
            message: "User not found"
        });
    }
    res.json(foundUser);
}

// POST User
const createUser = async (req, res) => {
    if(!req.body.name && !req.body.title) {
        return res.status(400).json ({
            message: "Name or Title missing"
        })
    }
    const newUser = await User.create ({
        name: req.body.name, 
        title: req.body.title,
      });
   

    res.status(201).json (newUser);
}

// PUT(update) a User
const updateUser = async (req, res) => {
    if(!req.body.name && !req.body.title) {
        return res.status(400).json ({
            message: "No update data provided"
        });
    }

 const updatedUser = await User.findOneAndUpdate (
    { name: req.params.name},req.body, 
    {new: true},
  );

  if(!updatedUser) {
    return res.status(400).json({
        message: "User not found"
    })
  }
  res.json(updatedUser);
}

//DELETE a user
const deleteUser = async (req, res) => {
    const deletedUser = await User.findOneAndDelete(
        { name: req.params.name }
     );
  
    if(!deletedUser) {
        return res.status(404).json({
            message: "User not found"
        });
    }
     res.json({
        message: "User deleted"
     })
}

module.exports = {
    getUser,
    getUserByName,
    createUser,
    updateUser,
    deleteUser
};