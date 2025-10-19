#!/usr/bin/env node

// json file
/*
Check first if json file has been created, create one if not

when creating json file

*/

const fs = require("fs"); //file system
const path = require("path");

const filePath = path.join(__dirname, "tracker.json");

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

/* structure of task tracker

notDone : {
  id: ,
  taskname: },

approach to turning a json file into a database




*/
