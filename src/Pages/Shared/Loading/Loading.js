import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => {
    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <Spinner animation='grow' style={{width: "100px", height: "100px"}} variant='primary'></Spinner>
        </div>
    );
};

export default Loading;