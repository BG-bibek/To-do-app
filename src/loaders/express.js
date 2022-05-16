import indexRouter from "../routes/index";
import usersRouter from "../routes/users";
import taskRouter from "../routes/task";
import authRouter from "../routes/auth.routes";
import passwordRestrouter from "../routes/passwordReset"
import cors from "cors";
import express from "express";
import helmet from "helmet";
let expressLoader = {}

var corsOptions = {
  origin: "http://localhost:8081"
};

expressLoader.init = async(app)=>{
    app.use(helmet());
    app.use(cors(corsOptions))
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/", indexRouter);
    app.use("/users", usersRouter);
    app.use("/task", taskRouter);
    app.use("/auth", authRouter);
    app.use("/pwd", passwordRestrouter);
}

export default expressLoader;