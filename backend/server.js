const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const logger =require("./middleware/logger");

require("dotenv").config();

const app = express();

const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");


app.use(cors());
app.use(express.json());

app.use(logger);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log(error));



app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);
app.use("/contacts", contactRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);

const PORT = 5000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});