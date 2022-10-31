import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
import * as dotenv from 'dotenv'
dotenv.config()
const app = express()



app.use(bodyParser.json({limit:'30mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))
app.use(cors({origin: 'http://localhost:3000'}))
app.get('/',(req,res)=>{
//  res.setHeader("Access-Control-Allow-Origin", "")
//  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//    // Request headers you wish to allow
//    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//    // Set to true if you need the website to include cookies in the requests sent
//    // to the API (e.g. in case you use sessions)
//    res.setHeader('Access-Control-Allow-Credentials', true); 
   res.send('Hello to memories API!')
})
app.use('/posts',postRoutes)
app.use('/user',userRoutes)
// const CONNECTION_URL = 'mongodb+srv://Tharindu:bnkgbbeJhJjjaKcs@cluster0.xaogsmw.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

mongoose.connect( process.env.CONNECTION_URL)
.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) => console.log(error.message))

