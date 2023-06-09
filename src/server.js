import "express-async-errors"
import express from "express"
import { AppError } from "./utils/AppError.js"

import * as uploadConfig from "./configs/upload.js"

import { sqliteConnection } from "./database/sqlite/index.js"

import { routes } from "./routes/index.js"

import cors from "cors"

sqliteConnection()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER))
app.use(routes)

app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  console.error(error)

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

const PORT = 3333
app.listen(PORT, () => console.log('Server is running on PORT:', PORT))