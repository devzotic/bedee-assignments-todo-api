import HttpException from "../common/http-exception"
import { Request, Response, NextFunction, response } from "express"

export const paginationMiddleware = (pageSize: number = 10) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string, 10) || 1
    const limit = parseInt(req.query.limit as string, 10) || pageSize
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    req.pagination = {
      page,
      limit,
      startIndex,
      endIndex,
    }

    next()
  }
}
