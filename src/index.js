import express from 'express';
import loaders from './loaders';
import db from '../models';

let startServer = async()=>{
    const app = express();
    await loaders.init(app);

    app.listen(3000, err =>{
        if(err){
            console.log(err);
            return;
        }
        console.log(`App runnning at port 3000`);
    });
};

db.sequelize.sync();

// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });


startServer();