import db from "../../models";
const Task = db.task;
const Op = db.Sequelize.Op;
// Create and Save a new Task
function create  (req, res)  {
};
// Retrieve all task from the database.
function findAll  (req, res)  {
  
};
// Find a single Task with an id
function findOne  (req, res)  {
  
};
// Update a Task by the id in the request
function update  (req, res)  {
  
};
// Delete a Task with the specified id in the request
function deletes  (req, res)  {
  
};
// Delete all task from the database.
function deleteAll  (req, res)  {
  
};
// Find all published task
function findAllPublished  (req, res)  {
  
};

export default {
    create, findAll, findOne, update, deletes, deleteAll, findAllPublished
}