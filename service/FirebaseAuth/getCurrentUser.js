import { getAuth } from "firebase/auth";

export default function getCurrentUser() {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (user !== null) {

        const currentUser = {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
            uid: user.uid,
        }
        return currentUser
    }

    return {}
}