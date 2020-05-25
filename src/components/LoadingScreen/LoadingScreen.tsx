import React from 'react';
import './loading-screen.scss';
import { Spinner } from 'react-bootstrap';

const LoadingScreen: React.StatelessComponent<{ isShow: boolean }> = (props) => {
  
  const renderLoadingScreen = () => {     
    return props.isShow && (
      <div className="loading-screen">
        <div className="spinner">
          <Spinner animation="border" />
        </div>
      </div>
    );
  }

  return (
    <div>
      { renderLoadingScreen() }
    </div>
  );
};

export { LoadingScreen };
