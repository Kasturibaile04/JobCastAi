const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, "Username already exists"]
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Account with this email already exists"]
    },
    password: {
        type: String,
        required: true,
        // minlength: [9,"Password must be at least 9 characters long"],
        // match: [
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/,
        //     "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
        // ]
    }
});

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;