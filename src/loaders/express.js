import indexRouter from "../routes/index";
import usersRouter from "../routes/users";
import taskRouter from "../routes/task";
import authRouter from "../routes/auth.routes";
import cors from "cors";
import express from "express";
let expressLoader = {}

var corsOptions = {
  origin: "http://localhost:8081"
};

expressLoader.init = async(app)=>{

    app.use(cors(corsOptions))
// parse requests of content-type - application/json
    app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: true }));
    app.use("/", indexRouter);
    app.use("/users", usersRouter);
    app.use("/task", taskRouter);
    app.use("/task", authRouter);
}

export default expressLoader;