declare namespace Express {
  export interface Request {
    pagination: paginationResult
  }
}

interface paginationResult {
  page: number
  limit: number
  startIndex: number
  endIndex: number
}
