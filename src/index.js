import express from 'express';
import loaders from './loaders';
import db from '../models';
import dotenv from 'dotenv';

// const Role = db.role;
dotenv.config();

let startServer = async()=>{
    const app = express();
    await loaders.init(app);

    app.use(function(req, res, next) {
    res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
    app.listen(process.env.PORT, err =>{
        if(err){
            console.log(err);
            return;
        }
        console.log(`App runnning at port ${process.env.PORT}`);
    });
};
db.sequelize.sync();// to connect to dattabase.
// function initial() {
//   Role.create({
//     id: 1,
//     name: "user"
//   });
 
//   Role.create({
//     id: 2,
//     name: "moderator"
//   });
 
//   Role.create({
//     id: 3,
//     name: "admin"
//   });
// }
// try {
//    db.sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

startServer();