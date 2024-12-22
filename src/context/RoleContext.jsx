
import React, { createContext, useState, useContext } from 'react';


const RoleContext = createContext();


export const RoleProvider = ({ children }) => {
    const [role, setRole] = useState(localStorage.getItem('role') || ''); 

    return (
        <RoleContext.Provider value={{ role, setRole }}>
            {children}
        </RoleContext.Provider>
    );
};

// Custom hook to use the RoleContext
export const useRole = () => {
    return useContext(RoleContext);
};
