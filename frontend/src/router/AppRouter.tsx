import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainPage from '../pages/MainPage';
import AboutPage from '../pages/AboutPage';
import ClassPage from '../pages/ClassPage';
import SchedulePage from '../pages/SchedulePage'; 
import PricePage from '../pages/PricePage';
import ContactsPage from '../pages/ContactsPage';

const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainPage/>} path='/'/>
                <Route element={<AboutPage/>} path='/about'/>
                <Route element={<ClassPage/>} path='/classes'/>
                <Route element={<SchedulePage/>} path='/schedule'/> 
                <Route element={<PricePage/>} path='/price'/>
                <Route element={<ContactsPage/>} path='/contacts'/>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
