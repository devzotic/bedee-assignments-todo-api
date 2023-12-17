import { Request, Response } from "express"
import { TodoModel, Todo } from "../models/todo.model"
import { Paginate } from "./controller"

export class TodoController {
  private todoModel: TodoModel

  constructor() {
    this.todoModel = new TodoModel()
  }

  delete(req: Request, res: Response) {
    try {
      const id: number = parseInt(req.params.id, 10)
      this.todoModel.delete(id)
      return res.sendStatus(204)
    } catch (error) {
      return res.status(500).send({
        success: false,
        data: { error: "Internal Server Error" },
      })
    }
  }

  updateTodoStatus(req: Request, res: Response) {
    try {
      const id: number = parseInt(req.params.id, 10)
      const { completed } = req.body

      const updateTodo: Todo | undefined = this.todoModel.updateStatus(
        id,
        completed
      )

      if (updateTodo) {
        return res.status(200).send({
          success: true,
          data: updateTodo,
        })
      } else {
        res.status(404).send({
          success: false,
          data: { error: "Todo not found" },
        })
      }
    } catch (error) {
      return res.status(500).send({
        success: false,
        data: { error: "Internal Server Error" },
      })
    }
  }

  updateTodo(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id)

      const { text, completed } = req.body

      const updatedTodo: Todo | undefined = this.todoModel.update(
        id,
        text,
        completed
      )

      if (updatedTodo) {
        return res.status(200).send({
          success: true,
          data: updatedTodo,
        })
      } else {
        res.status(404).send({
          success: false,
          data: { error: "Todo not found" },
        })
      }
    } catch (error) {
      return res.status(500).send({
        success: false,
        data: { error: "Internal Server Error" },
      })
    }
  }

  createTodo(req: Request, res: Response) {
    try {
      const { text, completed } = req.body
      const todo: Todo = this.todoModel.create(text, completed)
      return res.status(201).send({
        success: true,
        data: todo,
      })
    } catch (error) {
      return res.status(500).send({
        success: false,
        data: { error: "Internal Server Error" },
      })
    }
  }

  getAllTodos(req: Request, res: Response) {
    try {
      let todos: Todo[] = this.todoModel.findAll()

      const completedFilter = req.query.completed as string
      todos = this.filterByCompleted(todos, completedFilter)

      var result = Paginate(req, todos)
      // result.todos = todos.slice(
      //   req.pagination.startIndex,
      //   req.pagination.endIndex
      // )

      return res.status(200).send({
        success: true,
        data: result,
      })
    } catch (e) {
      return res.status(500).send({
        success: false,
        data: { error: "Internal Server Error" },
      })
    }
  }

  getTodo(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10)
      const todo: Todo | undefined = this.todoModel.findOne(id)

      if (todo) {
        return res.status(200).send({
          success: true,
          data: todo,
        })
      } else {
        return res.status(404).send({
          success: false,
          data: { error: "Todo not found" },
        })
      }
    } catch (error) {
      return res.status(500).send({
        success: false,
        data: { error: "Internal Server Error" },
      })
    }
  }

  private filterByCompleted(todos: Todo[], completedFilter: string): Todo[] {
    if (completedFilter === "true" || completedFilter === "false") {
      const isCompleted = completedFilter === "true"
      return todos.filter((todo) => todo.completed === isCompleted)
    }
    return todos
  }
}
