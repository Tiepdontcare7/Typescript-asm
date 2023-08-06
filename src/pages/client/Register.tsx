
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import bcryptjs from 'bcryptjs'
import { useNavigate, Link } from 'react-router-dom'
import { addUser } from '../../api/user'
import { addUserss } from '../../redux/userSlice'

interface IUser {
    id: number,
    username: string,
    password: number,
    roleId: number
}

function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const next = useNavigate()
    const dispatch = useDispatch()

    const listUser = useSelector((state: { user: { listUser: IUser[] } }) => state.user.listUser);

    const onHandleAdd = async (data: any) => {
        const filUser = listUser.find(a => a.username === data.username)

        if (filUser) {
            alert('Account đã tồn tại!')
            return
        } else if (data.password !== data.cfpassword) {
            alert('2 cái mật khẩu != nhau!')
            return
        } else {
            data.cfpassword = undefined;
            data.password = await bcryptjs.hash(data.password, 7)
            data.roleId = "0";

            addUser(data)
                .then((res) => {
                    dispatch(addUserss(res.data))
                    alert('Register Successfully')
                    next('/')
                })
        }
    }
    return (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg text-center">
                <h1 className="text-2xl font-bold sm:text-3xl">Register Form</h1>
                <p className="mt-4 text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla
                    eaque error neque ipsa culpa autem, at itaque nostrum!
                </p>
            </div>
            <form action="" onSubmit={handleSubmit(onHandleAdd)} className="mx-auto mb-0 mt-8 max-w-md p-9 space-y-4 border border-[#ccc] rounded shadow-xl">
                <div>
                    <input {...register('username', { required: true })} type="text" className="w-full border rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm" placeholder="Enter username" />
                    {errors.username?.type === 'required' && <span className='text-red-500'>Không được bỏ trống username!</span>}
                </div>

                <div>
                    <input {...register('password', { required: true })} type="password" className="w-full border rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm" placeholder="Enter password" />
                    {errors.password?.type === 'required' && <span className='text-red-500'>Không được bỏ trống password!</span>}
                </div>

                <div>
                    <input {...register('cfpassword', { required: true })} type="password" className="w-full border rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm" placeholder="Enter confirm password" />
                    {errors.cfpassword?.type === 'required' && <span className='text-red-500'>Không được bỏ trống password!</span>}
                </div>

                <div className='text-sm'>
                    Bạn đã có tài khoản? <Link to={'/login'} className='text-blue-700 cursor-pointer'>Đăng nhập</Link>
                </div>

                <div className="flex items-center justify-center">
                    <button type="submit" className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white">
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Register;