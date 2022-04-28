import axios from 'axios';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../../firebase.init';

const RequireAdmin = ({children}) => {
    const [user, loading, error] = useAuthState(auth);
    const [dbUser, setDbUser] = useState();
    const location = useLocation();
    axios.get(`http://localhost:5000/volunteerByEmail?email=${user.email}`)
    .then(res => setDbUser(res.data))
    if(dbUser.role === 'admin') {
        return <Navigate to="/register/admin" state={{ from: location }} replace />
    }
    return children;
};

export default RequireAdmin;