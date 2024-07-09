import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bcrypt from 'bcrypt';
import db  from './db';

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

/* const createAdmin = async () => {
    const saltRounds = 10;
    const password = '*******';
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
        await db('personal').insert({
            persname: '*******',
            email: 'stepan.09myromec@gmail.com',
            password: hashedPassword,
            bio: 'System Administrator',
            role_id: 1,
            created_at: db.fn.now(),
            updated_at: db.fn.now()
        });
        console.log('Администратор успешно добавлен');
    } catch (error) {
        console.error('Ошибка при добавлении администратора:', error);
    } finally {
        await db.destroy(); 
    }
};

createAdmin(); */

const port = 5000;
const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', 
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

const personalService = new PersonalService(PersonalModel, RolesModel);
const personalController = new PersonalController(personalService);
const personalRouter = personalRoutes(personalController);

app.use('/api', userRouter);
app.use('/api', classesRouter);
app.use('/api', classBookingsRouter);
app.use('/api', classSheduleRouter);
app.use('/api', personalRouter);


app.listen(port, () => {
    console.log(`SERVER STARTED ON PORT http://localhost:${port}`);
});
