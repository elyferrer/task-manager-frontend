import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/tasks/taskSlice";
import userReducer from "../features/users/userSlice";

export const store = configureStore({
    reducer: {
        task: taskReducer,
        user: userReducer
    }
});