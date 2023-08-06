import instance from './config'

const getAllCategory = () => {
    return instance.get('/categories')
}

const addCategory = (obj: object) => {
    return instance.post('/categories', obj)
}
const editCategory = (id: number | string, obj: object) => {
    return instance.put(`/categories/${id}`, obj)
}

const deleteCategory = (id: number | string) => {
    return instance.delete(`/categories/${id}`)
}

export { getAllCategory, addCategory, editCategory, deleteCategory }