import { io } from "socket.io-client";

// 1. Создаем постоянное соединение. 
// В этот момент браузер делает HTTP-запрос, а затем переключается на веб-сокеты.
const socket = io("http://localhost:8080"); 
