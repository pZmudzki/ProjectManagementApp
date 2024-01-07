import { io } from "socket.io-client";

import config from "../config";

const environment = import.meta.env.VITE_NODE_ENV || "development";
const { serverUrl } = config[environment];

export const socket = io(serverUrl);
