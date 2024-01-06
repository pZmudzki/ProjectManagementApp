import { io } from "socket.io-client";

const URL = "https://project-management-app-govb.onrender.com";

export const socket = io(URL);
