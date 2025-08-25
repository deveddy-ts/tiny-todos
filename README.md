# Minimal Todo Backend (Express)

A minimal, in-memory Todo backend built with Express. Good for demos, prototypes, or starting points.

## Install

```bash
npm install
```

## Run

```bash
npm start
# or for development with auto-reload (requires nodemon)
npm run dev
```

The server listens on port 3000 by default (set PORT env to override).

## Endpoints

- GET /                 - welcome message
- GET /todos            - list all todos
- GET /todos/:id        - get a single todo
- POST /todos           - create a todo (body: { "title": "Buy milk" })
- PUT /todos/:id        - update a todo (body can include { "title": "...", "completed": true })
- DELETE /todos/:id     - delete a todo

All responses are JSON.

## Examples

Create a todo:
```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy milk"}'
```

List todos:
```bash
curl http://localhost:3000/todos
```

Update a todo:
```bash
curl -X PUT http://localhost:3000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

Delete a todo:
```bash
curl -X DELETE http://localhost:3000/todos/1
```

## Notes / Next steps

- This uses an in-memory array; data is lost when the server restarts. Add a database (SQLite/Postgres) for persistence.
- Add validation, tests, CI, and Docker for production readiness.
