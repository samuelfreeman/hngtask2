import express, { ErrorRequestHandler, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import appRouter from './src/routers/index'
import errorHandler from './src/middleware/errorHandle'
import dotenv from 'dotenv'
dotenv.config()

const app = express()


type exp = {
    req: Request,
    res: Response,
    next: NextFunction,

}


const port = process.env.PORT || 3000
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// app.use(cors())
app.get("/", ({ req, res, next }: exp) => {
    res.status(200).json({
        messsage: "Hello"
    })
})
app.use(appRouter)
app.use(errorHandler)
app.listen(3000, () => {
    console.log(`server listening  to port ${port}`)
})

export default app