const socket = io.connect('http://localhost:8080');

let message = document.querySelector("#message");

let username = document.querySelector("#username");

let send_message = document.querySelector("#send_message");
let send_username = document.querySelector("#send_username");
let chatroom = document.querySelector("#chatroom");
let feedback = document.querySelector("#feedback");

let show_name = document.querySelector("#show_name");


let background_color_class = {
    "primary": "has-background-primary",
    "link": "has-background-link",
    "success": "has-background-success",
    "warning": "has-background-warning",
    "danger": "has-background-danger",
    "orange": "background-orange",
};




function display_name(name){
    show_name.innerHTML = `Ваш ник сейчас <span class="has-text-danger"> ${name} </span`;
}

display_name("Anonimus");

function sendMessage(){
    if(message.value !== "") {  //валидизация на сервере, здесь - для уменьшения нагрузки на сервер
        socket.emit("new_message", {"message": message.value});
        clear(message);
    }
}


send_message.onclick = () => {
    sendMessage();
};

message.addEventListener('keydown', (event)=>{
    if(event.keyCode == 13){
        sendMessage();
    }
});

socket.on("add_mes", (data)=>{
    let {username, message, color} = data;
    
    feedback.insertAdjacentHTML('beforeend',
        `<h5 class='has-text-light mes_single ${background_color_class[color]}'> <span> ${username} </span>:   ${message} </h5> `);
});

function clear(input){
    input.value = '';
}

function changeUsername(){
    if(username.value === ""){
        username.value = "Anonimus"
    }
    socket.emit('change_username', {username: username.value});
    display_name(username.value);
    clear(username);
}

send_username.onclick = () => {
    changeUsername();
};

username.addEventListener('keydown', (event)=>{
    if(event.keyCode == 13){
        changeUsername();
    }
});










