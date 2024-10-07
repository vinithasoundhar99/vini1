import { createSlice } from "@reduxjs/toolkit";




const Admin = createSlice({
    name:"admin",
    initialState:{
        loading:false,
    },
    reducers:{
        addMovierequest: (state)=>{
            return{
                ...state,
                loading:true
            }
        },
        addMovieSuccess:(state)=>{
            return{
                ...state,
                loading:false
            }
        },
        addMovieFailure:(state)=>{
            return{
                ...state,
                loading:false
            }
        },
        viewMovierequst:(state)=>{
            return{
                ...state,
                loading:true
            }
        },
        viewMovieSuccess:(state,actions)=>{
            console.log(actions?.payload?.data?.movies,'payload')
            return{
                ...state,
                movies:actions?.payload?.data?.movies
            }
        },
        viewMovieFailure:(state,actions)=>{
            return{
                ...state,
                data:actions.payload
            }
        },
        updateMovieRequest:(state)=>{
            return{
                ...state,
                loading:true
            }
        },
        updateMovieSuccess:(state)=>{
            return{
                ...state,
                loading:false
            }
        },
        updateMovieFailure:(state)=>{
            return{
                ...state,
                loading:false
            }
        },
        deleteMovieRequest:(state)=>{
            return{
                ...state,
                loading:true
            }
        },
        deleteMovieSuccess:(state)=>{
            return{
                ...state,
                loading:false
            }
        },
        deleteMovieFailure:(state)=>{
            return{
                ...state,
                loading:false
            }
        },
        Viewuserrequest:(state)=>{
            return{
                ...state,
                loading:true
            }
        },
        ViewuserSuccess:(state,actions)=>{
            console.log(actions,'payload')
            return{
                ...state,
                users:actions.payload.customers
            }
        },
        ViewuserFailure:(state)=>{
            return{
                ...state,
                loading:false
            }
        },
        viewParticularMovierequst:(state)=>{
            return{
                ...state,
                loading:true
            }
        },
        viewParticularMovieSuccess:(state,actions)=>{
            return{
                ...state,
                particularmovie:actions.payload
            }
        },
        viewParticularMovieFailure:(state,actions)=>{
            return{
                ...state,
                data:actions.payload
            }
        },
        ratingRequest:(state)=>{
            return{
                ...state,
                loading:true
            }
        },
        ratingSuccess:(state,action)=>{
            return{
                ...state,
                loading:false,
                rating:action.payload.movie
            }
        },
        ratingFailure:(state)=>{
            return{
                ...state,
                loading:false
            }
        },
        dashboardRequest:(state)=>{
            return{
                ...state,
                loading:true
            }
        },
        dashboardSuccess:(state,action)=>{
            return{
                ...state,
                loading:false,
                dashboard:action.payload
            }
        },
        dashboardFailure:(state)=>{
            return{
                ...state,
                loading:false
            }
        },
        logoutrequest:(state)=>{
            return{
                ...state,
                loading:false
            }
        },
        logoutSuccess:(state)=>{
            return{
                ...state,
                loading:false
            }
        },
        logoutFailure:(state)=>{
            return{
                ...state,
                loading:false
            }
        }
    }
});



const {actions,reducer} = Admin;

export const {addMovierequest,addMovieSuccess,addMovieFailure,viewMovierequst,viewMovieSuccess,viewMovieFailure,updateMovieRequest,updateMovieSuccess,updateMovieFailure,deleteMovieRequest,deleteMovieSuccess,deleteMovieFailure,Viewuserrequest,ViewuserSuccess,ViewuserFailure,viewParticularMovieFailure,viewParticularMovieSuccess,viewParticularMovierequst,ratingRequest,ratingFailure,ratingSuccess,
dashboardFailure,dashboardRequest,dashboardSuccess,logoutrequest,logoutSuccess,logoutFailure


} = actions;






export default reducer;