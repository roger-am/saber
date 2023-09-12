import { Api } from '../providers/index.ts'
import { IListClient, ICreateClient } from '../interfaces/index.ts'
 
const createClient = (data:ICreateClient) =>{
   return Api.post('/', data);
}

const listClient = () =>{
    return Api.get('/');
}

const listOneClient = (id:number) =>{
    return Api.get(`/${id}`);
}

const updateClient = (id:number, data:IListClient) =>{
    return Api.put(`/${id}`, data);
}

const deleteClient = (id:number) =>{
    return Api.delete(`/${id}`);
}


export const ClientServices ={
    createClient,
    listClient,
    listOneClient,
    updateClient,
    deleteClient
}