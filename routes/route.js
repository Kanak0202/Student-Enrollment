import express from "express";

//controllers
import { addUser, login } from "../controllers/user-controller.js";
import { isDean, isStudent } from "../middlewares/WhichUser.js";
import {addSlot, pendingSession} from "../controllers/dean-controller.js";
import { getSlots, bookSlot } from "../controllers/student-controller.js";
const route = express.Router();

route.post('/addUser', addUser);
route.post('/login', login);
route.post('/addSlot', isDean, addSlot);
route.get('/freeSlots', isStudent, getSlots);
route.patch('/bookSlot/:id', isStudent, bookSlot);
route.get('/getPendingSessions', isDean, pendingSession);

export default route;