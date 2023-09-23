const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config()
const cors = require("cors");
const { errorHandler, notFound } = require("./utils/errorHandler");
const userRouter = require("./routers/userRouter")

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

app.use(cors({credentials : true , origin : "http://localhost:3000"}))
app.use(express.json());

app.use("/api/v1/user" , userRouter)

app.use(notFound)
app.use(errorHandler)




