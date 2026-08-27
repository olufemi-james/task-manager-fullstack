const Auth = require("../models/Auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");


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
            expiresIn: "1h"
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
            expiresIn: "1h"
        }
    )

    res.json({
        message: "Login successful",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    });
}
const forgotPassword = async (req, res) => {
    console.log("🔥 forgotPassword controller reached");

    try {

        // Get email from request body
        const { email } = req.body;

        // Validate email
        if (!email) {
            return res.status(400).json({
                message: "Email is required."
            });
        }

        console.log("Forgot password requested for:", email);

        // Find user
        const user = await Auth.findOne({ email });
        console.log("Email received:", email);
        console.log("User found:", user);

        // Prevent email enumeration
        if (!user) {
            return res.status(200).json({
                message: "If an account with that email exists, we've sent a password reset link."
            });
        }

        console.log("User found:", user.email);

        // Generate reset token
        const resetToken = crypto
            .randomBytes(32)
            .toString("hex");

        // Hash token before saving
        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        // Save hashed token and expiry
        user.passwordResetToken = hashedToken;
        user.passwordResetExpires = Date.now() + 15 * 60 * 1000;

        await user.save();

        // Create reset URL
        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        console.log("Reset URL:", resetUrl);

        // Email template
        const message = `
            <h2>Password Reset Request</h2>

            <p>Hello ${user.name},</p>

            <p>You requested to reset your password.</p>

            <p>
                Click the button below to reset your password:
            </p>

            <p>
                <a href="${resetUrl}" style="
                    display:inline-block;
                    padding:12px 24px;
                    background:#2563eb;
                    color:white;
                    text-decoration:none;
                    border-radius:6px;
                ">
                    Reset Password
                </a>
            </p>

            <p>This link expires in <strong>15 minutes</strong>.</p>

            <p>If you didn't request this password reset, you can safely ignore this email.</p>
        `;

        console.log("Sending email to:", user.email);

        // Send email
        await sendEmail({
            email: user.email,
            subject: "Reset Your Password",
            message
        });

        console.log("✅ Email sent successfully");

        return res.status(200).json({
            message:
                "If an account with that email exists, we've sent a password reset link."
        });

    } catch (error) {

            console.error("Forgot Password Error:");
            console.error(error);

            if (typeof user !== "undefined" && user) {
                user.passwordResetToken = undefined;
                user.passwordResetExpires = undefined;
                await user.save();
            }

            return res.status(500).json({
                message: "Unable to process password reset request."
            });
        }
};


   const resetPassword = async(req, res) => {
    const { token } = req.params
    const { password } = req.body

    if(!password) {
        return res.status(400).json({
            message: "Password is required"
        })
    }
    const hashedToken = crypto

    .createHash("sha256")

    .update(token)

    .digest("hex");


  const user = await Auth.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: {
     $gt: Date.now()
    }
   })

   if(!user) {
     return res.status(400).json({
        message:
            "Invalid or expired reset token."
         })
   }

   const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save()

    return res.status(200).json({
        message: "Password reset successfully."
    });
};


module.exports = {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword

};