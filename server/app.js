const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
const cors = require("cors");
const { errorHandler, notFound } = require("./utils/errorHandler");
const userRouter = require("./routers/userRouter")
const productRouter = require("./routers/productRouter")
const categoryRouter = require("./routers/categoryRouter")
const cartRouter = require("./routers/cartRouter")

const cookieParser = require("cookie-parser")



const app = express();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>{
    console.log("Connected to MongoDB")
    app.listen(process.env.PORT, ()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    })
})

// app.listen(process.env.PORT , ()=>{
//   console.log(`server is running on port ${process.env.PORT}`);
// })

app.use(cors({credentials : true , origin : "http://localhost:5173"}))
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

app.use("/api/v1/user" , userRouter)
app.use("/api/v1/product" , productRouter)
app.use("/api/v1/category" , categoryRouter)
app.use("/api/v1/cart" , cartRouter)

app.use(notFound)
app.use(errorHandler)




