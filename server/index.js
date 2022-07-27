import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import cors from 'cors'
import {Server} from 'socket.io'
import cloudinary from './utils/cloudinary.js'

// routes 
import authRoute from './routes/authRoutes.js'
import postRoute from './routes/postRoutes.js'
import userRoute from './routes/userRoutes.js'
import chatRoute from './routes/chatRoutes.js'

dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT

app.use(cors())
app.use(express.json({extended: true, limit: '10000kb'}))
app.use(express.urlencoded({extended: true, limit: '10000kb'}))



const server = app.listen(port, () =>{
    console.log(`listening on ${port}`)
})

app.use('/api/auth/', authRoute)
app.use('/api/post/', postRoute)
app.use('/api/users/', userRoute)
app.use('/api/chat/', chatRoute)
// app.post('/api/upload', async (req, res)=> {
//     try {
//         const fileStr = req.body.data;
//         console.log(req.body.userId)
//         const uploadedResponse = await cloudinary.uploader.upload(fileStr, {upload_preset: 'dev_setups'})
//         console.log(uploadedResponse)
//         console.log(uploadedResponse.url)
//         res.status(200).json(uploadedResponse.url)
//     }catch(error) {
//         console.log(error)
//     }
// })



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
    socket.on('leave_room', (data) => {
        socket.leave(data)
        console.log(`User with ${socket.id} left room ${data}`)
    })
    socket.on('send_message', (data) => {
        console.log(data.message)
        socket.to(data.room).emit('recieve_message', data)
    })
    socket.on('disconnect', ()=> {
        console.log('user disconnected ' + socket.id )
    })
})