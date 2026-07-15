const express = require("express");

const router = express.Router();

const {
    getUser,
    getUserByName,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/userController");

router.get("/", getUser);
router.get("/:name", getUserByName);
router.post("/", createUser);
router.put("/:name", updateUser);
router.delete("/:name", deleteUser);


module.exports = router;