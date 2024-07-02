import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

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

const port = 5000;
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

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

app.use('/api', userRouter);
app.use('/api', classesRouter);
app.use('/api', classBookingsRouter)
app.use('api', classSheduleRouter)

app.listen(port, () => {
    console.log(`SERVER STARTED ON PORT http://localhost:${port}`);
});
