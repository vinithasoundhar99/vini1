import { createSlice } from "@reduxjs/toolkit";




const userSlice = createSlice({
    name:"user",
    initialState:{
        loading:false,
    },  
    reducers:{
       registerRequest:(state) => {
              state.loading = true;
         },
        registerSuccess:(state) => {
            state.loading = false;
        },
        registerFail:(state) => {
            state.loading = false;
        },
        loginRequest:(state) => {
            state.loading = true;
        },
        loginSuccess:(state) => {
            state.loading = false;
        },
        loginFail:(state) => {
            state.loading = false;
        },
        Viewmovierequest:(state) =>{
            state.loading = true;
        },
        Viewmoviesuccess:(state,actions)=>{
            console.log(actions.payload,'payload')
            return{
                ...state,
                loading:false,
                movies:actions.payload.movies
            }
          
        },
        Viewmoviefalse:(state)=>{
            state.loading=false
        },
        viewParticularMovierequst:(state)=>{
            state.loading=true
        },
        viewParticularMovieSuccess:(state,action)=>{
            console.log(action.payload.movie,'payload')
            return{
                ...state,
                loading:false,
                movie:action.payload.movie,
                recomendation:action.payload.recomendation

            }
         
        },
        viewParticularMovieFailure:(state)=>{
            state.loading=false
        },
        Giveratingmovierequest:(state)=>{
            state.loading=true;
        },
        Giveratingmoviesuccess:(state)=>{
            state.loading=false
        },
        Giveratingmoviefailure:(state)=>{
            state.loading=false
        },
        logoutrequest:(state)=>{
            state.loading=true;
        },
        logoutsuccess:(state)=>{
            state.loading=false;
        },
        logoutfailure:(state)=>{
            state.loading=false;
        }
        
    },
})



const { actions, reducer } = userSlice;

export const { registerRequest, registerSuccess, registerFail ,loginFail,loginRequest,loginSuccess,
Viewmoviefalse,Viewmovierequest,Viewmoviesuccess,viewParticularMovierequst,viewParticularMovieSuccess,viewParticularMovieFailure,Giveratingmoviefailure,Giveratingmovierequest,Giveratingmoviesuccess,logoutfailure,logoutrequest,logoutsuccess
} = actions;

export default reducer;
