#!/usr/bin/env node
// the shebang line above tells us what interpreter to use, in this case it's node

const fs = require("fs"); //file system
const path = require("path"); // import path

const filePath = path.join(__dirname, "tracker.json"); // gets the path to the tracker.json file

let datares, trackerContent, notDone, inProgress, done; // to access the contents of the json files

// empty data that initializes tracker.json
const trackerTemplate = {
  notDone: [
    {
      taskId: "",
      taskName: "",
    },
  ],
  inProgress: [
    {
      taskId: "",
      taskName: "",
    },
  ],
  done: [
    {
      taskId: "",
      taskName: "",
    },
  ],
};
const jsonString = JSON.stringify(trackerTemplate, null, 2);

if (!fs.existsSync(filePath)) {
  fs.writeFile("tracker.json", jsonString, (err) => {
    err ? console.log(err) : console.log("json saved successfully");
  });
} else {
  datares = fs.readFileSync(filePath);
  trackerContent = JSON.parse(datares);
  notDone = trackerContent.notDone;
  inProgress = trackerContent.inProgress;
  done = trackerContent.done;
  // console.log(trackerContent);
}

/* 
after initializing tracker.json, we need to create functions for the following things

1. adding tasks
2. updating tasks
3. deleting tasks

steps to add task
Input: task, 
Process: 
1.) read entire json file
2.) parse json file into javascript object
3.) modify the javascript object
4.) convert it back to json
5.) write entire file of json
6.) console.log(`Task added successfully (ID:${notDone.id})`)
Output: Task added successfully (ID:1)
*/

const add = (task) => {
  let obj = notDone.reduce((a, c) => ((a[c.taskId] = c), a), {}); // to turn ids into keys
  largest_id = Math.max(...Object.keys(obj));
  if (notDone.length > 0) {
    const addTask = {
      taskId: largest_id + 1,
      taskName: task,
    };
    notDone.push(addTask);
  }
  trackerContentString = JSON.stringify(trackerContent, null, 2);

  fs.writeFile("tracker.json", trackerContentString, (err) => {
    err ? console.log(err) : console.log("json saved successfully");
  });
};

add("Goon to Madelene my babycakes");
