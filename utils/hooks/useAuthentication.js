import React from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export function useAuthentication() {
    const [user, setUser] = React.useState();

    React.useEffect(() => {
        const auth = getAuth();
        const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(undefined);
            }
        });

        return unsubscribeFromAuthStatuChanged;
    }, []);

    return {
        user
    };
}