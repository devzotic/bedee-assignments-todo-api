import { Request } from "express"

export interface PaginationResult {
  [key: string]: any
}

export const Paginate = (req: Request, arr: any[]): PaginationResult => {
  const { page, limit, startIndex, endIndex } = req.pagination
  const totalCount = arr.length

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

  result.data = arr.slice(startIndex, endIndex)

  return result
}
