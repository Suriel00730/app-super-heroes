import React, { useEffect, useState } from "react";
import { AUTH_TOKEN } from "../constants";
import authContext from "../contexts/authContext";

const ProvideAuth = ({ children }) => {
    const [token, setToken] = useState()

    useEffect(() => {
        const localStorageToken = window.localStorage[AUTH_TOKEN];
        if (!localStorageToken) {
            setToken('')
            return;
        };
        const myToken = JSON.parse(localStorageToken);
        setToken(myToken.token);

        // eslint-disable-next-line
    }, [])

    return (
        <authContext.Provider value={{ token }}>
            {children}
        </authContext.Provider>
    )
}

export default ProvideAuth;