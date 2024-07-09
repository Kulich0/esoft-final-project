import React from 'react';
import ScheduleTable from '../components/TableSchedule/TableSchedule';
import SidebarAccount from '../components/SidebarAccount/SidebarAccount';

const PricePage: React.FC = () => {
    return (
        <div>
            <ScheduleTable/>
            <SidebarAccount/>
        </div>
    );
};

export default PricePage;