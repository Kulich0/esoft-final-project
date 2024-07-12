import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
require('dotenv').config();
import net from 'net';


import UserController from './controllers/userController';
import UserService from './services/userService';
import userRoutes from './routes/userRoutes';
import UserModel from './models/userModel';

import ClassesController from './controllers/classesController';
import ClassesService from './services/classesServices';
import classesRoutes from './routes/classesRoutes';
import ClassesModel from './models/classesModel';

import ClassBookingsController from './controllers/classBookingsController';
import ClassBookingsService from './services/classBookingsServices';
import classBookingsRoutes from './routes/classBookingsRoutes';
import ClassBookingsModel from './models/classBookingsModel';

import ClassScheduleController from './controllers/classSchedulesController';
import ClassScheduleService from './services/classSchedulesServices';
import classScheduleRoutes from './routes/classSchedulesRoutes';
import ClassSchedulesModel from './models/classSchedulesModel';

import PersonalController from './controllers/personalController';
import PersonalService from './services/personalService';
import PersonalModel from './models/personalModel';
import RolesModel from './models/rolesModel';
import personalRoutes from './routes/personalRoutes';


import AbonementController from './controllers/abonementController';
import AbonementService from './services/abonementService';
import AbonementModel from './models/abonementModel';
import abonementRoutes from './routes/abonementRoutes';

import UserAbonementController from './controllers/userAbonementController';
import UserAbonementService from './services/userAbonementService';
import UserAbonModel from './models/userAbonModel';
import userAbonementRoutes from './routes/userAbonementRoutes';


const app = express();
const port = Number(process.env.PORT);


const corsOptions = {
    origin: process.env.CLIENT_URL, 
    credentials: true, 
};

app.use(cors(corsOptions)); 
app.use(bodyParser.json());
app.use(cookieParser());



const userService = new UserService(UserModel);
const userController = new UserController(userService); 
const userRouter = userRoutes(userController);

const classBookingsService = new ClassBookingsService(ClassBookingsModel);
const classBookingsController = new ClassBookingsController(classBookingsService);
const classBookingsRouter = classBookingsRoutes(classBookingsController);

const classesService = new ClassesService(ClassesModel);
const classesController = new ClassesController(classesService);
const classesRouter = classesRoutes(classesController);

const classScheduleService = new ClassScheduleService(ClassSchedulesModel);
const classScheduleController = new ClassScheduleController(classScheduleService);
const classSheduleRouter = classScheduleRoutes(classScheduleController);

const abonementService = new AbonementService(AbonementModel);
const abonementController = new AbonementController(abonementService);
const abonementRouter = abonementRoutes(abonementController);

const personalService = new PersonalService(PersonalModel, RolesModel);
const personalController = new PersonalController(personalService);
const personalRouter = personalRoutes(personalController);

const userAbonementService = new UserAbonementService(UserAbonModel);
const userAbonementController = new UserAbonementController(userAbonementService);
const userAbonementRouter = userAbonementRoutes(userAbonementController);

app.use('/api', userRouter);
app.use('/api', classesRouter);
app.use('/api', classBookingsRouter);
app.use('/api', classSheduleRouter);
app.use('/api', personalRouter);
app.use('/api', abonementRouter);
app.use('/api', userAbonementRouter);


app.listen(port, '0.0.0.0' , () => {
    console.log(`SERVER STARTED ON PORT 0.0.0.0:${port}`);
});
