const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "name is required"],
            maxLength: [20, "Too long name"],
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
