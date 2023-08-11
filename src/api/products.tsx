import instance from './config'

const getAllProduct = () => {
    return instance.get('/products')
}
const addProduct = (obj: object) => {
    return instance.post('/products', obj)
}
const deleteProduct = (id:number | string | undefined) => {
    return instance.delete(`/products/${id}`)
}
const editProduct = (id:number| string | undefined, obj:object) => {
    return instance.put(`/products/${id}`, obj)
}

export { getAllProduct, addProduct, deleteProduct, editProduct }