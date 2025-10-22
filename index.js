#!/usr/bin/env node
// the shebang line above tells us what interpreter to use, in this case it's node

const fs = require("fs"); //file system
const path = require("path"); // import path
const filePath = path.join(__dirname, "tracker.json"); // gets the path to the tracker.json file

let date = new Date();
let d = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

function readTracker() {
  try {
    jsonstring = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(jsonstring);
  } catch (error) {
    console.log("Error reading tracker: ", error.message);
    return [];
  }
}

function writeTracker(content, successMessage) {
  contentString = JSON.stringify(content, null, 2);
  try {
    fs.writeFileSync(filePath, contentString);
    console.log(successMessage);
  } catch (err) {
    console.log(err);
  }
}

function add(taskDescription) {
  let trackerContent = readTracker(); // reads tracker data into object array

  // dynamic key
  let key;
  if (trackerContent.length === 0) {
    key = 1;
  } else {
    // get all current ids
    let ids = trackerContent.map((task) => task.id);
    // find the highest one
    key = Math.max(...ids) + 1;
  }

  const newTask = {
    id: key,
    description: taskDescription,
    status: "todo",
    createdAt: d,
    updatedAt: d,
  };

  try {
    trackerContent.push(newTask);
    writeTracker(trackerContent, "Task Added!");
  } catch (error) {
    console.log(`Error while adding task: ${error}`);
  }
}

function update(id, description) {
  let trackerContent = readTracker();

  // index lookup
  const isId = (element) => element.id === id; // testing function for findIndex
  let indx = trackerContent.findIndex(isId);

  // error handling if the task does not exist
  if (indx === -1) {
    console.log(`Task with ID: ${id} does not exist!`);
    return;
  }
  // use spread operator to use previous task and overwrite only the properties that need overwriting
  oldTask = trackerContent[indx];
  updatedTask = {
    ...oldTask,
    description: description,
    updatedAt: d,
  };
  // splice element from array
  try {
    trackerContent.splice(indx, 1, updatedTask);
    writeTracker(trackerContent, `Updated task ${id}!`);
  } catch (error) {
    console.log(error);
  }
}

// Implement delete task
function deleteTask(id) {
  let trackerContent = readTracker();

  // Index look up
  const isId = (element) => element.id === id;
  let indx = trackerContent.findIndex(isId);

  if (indx === -1) {
    console.log(`Task with ID: ${id} does not exist!`);
    return;
  }
  try {
    trackerContent.splice(indx, 1);
    writeTracker(trackerContent, `Deleted task ${id}`);
  } catch (error) {
    console.log(`Error deleting task ${id}`);
  }
}

function markAs(id, status) {
  let trackerContent = readTracker();
  const choices = ["todo", "in-progress", "done"];

  // index lookup
  const isId = (element) => element.id === id; // testing function for findIndex
  let indx = trackerContent.findIndex(isId);

  // error handling if the task does not exist
  if (indx === -1) {
    console.log(`Task with ID: ${id} does not exist!`);
    return;
  }

  if (!choices.includes(status)) {
    console.log(
      `${status} is not a valid task status! Please choose from ${choices}`
    );
    return;
  }
  // use spread operator to use previous task and overwrite only the properties that need overwriting
  oldTask = trackerContent[indx];
  updatedTask = {
    ...oldTask,
    status: status,
    updatedAt: d,
  };
  // splice element from array
  try {
    trackerContent.splice(indx, 1, updatedTask);
    writeTracker(trackerContent, `Task ${id} marked as ${status}!`);
  } catch (error) {
    console.log(error);
  }
}

markAs(1, "done");

// let trackerContent; // to access the contents of the json files

// // empty data that initializes tracker.json
// const trackerTemplate = [{}];
// const jsonString = JSON.stringify(trackerTemplate, null, 2);

// if (!fs.existsSync(filePath)) {
//   fs.writeFile("tracker.json", jsonString, (err) => {
//     err ? console.log(err) : console.log("json saved successfully");
//   });
// }

// const datares = fs.readFileSync(filePath);
// trackerContent = JSON.parse(datares);

// /*
// after initializing tracker.json, we need to create functions for the following things

// 1. adding tasks
// 2. updating tasks
// 3. deleting tasks

// steps to add task
// Input: task,
// Process:
// 1.) read entire json file
// 2.) parse json file into javascript object
// 3.) modify the javascript object
// 4.) convert it back to json
// 5.) write entire file of json
// 6.) console.log(`Task added successfully (ID:${notDone.id})`)
// Output: Task added successfully (ID:1)
// */

// const add = (task) => {
//   let key;
//   const d = new Date();

//   if (trackerContent.length === 0) {
//     key = 1;
//   } else {
//     // FIlter out any invalid entries and get numerid IDs
//     const validIds = trackerContent
//       .map((item) => Number(item.id))
//       .filter((id) => !isNaN(id) && id > 0);

//     const largest_id = validIds.length > 0 ? Math.max(...validIds) : 0;
//     key = largest_id + 1;
//   }

//   const addTask = {
//     id: key,
//     description: task,
//     status: "Not Done",
//     createdAt: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`,
//     updatedAt: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`,
//   };
//   trackerContent.push(addTask);

//   trackerContentString = JSON.stringify(trackerContent, null, 2);

//   fs.writeFile("tracker.json", trackerContentString, (err) => {
//     err
//       ? console.log(err)
//       : console.log(`Task Added Successfully (ID: ${key})`);
//   });
// };
// add("Goon to lebron");

// /*
// implement update
// Input: task, id number of task
// Process:
// 1.) read entire json file
// 2.) parse json file into javascript object
// 3.) modify the javascript object
// 4.) convert it back to json
// 5.) write entire file of json
// 6.) console.log(`Task added successfully (ID:${notDone.id})`)
// Output: Task added successfully (ID:1)
//  */

// // const update = (taskId) => {

// // }

// // console.log(tasks[1]);s
