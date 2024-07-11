import React from 'react';
import Abonements from '../components/Abonements/Abonements'
import SidebarAccount from '../components/SidebarAccount/SidebarAccount';

const AbonsPage: React.FC = () => {
    return (
        <div>
            <SidebarAccount/>
            <Abonements/>
        </div>
    );
};

export default AbonsPage;