#!/usr/bin/env node
// the shebang line above tells us what interpreter to use, in this case it's node

const fs = require("fs"); //file system
const path = require("path"); // import path
const filePath = path.join(__dirname, "tracker.json"); // gets the path to the tracker.json file

let date = new Date();
let d = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

function readTracker() {
  try {
    if (!fs.existsSync(filePath)) {
      writeTracker([], "Task List created!");
      // return [];
    }
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

// implement list function
function list(status = "all") {
  let trackerContent = readTracker();
  const choices = ["todo", "in-progress", "done", "all"];

  let tasksDescription;
  let tasks;
  // Error Handling
  if (!choices.includes(status)) {
    console.log(
      `${status} is not a valid task status! Please choose from ${choices}`
    );
    return;
  }

  if (status === "all") {
    tasksDescription = trackerContent.map(
      (element) =>
        `Task ID: ${element.id} Task Description: ${element.description}
    `
    );
  } else {
    tasks = trackerContent.filter((task) => task.status === status);
    tasksDescription = tasks.map(
      (element) =>
        `Task ID: ${element.id} Task Description: ${element.description}
    `
    );
  }

  if (tasksDescription.length === 0) {
    console.log(`There are no tasks in ${status}`);
    return;
  }

  if (!choices.includes(status)) {
    console.log(
      `${status} is not a valid task status! Please choose from ${choices}`
    );
    return;
  }

  try {
    console.log(tasksDescription.join("\n"));
  } catch (error) {
    console.log(error);
  }
}

list("in-progress");
