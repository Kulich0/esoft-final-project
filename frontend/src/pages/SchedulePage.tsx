import React from 'react';
import TableSchedule from '../components/TableSchedule/TableSchedule';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const SchedulePage: React.FC = () => {
    return (
        <div>
            <Header/>
            <TableSchedule/>
            <Footer/>
        </div>
    );
};

export default SchedulePage;