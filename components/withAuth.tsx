// /* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useState, useEffect } from 'react'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router';


export const withAuth = (Component) => {
    const AuthenticatedComponent = () => {
        const router = useRouter();
        const [data, setData] = useState()

        useEffect(() => {
            const getUser = async () => {

                const user = Cookie.get('user')
                if (!user) {
                    router.push('/auth/login');
                } else {
                    setData(JSON.parse(user));
                }  
            };
            getUser();
        }, []);

        return !!data ? <Component data={data} /> : null; // Render whatever you want while the authentication occurs
    };

    return AuthenticatedComponent;
};