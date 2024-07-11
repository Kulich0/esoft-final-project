import React from 'react';
import Price from '../components/Price/Price';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const PricePage: React.FC = () => {
    return (
        <div>
            <Header/>
            <Price/>
            <Footer/> 
        </div>
    );
};

export default PricePage;