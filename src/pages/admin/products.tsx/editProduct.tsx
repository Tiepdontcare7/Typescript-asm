import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IProduct, ICategory } from '../../../types/products'
import { editProduct } from '../../../api/products'
import { trimData, useDispatchAndNext } from '../../../utils'
import { editProducts } from '../../../redux/productSlice'

const EditProduct = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm({ shouldUnregister: false })
    const { id } = useParams()
    const {dispatch, next} = useDispatchAndNext();

    const listProduct = useSelector((state: { product: { listProduct: IProduct[] } }) => state.product.listProduct);
    const listCategory = useSelector((state: { category: { listCategory: ICategory[] } }) => state.category.listCategory);

    useEffect(() => {
        const detailProduct = listProduct.find(p => p.id === +id)
        reset(detailProduct)
    }, [listProduct, id, reset]);

    const onHandleEdit = (data: object) => {
        const cleanedData = trimData(data)

        editProduct(+id, cleanedData)
            .then((res) => {
                dispatch(editProducts(res.data))
                alert('Edit Product Success')
                next('/admin/dashboard')
            })
    }

    return (

        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg text-center">
                <h1 className="text-2xl font-bold sm:text-3xl">Edit Product Form</h1>
                <p className="mt-4 text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla
                    eaque error neque ipsa culpa autem, at itaque nostrum!
                </p>
            </div>
            <form action="" onSubmit={handleSubmit(onHandleEdit)} className="mx-auto mb-0 mt-8 max-w-md p-9 space-y-4 border border-[#ccc] rounded shadow-xl">
                <div>
                    <input {...register('name', { required: true, minLength: 3 })} type="text" className="w-full border rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm" placeholder="Enter name product" />
                    {errors.name?.type === 'required' && <span className='text-red-500'>Không được bỏ trống!</span>}
                    {errors.name?.type === 'minLength' && <span className='text-red-500'>Nhập tối thiểu 3 kí tự!</span>}
                </div>

                <div>
                    <input {...register('price', { required: true })} type="text" className="w-full border rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm" placeholder="Enter price product" />
                    {errors.name?.type === 'required' && <span className='text-red-500'>Không được bỏ trống!</span>}
                </div>

                <div>
                    <input {...register('description', { required: true, minLength: 3 })} type="text" className="w-full border rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm" placeholder="Enter description product" />
                    {errors.name?.type === 'required' && <span className='text-red-500'>Không được bỏ trống!</span>}
                    {errors.description?.type === 'minLength' && <span className='text-red-500'>Nhập tối thiểu 3 kí tự!</span>}
                </div>

                <div>
                    <input {...register('image', { required: true })} type="text" className="w-full border rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm" placeholder="Enter link image product" />
                    {errors.name?.type === 'required' && <span className='text-red-500'>Không được bỏ trống!</span>}
                </div>

                <select className='border' {...register('categoryId')}>
                    {
                        listCategory.map(i => {
                            return <option key={i.id} value={i.id}>{i.name}</option>
                        })
                    }
                </select>

                <div className="flex items-center justify-center">
                    <button type="submit" className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white">
                        Update Product
                    </button>
                </div>
            </form>
        </div>

    )
}

export default EditProduct