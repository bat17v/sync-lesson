// import express from "express";
import type { Lesson, Student, Role } from "../shared/types";
import { createServer } from "http";
import { Server } from "socket.io";

// const app = express();
const students = new Map<string, Student>; 
var actual_lesson: Lesson = {title:"", slides:[]};

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173"
    }
});

io.on("connection", (socket) => {
    console.log(`User ${socket.id} connected!`);
    let role: Role;

    socket.on("join", (data) => {
        console.log("It's join event from", socket.id, data.name);
        if (data.name == 'admin') role = 'admin';
        else role = 'student';

        if (role == 'admin') {
            socket.emit('actual_lesson', {lesson: actual_lesson});
        } else {
            students.set(socket.id, {socket_id: socket.id, name: data.name});
            io.emit("students_list_updated", Array.from(students.values()));
        }
    });

    socket.on("disconnect", () => {
        console.log(`User ${socket.id} disconnected!`);
        students.delete(socket.id);
        io.emit("students_list_updated", Array.from(students.values()));
    });

    socket.on("update_lesson", (data) => {
        if (role != 'admin') return;
        let t = JSON.parse(data.lesson) as Lesson;
        actual_lesson = t;
        socket.emit('actual_lesson', {lesson: actual_lesson});
    });
});

httpServer.listen(8080, () => {
  console.log("Сервер слушает порт 8080");
});
