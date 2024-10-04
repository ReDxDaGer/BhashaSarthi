"use client"

import { useContext, useEffect , FC} from "react";
import { useRouter } from "next/navigation";
import AuthContext from "../app/context/AuthContext";

interface ProtectedRouteProps {
    children: React.ReactNode;
};

const ProtectedRoute:FC<ProtectedRouteProps> = ({ children }) => {
    const { user } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    return user ? children : null;
};

export default ProtectedRoute;