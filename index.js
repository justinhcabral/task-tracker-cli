#!/usr/bin/env node
// the shebang line above tells us what interpreter to use, in this case it's node

const fs = require("fs"); //file system
const path = require("path"); // import path

const filePath = path.join(__dirname, "tracker.json"); // gets the path to the tracker.json file

// empty data that initializes tracker.json
const data = {
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
const jsonString = JSON.stringify(data, null, 2);

if (!fs.existsSync(filePath)) {
  fs.writeFile("tracker.json", jsonString, (err) => {
    err ? console.log(err) : console.log("json saved successfully");
  });
}

/* 
after initializing tracker.json, we need to create functions for the following things

1. adding tasks
2. updating tasks
3. deleting tasks

steps to add task
Input: task
Process: 
1.) Take in the process in string form
2.) Look for the notDone section in tracker.json
3.) Add the task there, along with an ID
4.) console.log(`Task added successfully (ID:${notDone.id})`)
Output: Task added successfully (ID:1)

*/
