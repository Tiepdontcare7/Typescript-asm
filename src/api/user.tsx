import instance from './config'
// import {IProduct} from '../types/products'

const getAllUser = () => {
    return instance.get('/users')
}
const addUser = (obj:object) => {
    return instance.post('/users', obj)
}
const deleteUser = (id:number) => {
    return instance.delete(`/users/${id}`)
}

const editUser = (id: number | string | undefined , obj:object) => {
    return instance.put(`/users/${id}`, obj)
}

export { getAllUser, deleteUser , addUser, editUser}