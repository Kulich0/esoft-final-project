import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { fetchUserById } from "../reducer/slices/userSlice";
import { setUser, setAccessToken } from "../reducer/slices/authSlice";
import { RootState, AppDispatch } from "../reducer/store";

const useAuthInit = () => {
    const dispatch: AppDispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (token && user) {
            dispatch(setAccessToken(token));
            dispatch(setUser(JSON.parse(user)));
        }

        if (token && !isAuthenticated) {
            const userId = JSON.parse(user).id;
            dispatch(fetchUserById(userId));
        }
    }, [dispatch, isAuthenticated])
};

export default useAuthInit;