import { io } from "socket.io-client";
import type { Student } from "../../shared/types";

import './style.css';
import './custom-tags';

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

function authBy(name: string) {
    if (name == "admin") changeScreen('screen-teacher');
    else changeScreen('screen-student');
    socket.emit("join", {name: name});
}

changeScreen("screen-login");
if (localStorage.my_name != null) authBy(localStorage.my_name);

socket.on('connect', () => {
    status_bar.classList.add('hidden');
});

socket.on('disconnect', () => {
    status_bar.classList.remove('hidden');
});

join_btn.onclick = function () {
    if (name_input.value == "") return;
    localStorage.my_name = name_input.value;
    authBy(name_input.value);
}

socket.on("students_list_updated", (data: Student[]) => {
    document.getElementById('others').replaceChildren(...data.map(e => Object.assign(document.createElement("li"), {innerText: e.name})));
    console.log(data);
})
