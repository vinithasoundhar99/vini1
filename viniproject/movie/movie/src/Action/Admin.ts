import {addMovierequest,
addMovieSuccess,
addMovieFailure,
viewMovierequst,
viewMovieSuccess,
viewMovieFailure,
updateMovieRequest,
updateMovieSuccess,
updateMovieFailure,
deleteMovieRequest,
deleteMovieSuccess,
deleteMovieFailure,
Viewuserrequest,
ViewuserSuccess,
ViewuserFailure,
viewParticularMovieFailure,
viewParticularMovieSuccess,
viewParticularMovierequst,
ratingRequest,
ratingFailure,
ratingSuccess,
dashboardFailure,
dashboardRequest,
dashboardSuccess,
logoutrequest,
logoutSuccess,
logoutFailure


} from '../Slice/Admin';
import axios from 'axios';
import { Dispatch } from 'redux';
import {toast} from 'react-toastify'




export const Addmovie = (movieDate:FormData)=>async(dispatch:Dispatch)=>{
    try{
        dispatch(addMovierequest())
        const {data} = await axios.post('/api/admin/add-movie',movieDate);
        dispatch(addMovieSuccess(data))
        toast.success('Movie Addedd Success')
    }catch(error:any){
        dispatch(addMovieFailure(error))
        toast.error("Add movie Failed")
    }
};


export const ViewMovie = () =>async(dispatch:Dispatch)=>{
    try{
        dispatch(viewMovierequst());
        const data : string[] = await axios.get('/api/admin/movies');
        dispatch(viewMovieSuccess(data));

    }catch(error:any){
        dispatch(viewMovieFailure(error))
    }
};



export const ViewParticularMovie = (id:string) => async(dispatch:Dispatch)=>{
    try{
        dispatch(viewParticularMovierequst());
        const {data} = await axios.get(`/api/admin/movie/${id}`);
        dispatch(viewParticularMovieSuccess(data))

    }catch(error){
        dispatch(viewParticularMovieFailure(error));

    }
};


export const updateMovie = (id:string,Moviedata:FormData)=>async(disptch:Dispatch)=>{
    try{
        disptch(updateMovieRequest());
        const {data} = await axios.put(`/api/admin/update-movie/${id}`,Moviedata);
        disptch(updateMovieSuccess(data));

    }catch(error:any){
        disptch(updateMovieFailure(error));


    }
};



export const deleteMovie = (id:string) => async(dispatch:Dispatch)=>{
    try{
        dispatch(deleteMovieRequest());
        const {data} = await axios.delete(`/api/admin/delete-movie/${id}`);
        dispatch(deleteMovieSuccess(data))
        toast.success('Movie Deleted Successfully')
    }catch(error:any){
        console.log(error)
        dispatch(deleteMovieFailure(error));
        toast.error('Movie Delete Failed')
    }
}


export const getusers = () => async(dispatch:Dispatch) =>{
    try{
        dispatch(Viewuserrequest());
        const { data } = await axios.get('/api/admin/customers');
        dispatch(ViewuserSuccess(data) as any)

    }catch(error:any){
        dispatch(ViewuserFailure(error))
        
    }
};





export const getRating = () => async(dispatch:Dispatch) =>{
    try{
        dispatch(ratingRequest());
        const { data } = await axios.get('/api/admin/view-rating');
        dispatch(ratingSuccess(data) as any)

    }catch(error:any){
        dispatch(ratingFailure(error))
    }
}




export const getdashboard = () => async(dispatch:Dispatch) =>{
   
    try{
        dispatch(dashboardRequest());
        const { data } = await axios.get('/api/admin/dashboard');
        dispatch(dashboardSuccess(data) as any)

    }catch(error:any){
        dispatch(dashboardFailure(error))
        
    }
}



export const logout = () => async(dispatch:Dispatch) =>{
    try{
        dispatch(logoutrequest());
        const { data } = await axios.get('/api/admin/logout');
        dispatch(logoutSuccess(data) as any);
        toast.success('Logout Success')
        window.location.href = '/'

    }catch(error:any){
        dispatch(logoutFailure(error))
        
    }
};







