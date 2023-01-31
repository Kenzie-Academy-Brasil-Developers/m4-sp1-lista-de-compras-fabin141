import express, { Application, Request, Response } from 'express'

const app: Application = express()
app.use(express.json())

app.listen(3000, () => {
    console.log('Server is running!')
})