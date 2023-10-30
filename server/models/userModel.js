const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            required: [true, "username is required"],
            maxLength: [20, "Too long username"],
            minLength: [5, "Too short username"],
        },
        password: {
            type: String,
            required: [true, "password is required"],
            maxLength: [25, "Too long password"],
            minLength: [8, "Too short password"],
        },
        email: {
            type: String,
            required: [true, "email is required"],
            maxLength: [32, "Too long email"],
            minLength: [8, "Too short email"],
            unique: true,
            trim: true,
            validate: {
                validator: function (email) {
                    return validator.isEmail(email);
                },
                message: (props) => `${props.value} is not a valid email`,
            },
        },
        whishlist: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
        profilePhoto: {
            type: String,
            default: "profile.png",
        },
        role: {
            type: String,
            enum: {
                values: ["admin", "user"],
                message: "{VALUE} is not supported"
            },
            default: "user",
        }
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 11);
    next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
