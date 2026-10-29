import { io } from "socket.io-client";
import type { Student } from "../../shared/types";

// const socket = io("http://localhost:8080"); 
// 
// 
// socket.on("connect", () => {
//     socket.emit("join", {name: "haha"});
// });
// 
// socket.on("disconnect", () => {
//     alert('no server!');
// })
import './style.css';


const socket = io("http://localhost:8080");

const SCREEN_TYPES = ["screen-login", "screen-student", "screen-teacher"] as const;
type ScreenId = typeof SCREEN_TYPES[number];

const status_bar = document.getElementById('status-bar') as HTMLElement;
const join_btn = document.getElementById('join-btn') as HTMLButtonElement;
const name_input = document.getElementById('name-input') as HTMLInputElement;

function changeScreen(scr: ScreenId) {
    SCREEN_TYPES.forEach(scr_typ_id => {
        if (scr_typ_id == scr) {
            document.getElementById(scr_typ_id)?.classList.remove('hidden');
        } else {
            document.getElementById(scr_typ_id)?.classList.add('hidden');
        }
    });
}

changeScreen("screen-login");

socket.on('connect', () => {
    status_bar.classList.add('hidden');
});

socket.on('disconnect', () => {
    status_bar.classList.remove('hidden');
});

join_btn.onclick = function () {
    socket.emit("join", {name: name_input.value});
    changeScreen('screen-student');
}

socket.on("students_list_updated", (data: Student[]) => {
    document.getElementById('others').replaceChildren(...data.map(e => Object.assign(document.createElement("li"), {innerText: e.name})));
    console.log(data);
})
