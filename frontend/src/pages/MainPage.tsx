import React from 'react';
import Header from '../components/Header/Header';
import Body from '../components/Body/Body';
import ErrorBoundary from '../errorboundary';


const MainPage: React.FC = () => {
    return (
        <ErrorBoundary>
          <Header/>
          <Body/>  
        </ErrorBoundary>
    );
};

export default MainPage;