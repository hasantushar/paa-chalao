import { useContext, useEffect } from 'react';
import { Context as AuthContext } from '../context/AuthContext';

const ResolveAuthScreen = () => {
    const { localSignin } = useContext(AuthContext);

    useEffect(() => {
        localSignin();
    }, []);

    return null;
};

export default ResolveAuthScreen;