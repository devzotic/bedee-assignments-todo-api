import { Request, Response, NextFunction } from "express"
import Joi from "joi"

export const createTodoSchemaHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    text: Joi.string().required(),
    completed: Joi.boolean(),
  })
  validateRequest(req, res, next, schema)
}

export const updateTodoStatusSchemaHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    completed: Joi.boolean().required(),
  })
  validateRequest(req, res, next, schema)
}

export const updateTodoSchemaHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    text: Joi.string().required(),
    completed: Joi.boolean().required(),
  })
  validateRequest(req, res, next, schema)
}

function validateRequest(
  req: Request,
  res: Response,
  next: NextFunction,
  schema: Joi.ObjectSchema
) {
  const options = {
    abortEarly: true,
  }
  const { error, value } = schema.validate(req.body, options)
  if (error) {
    res.status(400).send({
      success: false,
      message: { error: `${error.details.map((x) => x.message).join(", ")}` },
    })
  } else {
    req.body = value
    next()
  }
}
