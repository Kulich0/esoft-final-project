import React from 'react';
import MyBookings from '../components/MyBookings/MyBookings';
import SidebarAccount from '../components/SidebarAccount/SidebarAccount';
const ClassesAccountPage: React.FC = () => {
    return (
        <div>
            <MyBookings/>
            <SidebarAccount/>
            
        </div>
    );
};

export default ClassesAccountPage;