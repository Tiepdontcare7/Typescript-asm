import { useSelector } from 'react-redux'
import {useForm} from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { editUser } from '../../../api/user'
import { editUserss } from '../../../redux/userSlice'
import { trimData, useDispatchAndNext } from '../../../utils'

interface IUser {
    id: string | number,
    username: string,
    password: string
}

const EditUser = () => {
    const {register, handleSubmit,reset, formState:{errors}} = useForm({shouldUnregister: false})
    const {dispatch, next} = useDispatchAndNext()
    const {id} = useParams()

    const listUser = useSelector((state: { user: { listUser: IUser[] } }) => state.user.listUser);
    
    useEffect(()=> {
        reset(listUser.find(u => u.id === +id))
    }, [id, reset, listUser])

    const onHandleAdd = (data:object) => {
        const cleanedData = trimData(data)

        editUser(+id , cleanedData)
        .then((res) => {
            dispatch(editUserss(res.data))
            alert('Edit User Success')
            next('/admin/users')
        })
    }
    return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg text-center">
                <h1 className="text-2xl font-bold sm:text-3xl">Edit User Form</h1>
                <p className="mt-4 text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla
                    eaque error neque ipsa culpa autem, at itaque nostrum!
                </p>
            </div>
            <form action="" onSubmit={handleSubmit(onHandleAdd)} className="mx-auto mb-0 mt-8 max-w-md p-9 space-y-4 border border-[#ccc] rounded shadow-xl">
                <div>
                    <input {...register('username', {required: true})} type="text" className="w-full border rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm" placeholder="Enter name product" />
                    {errors.username?.type === 'required' && <span className='text-red-500'>Không được bỏ trống!</span>}
                </div>

                Role :
                <select className='border' {...register('roleId')}>
                    <option value="0">User</option>
                    <option value="1">Admin</option>
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

export default EditUser