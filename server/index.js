import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import cors from 'cors'

// routes 
import authRoute from './routes/authRoutes.js'
import postRoute from './routes/postRoutes.js'
import userRoute from './routes/userRoutes.js'

dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT

app.use(cors())
app.use(express.json({extended: true}))
app.use(express.urlencoded({extended: true}))



app.listen(port, () =>{
    console.log(`listening on ${port}`)
})

app.use('/api/auth/', authRoute)
app.use('/api/post/', postRoute)
app.use('/api/users/', userRoute)