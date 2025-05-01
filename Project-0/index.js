const express=require("express")
const fs = require("fs");
const { connectMongoDb } =require('./connection.js')
const {logReqRes} =require('./middleware/middleware.js') 
const userRouter =require('./routes/user.route.js')

const app = express();
const PORT = 8000;


//connection
connectMongoDb("mongodb://localhost:27017/youtube-app-1")
.then(()=> console.log("MongoDb connected!!") )

//Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

app.use(logReqRes('log.txt'));

app.use('/api/users',userRouter);

app.listen(PORT, () => console.log(`Server started at Port : ${PORT}`));
