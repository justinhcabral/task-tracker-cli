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
  contentString = JSON.stringify(content);
  try {
    fs.writeFileSync(filePath, contentString);
    console.log("data written successfully");
  } catch (err) {
    console.log(err);
  }
}

// test run

const data = [{ id: 1, description: "dick" }];

writeTracker(data, "");
console.log(readTracker());

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
  let trackerContent = readTracker();
}

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
