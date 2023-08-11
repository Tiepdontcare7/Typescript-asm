import { useForm, SubmitHandler } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useDispatchAndNext, trimData } from '../../../utils'
import { addCategorys } from '../../../redux/categoryProductSlice'
import { addCategory } from '../../../api/category'
import { ICategory } from '../../../types/products'


const AddCategory = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ICategory>({ shouldUnregister: false })
    const { dispatch, next } = useDispatchAndNext()

    const listCategory = useSelector((state: { category: { listCategory: ICategory[] } }) => state.category.listCategory)

    const onHandleAdd: SubmitHandler<ICategory> = (data) => {
        const cleanedData = trimData(data)
        const filLCate = listCategory.find(c => c.name === cleanedData.name)

        if (filLCate) {
            alert('Danh mục đã tồn tại!')
        } else {
            addCategory(cleanedData)
                .then((res) => {
                    dispatch(addCategorys(res.data))
                    alert('Add Category Success')
                    next('/admin/product/category')
                })
        }
    }
    return (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg text-center">
                <h1 className="text-2xl font-bold sm:text-3xl">Add Category Form</h1>
                <p className="mt-4 text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla
                    eaque error neque ipsa culpa autem, at itaque nostrum!
                </p>
            </div>
            <form action="" onSubmit={handleSubmit(onHandleAdd)} className="mx-auto mb-0 mt-8 max-w-md p-9 space-y-4 border border-[#ccc] rounded shadow-xl">
                <div>
                    <input {...register('name', { required: true, minLength: 3 })} type="text" className="w-full border rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm" placeholder="Enter name product" />
                    {errors.name?.type === 'required' && <span className='text-red-500'>Không được bỏ trống name!</span>}
                    {errors.name?.type === 'minLength' && <span className='text-red-500'>Name tối thiểu 3 kí tự!</span>}
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

export default AddCategory