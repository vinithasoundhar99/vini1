import { configureStore,combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import user from "./Slice/User";
import admin from "./Slice/Admin";



const reducer = combineReducers({
    user:user,
    admin:admin

});


const store = configureStore({
    reducer,
    middleware:getDefaultMiddleware => getDefaultMiddleware().concat(thunk)
});

export default store;
