//npm i express
//npm i ejs

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 7004;


//#region MiddleWares
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static("public"));

console.log(__dirname)
const server = app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})
const io = require("socket.io")(server)


//socketIO
io.on("connection",(socket)=>{
    console.log(`new connection ${socket}`)
    socket.on("chatMessage",(data)=>{
        socket.broadcast.emit("newMessage",data)
    })
    socket.on("disconnect",(info)=>{
        console.log(`${socket} user is disconnecting ${info}`)
    })
})

app.get('/',(req,res)=>{
    // res.render("index.html")
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

