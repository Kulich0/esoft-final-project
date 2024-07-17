import React from 'react';
import UserAbonements from '../components/Abonements/UserAbonements';
import SidebarAccount from '../components/SidebarAccount/SidebarAccount';

const MyAbonsPage: React.FC = () => {
    return (
        <div>
            <UserAbonements/>
            <SidebarAccount/>
        </div>
    );
};

export default MyAbonsPage;