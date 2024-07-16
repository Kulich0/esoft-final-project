import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { fetchUserById } from "../reducer/slices/userSlice";
import { setUser, setAccessToken } from "../reducer/slices/authSlice";
import { RootState, AppDispatch } from "../reducer/store";

const useAuthInit = () => {
    const dispatch: AppDispatch = useDispatch();
    const userId = useSelector((state: RootState) => state.user.user?.id);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (token && user) {
            dispatch(setAccessToken(token));
            dispatch(setUser(JSON.parse(user)));
        }

        if (token && userId) {
            dispatch(fetchUserById(userId));
        }
    }, [dispatch, userId])
};

export default useAuthInit;