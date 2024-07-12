import React from 'react';
import CardClasses from '../components/Card/CardClasses';
import Header from '../components/Header/Header';
import Footer from './../components/Footer/Footer';

const ClassPage: React.FC = () => {
    return (
        <div>
            <Header/>
            <CardClasses/>
            <Footer/>
        </div>
    );
};

export default ClassPage;