import { Router } from "express"
import { TodoController } from "../controllers/todo.controller"
import {
  createTodoSchemaHandler,
  updateTodoSchemaHandler,
  updateTodoStatusSchemaHandler,
} from "../middlewares/validation.middleware"

export class TodoRoutes {
  private router: Router
  private todoController: TodoController

  constructor() {
    this.router = Router()
    this.todoController = new TodoController()
    this.setupRoutes()
  }

  public getRouter(): Router {
    return this.router
  }

  private setupRoutes() {
    this.router.put(
      "/todos/:id/status",
      updateTodoStatusSchemaHandler,
      (req, res) => {
        this.todoController.updateTodoStatus(req, res)
      }
    )

    this.router.put("/todos/:id", updateTodoSchemaHandler, (req, res) => {
      this.todoController.updateTodo(req, res)
    })

    this.router.post("/todos", createTodoSchemaHandler, (req, res) => {
      this.todoController.createTodo(req, res)
    })

    this.router.get("/todos", (req, res) =>
      this.todoController.getAllTodos(req, res)
    )

    this.router.get("/todos/:id", (req, res) =>
      this.todoController.getTodo(req, res)
    )

    this.router.delete("/todos/:id", (req, res) =>
      this.todoController.delete(req, res)
    )
  }
}
