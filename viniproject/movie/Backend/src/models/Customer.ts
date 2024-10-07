import mongoose from "mongoose";



export interface ICustomer extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    conformPassword: string;
    phone: string;
    address: string;
    role: number;
    image: string;
}





const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    conformPassword:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    role:{
        type: Number,
        default:1
    },
    image:{
        type: String,
    }

});



const Customer = mongoose.model<ICustomer>("Customer", customerSchema);

export default Customer;