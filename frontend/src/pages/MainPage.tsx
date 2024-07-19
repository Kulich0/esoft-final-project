import React from 'react';
import Header from '../components/Header/Header';
import Body from '../components/Body/Body';
import ErrorBoundary from '../errorboundary';
import Footer from '../components/Footer/Footer';


const MainPage: React.FC = () => {
    return (
        <ErrorBoundary>
          <Header/>
          <Body/> 
          <Footer/> 
        </ErrorBoundary>
    );
};

export default MainPage;