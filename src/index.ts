import express from "express"
import { TodoRoutes } from "./routes/todo.routes"
import { errorHandler } from "./middlewares/error.middleware"

const app = express()
const port = 4000

app.use(express.json())
app.use(errorHandler)

const todoRoutes = new TodoRoutes()
app.use("/api/v1", todoRoutes.getRouter())

app.listen(4000, () => {
  console.log(`Server is running on 4000`)
})
