import { useDispatch, useSelector } from 'react-redux'
import {useForm} from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { ICategory } from '../../../types/products'
import { editCategorys } from '../../../redux/categoryProductSlice'
import { editCategory } from '../../../api/category'
import { useEffect } from 'react'

const EditCategory = () => {
    const {register, handleSubmit,reset, formState:{errors}} = useForm()
    const next = useNavigate()
    const dispatch = useDispatch()
    const {id} = useParams()

    const listCategory = useSelector((state: { category: { listCategory: ICategory[] } }) => state.category.listCategory);
    
    useEffect(()=> {
        reset(listCategory.find(c => c.id === +id))
    }, [id, reset, listCategory])

    const onHandleAdd = (data:object) => {
        editCategory(+id , data)
        .then((res) => {
            dispatch(editCategorys(res.data))
            alert('Edit Category Success')
            next('/admin/product/category')
        })
    }
    return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg text-center">
                <h1 className="text-2xl font-bold sm:text-3xl">Edit Category Form</h1>
                <p className="mt-4 text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla
                    eaque error neque ipsa culpa autem, at itaque nostrum!
                </p>
            </div>
            <form action="" onSubmit={handleSubmit(onHandleAdd)} className="mx-auto mb-0 mt-8 max-w-md p-9 space-y-4 border border-[#ccc] rounded shadow-xl">
                <div>
                    <input {...register('name', {required: true})} type="text" className="w-full border rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm" placeholder="Enter name product" />
                    {errors.name?.type === 'required' && <span className='text-red-500'>Không được bỏ trống!</span>}
                </div>

                <div className="flex items-center justify-center">
                    <button type="submit" className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white">
                        Update Product
                    </button>
                </div>
            </form>
        </div>
  )
}

export default EditCategory