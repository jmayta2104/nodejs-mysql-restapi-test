import express from 'express'
import productoRoutes from './routes/producto.routes.js'
import indexRoutes from './routes/index.routes.js'
import cors from 'cors'
import {PORT} from './config.js'

const app = express()

app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(express.json())

app.use(indexRoutes)
app.use('/api',productoRoutes)

app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found'})
})

export default app;