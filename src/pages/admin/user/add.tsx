import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { addUser } from '../../../api/user'
import { addUserss } from '../../../redux/userSlice'
import bcryptjs from 'bcryptjs'

interface IUser {
    id: number,
    username: string,
    password: number,
    roleId: number
}

const AddUser = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({shouldUnregister: false})
    const next = useNavigate()
    const dispatch = useDispatch()

    const listUser = useSelector((state: { user: { listUser: IUser[] } }) => state.user.listUser);

    const onHandleAdd = async (data:any) => {
        const cleanedData:any = {};
        Object.keys(data).forEach(key => {
            cleanedData[key] = typeof data[key] === "string" ? data[key].trim() : data[key];
        });
        
        const filUser = listUser.find(a => a.username === cleanedData.username)

        if (filUser) {
            alert('Account đã tồn tại!')
            return
        } else if (cleanedData.password !== cleanedData.cfpassword) {
            alert('2 cái mật khẩu != nhau!')
            return
        } else {
            cleanedData.cfpassword = undefined;
            cleanedData.password = await bcryptjs.hash(data.password, 7)
            addUser(cleanedData)
                .then((res) => {
                    dispatch(addUserss(res.data))
                    alert('Add User Success')
                    next('/admin/users')
                })
        }
    }
    return (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg text-center">
                <h1 className="text-2xl font-bold sm:text-3xl">Add User Form</h1>
                <p className="mt-4 text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla
                    eaque error neque ipsa culpa autem, at itaque nostrum!
                </p>
            </div>
            <form action="" onSubmit={handleSubmit(onHandleAdd)} className="mx-auto mb-0 mt-8 max-w-md p-9 space-y-4 border border-[#ccc] rounded shadow-xl">
                <div>
                    <input {...register('username', { required: true, minLength: 5 })} type="text" className="w-full border rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm" placeholder="Enter username" />
                    {errors.username?.type === 'required' && <span className='text-red-500'>Không được bỏ trống username!</span>}
                    {errors.username?.type === 'minLength' && <span className='text-red-500'>Nhập tối thiểu 5 kí tự!</span>}
                </div>

                <div>
                    <input {...register('password', { required: true, minLength: 5 })} type="password" className="w-full border rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm" placeholder="Enter password" />
                    {errors.password?.type === 'required' && <span className='text-red-500'>Không được bỏ trống password!</span>}
                    {errors.password?.type === 'required' && <span className='text-red-500'>Nhập tối thiểu 5 kí tự!</span>}
                </div>

                <div>
                    <input {...register('cfpassword', { required: true, minLength: 5 })} type="password" className="w-full border rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm" placeholder="Enter confirm password" />
                    {errors.cfpassword?.type === 'required' && <span className='text-red-500'>Không được bỏ trống password!</span>}
                    {errors.cfpassword?.type === 'required' && <span className='text-red-500'>Nhập tối thiểu 5 kí tự!</span>}
                </div>

                <div>
                    <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900">
                        Role:
                    </label>
                    <select {...register('roleId')} name="HeadlineAct" id="HeadlineAct" className="border-[#000] py-3 mt-1.5 w-full rounded-lg text-gray-700 sm:text-sm">
                        <option value="0">User</option>
                        <option value="1">Admin</option>
                    </select>
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

export default AddUser