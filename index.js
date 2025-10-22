#!/usr/bin/env node
// the shebang line above tells us what interpreter to use, in this case it's node

const fs = require("fs"); //file system
const path = require("path"); // import path
const filePath = path.join(__dirname, "tracker.json"); // gets the path to the tracker.json file

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

// test run

const data = [{ id: 1, description: "dick" }];

// writeTracker(data, "");
// console.log(readTracker());

// steps to add task
// Input: task,
// Process:
// 1.) read entire json file
// 2.) parse json file into javascript object
// 3.) modify the javascript object
// 4.) convert it back to json
// 5.) write entire file of json
// 6.) console.log(`Task added successfully (ID:${notDone.id})`)
function add(taskDescription) {
  let trackerContent = readTracker(); // reads tracker data into object array
  let date = new Date();

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
    createdAt: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
    updatedAt: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
  };

  try {
    trackerContent.push(newTask);
    writeTracker(trackerContent, "Task Added!");
  } catch (error) {
    console.log(error);
  }
}

// Add tasks simulation

// add("Goon to madi");
// add("Goon to Lebron");
// add("Stop gooning");

// steps to splicing by id
/*
1. Map ids
2. Loop through ids to find the id that you want to change, when you get it, return the index
3. splice the array using that index and then replace with the updated task
4. write data to tracker.json

 */

function update(id, description) {
  let trackerContent = readTracker();
  let date = new Date();

  let ids = trackerContent.map((task) => task.id);
  let indx;

  ids.forEach((element) => {
    if (element === id) {
      indx = element - 1;
    }
  });

  // use reduce function for mapping keys
  updatedTask = {
    id: parseInt(`${trackerContent[indx].id}`),
    description: description,
    status: `${trackerContent[indx].status}`,
    createdAt: `${trackerContent[indx].createdAt}`,
    updatedAt: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
  };
  // splice element from array
  try {
    trackerContent.splice(indx, 1, updatedTask);
    writeTracker(trackerContent, `Updated task ${id}!`);
  } catch (error) {
    console.log(error);
  }
}
update(2, "Jabol?");

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
