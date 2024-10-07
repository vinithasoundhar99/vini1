import {registerRequest , registerSuccess, registerFail, loginRequest, loginSuccess, loginFail,


    Viewmoviefalse,Viewmovierequest,Viewmoviesuccess,viewParticularMovierequst,viewParticularMovieSuccess,viewParticularMovieFailure,Giveratingmoviefailure,Giveratingmovierequest,Giveratingmoviesuccess,logoutfailure,logoutrequest,logoutsuccess



} from "../Slice/User";
import {Dispatch} from "redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'








export const register = (userData:FormData) => async (dispatch:Dispatch) => {
    try {
        dispatch(registerRequest());
        console.log(userData,"user data");
        const {data} = await axios.post("/api/user/register",userData);
        dispatch(registerSuccess(data));
        toast.success('Register Successfully')
    } catch (error:any) {
        dispatch(registerFail(error));
        toast.error(error.data.message)
    }
}


export const login = (email:string,password:string) => async (dispatch:Dispatch) => {
    try {
        if(email === "admin@gmail.com" || password === "password"){
            dispatch(loginRequest());
            const {data} = await axios.post("/api/admin/login",{email,password});   
            dispatch(loginSuccess(data));
            toast.success('Login successfully')
            window.location.href = "/admin";
        }else{
            dispatch(loginRequest());
            const {data} = await axios.post("/api/user/login",{email,password});
            dispatch(loginSuccess(data));
            toast.success('Login successfully');
            localStorage.setItem("userInfo",JSON.stringify(data?.customer));
            window.location.href = "/customer";
        }
    } catch (error:any) {
        dispatch(loginFail(error));
    }
}



export const ViewMovie = () => async (dispatch:Dispatch) => {
    try {
        dispatch(Viewmovierequest());
        const {data} = await axios.get("/api/user/movies");
        dispatch(Viewmoviesuccess(data));
    } catch (error:any) {
        dispatch(Viewmoviefalse());
    }
}




export const ViewParticularMovie = (id:string) => async (dispatch:Dispatch) => {
    try {
        dispatch(viewParticularMovierequst());
        const {data} = await axios.get(`/api/user/movie/${id}`);
        dispatch(viewParticularMovieSuccess(data));
    } catch (error) {
        dispatch(viewParticularMovieFailure());
    }
}




export const GiveRating = (id:string,userid:string,rating:string,review:string) => async (dispatch:Dispatch) => {
    try {
        console.log(id,userid,rating,review);
        dispatch(Giveratingmovierequest());
        const {data} = await axios.post(`/api/user/movie/${id}`,{
            customerid:userid,
            rating,
            review
        });
        dispatch(Giveratingmoviesuccess(data));
        toast.success('Rating Added Successfully')
    } catch (error) {
        dispatch(Giveratingmoviefailure());
        toast.error('Rating Failed')
    }
}



export const logout = () => async (dispatch:Dispatch) => {
    try {
        dispatch(logoutrequest());
        const {data} = await axios.delete("/api/user/logout");
        dispatch(logoutsuccess(data));
        localStorage.removeItem("userInfo");
        window.location.href = "/";
    } catch (error) {
        dispatch(logoutfailure());
    }
}