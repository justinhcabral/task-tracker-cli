# Task Tracker CLI App

A command line interface application that tracks and manages tasks. Solution for [Task Tracker](https://roadmap.sh/projects/task-tracker) project in [roadmap.sh](https://roadmap.sh/)

## Features

- Add, Update, and Delete tasks
- Mark a task as `todo`, `in-progress`, or `done`
- List tasks by their status: `todo`, `in-progress`, or `done`. If no arguments are passed, the `list` function lists all tasks.
- Tasks are stored in a JSON file named **tracker.json**. If it's not in the directory, it will automatically be created once any function is run.

## Prerequisites

This project uses node.js. To install, refer to [Node.js documentation](https://nodejs.org/en/download)'s step-by -step instructions.

## Installation

**Clone the repository**

```
git clone --depth=1 git@github.com:justinhcabral/task-tracker-cli.git

# Navigate to the project directory
cd task-tracker-cli
```

## Usage

- Add a task

```
task-cli add "Pay for spotify"
```

- List all tasks

```
node index.js list
```

or

```
node index.js list all
```

- List task by status

```
node index.js list <status>
```

Available statuses:

- `todo`
- `in-progress`
- `done`

- Update a task where the `id` is the id of the task and `description` is the new description you want to assign to that task

```
node index.js update <id> <description>
```

Sample Usage

```
node index.js update 13 "Eat hotdogs at 3 am with your goober friend"
```

- Mark Task Status

```
# Mark task ID 17 as `todo`
node index.js mark-todo 17

# Mark task ID 17 as `in-progress`
node index.js mark-in-progress 17

# Mark task ID 17 as `done`
node index.js mark-done
```

- Delete a Task

```
# Delete task containing ID 17
node index.js delete 17
```

If you wish to run the functions using `task-cli` without having to use `node index.js` you can create a symlink that allows you to run this CLI tool from anywhere in your terminal

```
# Run in project directory
npm link
```

Once you've linked it, you can run functions like so,

```
task-cli add "Go to the beach"
```

If you decide to unlink it, just run this anywhere in your terminal

```
npm unlink -g tasktrackercli
```

## Sample JSON Structure

```
[
{
    "id": 1,
    "description": "Random ahh description",
    "status": "done",
    "createdAt": "25/10/2025",
    "updatedAt": "25/10/2025"
  }
]
```
