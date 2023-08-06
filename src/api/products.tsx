import instance from './config'
import {IProduct} from '../types/products'

const getAllProduct = () => {
    return instance.get('/products')
}
const addProduct = (obj:IProduct) => {
    return instance.post('/products', obj)
}
const deleteProduct = (id:number) => {
    return instance.delete(`/products/${id}`)
}
const editProduct = (id:number, obj:object) => {
    return instance.put(`/products/${id}`, obj)
}

export { getAllProduct, addProduct, deleteProduct, editProduct }