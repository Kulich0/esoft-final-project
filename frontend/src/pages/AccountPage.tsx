import React from 'react';
import SidebarAccount from '../components/SidebarAccount/SidebarAccount';
import CardAccount from '../components/Card/CardAccount';
const AccountPage: React.FC = () => {
    return (
        <div>
            <SidebarAccount/>
            <CardAccount/>
        </div>
    );
};

export default AccountPage;