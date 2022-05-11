import express from 'express';
import taskController from "../controllers/taskController";
let router = express.Router();

const {create, findAll, findOne, update, deletes, deleteAll, findAllPublished} = taskController;
router.get('/',(req,res,next)=>{res.send('user page')})

  // Create a new Tutorial
  router.post("/", create);
  // Retrieve all 
  router.get("/", findAll);
  // Retrieve all published 
  router.get("/published", findAllPublished);
  // Retrieve a single Tutorial with id
  router.get("/:id", findOne);
  // Update a Tutorial with id
  router.put("/:id", update);
  // Delete a Tutorial with id
  router.delete("/:id", deletes);
  // Delete all 
  router.delete("/", deleteAll);
//   app.use('/api/', router);

  export default router;
