const express = require('express');
const favicon = require('express-favicon');

let colors = ["primary", "link", "success", "warning", "danger", "orange"];

function getRand(arr){
    return  Math.floor(Math.random() * arr.length);
    // return rand_num;
}


port = process.env.PORT || 8080;

const app = express();

app.set("view engine", "ejs");


app.use(express.static("public"));
app.use(favicon(__dirname+'/favicon.png'));

app.get("/", (req,res)=>{
    res.render("index")
});



server = app.listen(port, ()=>{
    console.log("server поднялся");
    console.log('http://localhost:8080');
});


const io = require("socket.io")(server);

io.on("connection", (socket)=>{
    console.log("У вас чате есть новый пользователь!");

    socket.username = "Anonimus";
    socket.color = colors[getRand(colors)];

    socket.on("change_username", (data) =>{

        if(data.username === ""){
            data.username = "Anonimus";
        }

        if(socket.username !== data.username) {
            console.log(`поменяли имя c ${socket.username} на ${data.username}`);
            socket.username = data.username;
        }
    });

    socket.on("new_message", (data)=>{
        if(data.message !== "") {
            io.sockets.emit("add_mes", {"message": data.message, "username": socket.username, "color": socket.color});
            console.log(`всем отправлены сообщения ${socket.username}: ${data.message}`)
        }
    })
});