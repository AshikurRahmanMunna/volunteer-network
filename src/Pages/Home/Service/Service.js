import React from 'react';
import './Service.css';

const Service = ({service}) => {
    const {img, title, volunteer} = service;
    const randomHex = `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}`;
    return (
        <div style={{background: randomHex}} className='service-card'>
            <img className='img-fluid' src={img} alt="" />
            <h5 className='p-3 mb-0 pb-2'>{title}</h5>
            <p className='p-0 pb-3 m-0'><small>{volunteer}</small></p>
        </div>
    );
};

export default Service;