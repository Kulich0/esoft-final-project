import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainPage from '../pages/MainPage';
import ClassPage from '../pages/ClassPage';
import SchedulePage from '../pages/SchedulePage'; 
import PricePage from '../pages/PricePage';
import LoginPage from '../pages/LoginPage';
import AccountPage from '../pages/AccountPage';
import ProfileSchedulePage from '../pages/ProfileSchedulePage'
import ClassesAccountPage from '../pages/ClassesAccountPage'
import AbonsPage from '../pages/AbonsPage'
import MyAbonsPage from '../pages/MyAbonsPage';

const routes = [
    {path: '/', element: <MainPage/>},
    {path: '/classes', element: <ClassPage/>},
    {path: '/schedule', element: <SchedulePage/>},
    {path: '/price', element: <PricePage/>},
    {path: '/login', element: <LoginPage/>},
    {path: '/users/:id', element: <AccountPage/>},
    {path: '/profile-schedule/users/:id', element: <ProfileSchedulePage/>},
    {path: '/class-bookings/users/:userId', element: <ClassesAccountPage /> },
    {path: '/users/:id', element: <AccountPage/>},
    {path: '/abonements/:id', element: <AbonsPage/>},
    {path: '/usabonements/users/:userId', element: <MyAbonsPage/> },

];


const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element}/>
                ))}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
