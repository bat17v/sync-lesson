// import express from "express";
import { Student } from "../shared/types";
import { createServer } from "http";
import { Server } from "socket.io";

// const app = express();
const students = new Map<string, Student>; 

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173"
    }
});

io.on("connection", (socket) => {
    console.log(`User ${socket.id} connected!`);

    socket.on("join", (data) => {
        console.log("It's join event from", socket.id, data.name);
        students.set(socket.id, {socket_id: socket.id, name: data.name});
        io.emit("students_list_updated", Array.from(students.values()));
    });

    socket.on("disconnect", () => {

        console.log(`User ${socket.id} disconnected!`);
        students.delete(socket.id);
        io.emit("students_list_updated", Array.from(students.values()));
    })
});

httpServer.listen(8080, () => {
  console.log("Сервер слушает порт 8080");
});
