const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: true,
            lowercase: true,
            required: [true, "name is required"],
            maxLength: [30, "Too long name"],
            minLength: [2, "Too short name"],
        },
        parentCategory : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Category"
        }
    },
    { timestamps: true }
);


const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
