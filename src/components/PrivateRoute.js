import React, { useContext, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import authContext from '../contexts/authContext';

const PrivateRoute = ({ component, rest }) => {
    const auth = useContext(authContext)
    const history = useHistory()

    useEffect(() => {
        console.log(history)
        if (!auth.token) {
            history.push('/login')
        }

        // eslint-disable-next-line
    }, [auth])

    return (
        <Route
            {...rest}
            component={component}
        />
    );
}

export default PrivateRoute;