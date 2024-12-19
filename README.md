# Task Management API

## Setup
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Start the server using this command: `node server.js`.

## API Endpoints
### Users
- `POST /users/create-user`: Create new user.
- `GET /users/get-user-details/:id`: Fetch user's details.

### Tasks
- `POST /tasks/create-task/:userId`: Create new task.
- `GET /tasks/get-task-details?<filterParam>`: Fetch tasks with optional filters (`userId`, `status`, `dueDate`) replace the filterParam.
- `PATCH /tasks/update-task/:id`: Update task details.
- `DELETE /tasks/delete-task/:id`: Delete a task.

## Known Limitations
- No persistence: In-memory storage is used.
- No authentication implemented.
