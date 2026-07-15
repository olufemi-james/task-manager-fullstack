const Auth = require("../models/Auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const registerUser = async (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    const existingUser = await Auth.findOne({email});

    if (existingUser) {
        return res.status(400).json({
            message: "User already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Auth.create({
        name,
        email,
        password: hashedPassword
    });
    

    const token = jwt.sign(
        {
            id: newUser._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    )
    res.status(201).json({
        message: "User registered",
        token,
        user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email
        }
    })
};



const loginUser = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({
            message: "Email and password required"
        });
    }

    const user = await Auth.findOne({email});
    
    if(!user) {
        return res.status(400).json({
            message: "Incorrect username or password "
        });
    }

    const isMatch = await bcrypt.compare(
        password, 
        user.password
    );

    if(!isMatch) {
        return res.status(400).json({
            message: "Incorrect username or password "
        })
    }


    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    )

    res.json({
        message: "Login successful",
        token
    })
}

module.exports = {
    registerUser,
    loginUser
};