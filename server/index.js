import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import cors from 'cors'
import {Server} from 'socket.io'

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



const server = app.listen(port, () =>{
    console.log(`listening on ${port}`)
})

app.use('/api/auth/', authRoute)
app.use('/api/post/', postRoute)
app.use('/api/users/', userRoute)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'] 
    }
})

io.on('connection', (socket) => {
    console.log((`user ${socket.id} connected`))

    socket.on('join_room', (data) => {
        socket.join(data)
        console.log(`User with ID ${socket.id} joined room ${data}`)
    })
    socket.on('send_message', (data) => {
        console.log(data.message)
        socket.to(data.room).emit('recieve_message', data)
    })
    socket.on('disconnect', ()=> {
        console.log('user disconnected ' + socket.id )
    })
})