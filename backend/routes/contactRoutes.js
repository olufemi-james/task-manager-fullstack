const express = require("express");

const router = express.Router();


const {
  createContact,
  getContact,
  getContactByName,
  updateContact,
  deleteContact
} = require ("../controllers/contactController");


router.post("/", createContact);
router.get("/", getContact);
router.get("/:name", getContactByName);
router.put("/:name", updateContact);
router.delete("/:name", deleteContact);




module.exports = router;