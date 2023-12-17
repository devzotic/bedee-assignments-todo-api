import { Request } from "express"

export interface PaginationResult {
  [key: string]: any
}

export const Paginate = (
  req: Request,
  totalCount: number
): PaginationResult => {
  const { page, limit, startIndex, endIndex } = req.pagination

  const totalPage = Math.ceil(totalCount / limit)

  var result: PaginationResult = {}

  result.totalCount = totalCount
  result.totalPage = totalPage
  result.page = page

  if (endIndex < totalCount) {
    result.next = {
      page: page + 1,
      limit,
    }
  }

  if (startIndex > 0 && totalCount > 0) {
    result.previous = {
      page: page - 1,
      limit,
    }
  }

  return result
}
