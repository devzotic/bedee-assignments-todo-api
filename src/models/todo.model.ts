export interface Todo {
  id: number
  text: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

export class TodoModel {
  private todos: Todo[] = []

  findOne(id: number): Todo | undefined {
    return this.todos.find((todo) => todo.id === id)
  }

  findAll(): Todo[] {
    return this.todos
  }

  create(text: string, completed: boolean = false) {
    const todo: Todo = {
      id: this.todos.length + 1,
      text,
      completed,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.todos.push(todo)
    return todo
  }

  update(id: number, text: string, completed: boolean): Todo | undefined {
    const index = this.todos.findIndex((todo) => todo.id === id)

    if (index !== -1) {
      this.todos[index] = {
        ...this.todos[index],
        text,
        completed,
        updatedAt: new Date(),
      }
      return this.todos[index]
    }

    return undefined
  }

  updateStatus(id: number, completed: boolean): Todo | undefined {
    const index = this.todos.findIndex((todo) => todo.id === id)

    if (index !== -1) {
      this.todos[index].completed = completed
      this.todos[index].updatedAt = new Date()
      return this.todos[index]
    }
    return undefined
  }

  delete(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id)
  }
}
