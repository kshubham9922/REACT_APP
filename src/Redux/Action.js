import { toast } from "react-toastify"
import { ADD_CUSTOMER, DELETE_CUSTOMER, FAIL_REQUEST, GET_CUSTOMER_LIST, GET_CUSTOMER_OBJ, MAKE_REQUEST, UPDATE_CUSTOMER } from "./ActionType"
import axios from 'axios'
import UpdateCustomer from "../Component/UpdateCustomer"

const baseUrl = "http://localhost:47803/"

export const makeRequest= () => {
    return {
        type:MAKE_REQUEST
    }
}

export const failRequest=(err) => {
    return {
        type:FAIL_REQUEST,
        //payload:err
    }
}

export const getUserList=(data) => {
    return {
        type:GET_CUSTOMER_LIST,
        payload:data
    }
}

export const deleteCustomer= () => {
    return {
        type:DELETE_CUSTOMER
    }
}

export const addCustomer= () => {
    return {
        type:ADD_CUSTOMER
    }
}

export const updateCustomer= () => {
    return {
        type:UPDATE_CUSTOMER
    }
}

export const getCustomerObj= (data) => {
    return {
        type:GET_CUSTOMER_OBJ,
        payload:data
    }
}

export const FetchUserList = () => {
    return (dispatch) => {
        dispatch(makeRequest());
        axios.get(baseUrl + 'api/Customer').then(res=>{
            const userlist = res.data;
            //console.log(userlist);
            dispatch(getUserList(userlist));
        }).catch(err=>{
            dispatch(failRequest(err.message));
        })
    }
}

export const removeCustomer = (code) => {
    return (dispatch) => {
        dispatch(makeRequest());
        axios.delete(baseUrl + 'api/Customer/' + code).then(res=>{
            dispatch(deleteCustomer());
            dispatch(FetchUserList());
        }).catch(err=>{
            dispatch(failRequest(err.message));
        })
    }
}

export const FunctionAddCustomer = (data) => {
    return (dispatch) => {
        dispatch(makeRequest());
        //console.log(data)
        
        axios.post(baseUrl + 'api/Customer', data).then(res=>{
            dispatch(addCustomer());
            toast.success('User add successfully.')
            dispatch(FetchUserList());
        }).catch(err=>{
            dispatch(failRequest(err.message));
        })
    }
}

export const FunctionUpdateCustomer = (custObj, data, code) => {
    
    const id = custObj.id;
    const firstname = data.firstname;
    const lastname = data.lastname;
    const email = data.email;
    const countryCode = data.countryCode;
    const phoneNumber = data.phoneNumber;
    const gender = data.gender;    
    const balance = data.balance;

    const fData = { id, firstname, lastname, email, gender, phoneNumber, countryCode, balance}

    //console.log(fData);
    return (dispatch) => {
        dispatch(makeRequest());
        axios.post(baseUrl + 'api/Customer/'+code, fData).then(res=>{
            dispatch(updateCustomer());
            //dispatch(FetchUserList());
            toast.success('User updated successfully.')
        }).catch(err=>{
            console.log(err);
            dispatch(failRequest(err.message));
        })
    }
}

export const FetchUserObj = (code) => {
    return (dispatch) => {
        dispatch(makeRequest());
        axios.get(baseUrl + 'api/Customer/' + code).then(res=>{
            const customerObj = res.data;
            dispatch(getCustomerObj(customerObj));
        }).catch(err=>{
            dispatch(failRequest(err.message));
        })
    }
}