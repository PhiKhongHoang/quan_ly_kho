import { createContext, useState } from 'react';

export const AuthContext = createContext({
    id: "",
    email: "",
    name: "",
    role: {
        id: "",
        name: "",
        active: "",
        permissions: [], // Khởi tạo là mảng rỗng
    }
});

export const AuthWrapper = (props) => {
    const [user, setUser] = useState({
        id: "",
        email: "",
        name: "",
        role: {
            id: "",
            name: "",
            active: "",
            permissions: [], // Khởi tạo là mảng rỗng
        }
    })

    const [isAppLoading, setIsAppLoading] = useState(true)

    return (
        <AuthContext.Provider value={{ user, setUser, isAppLoading, setIsAppLoading }}>
            {props.children}
        </AuthContext.Provider>
    )
}

