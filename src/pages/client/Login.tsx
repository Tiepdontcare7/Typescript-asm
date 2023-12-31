
import { useSelector } from 'react-redux'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import bcryptjs from 'bcryptjs'
import { trimData } from '../../utils'

interface IUser {
    id?: number,
    username: string,
    password: number,
    roleId?: number
}

interface Idata {
    username: string,
    password: string
}

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<Idata>()
    const next = useNavigate()

    const listUser = useSelector((state: { user: { listUser: IUser[] } }) => state.user.listUser);

    const onHandleAdd:SubmitHandler<Idata> = async (data) => {
        const dataclean = trimData(data);
        
        const filUser: IUser | undefined = listUser.find(a => a.username === dataclean.username)
        if (filUser) {
            const checkPassword = await bcryptjs.compare(dataclean.password, String(filUser.password))
            if (!checkPassword) {
                alert('Sai mật khẩu, kiểm tra lại!')
            } else {
                alert('Đăng nhập thành công!')
                localStorage.setItem('username', filUser.username)
                next('/')
            }
        } else {
            confirm('Tài khoản không hợp lệ, bạn có muốn đăng ký không?') ? next('/register') : undefined
        }
    }
    return (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg text-center">
                <h1 className="text-2xl font-bold sm:text-3xl">Login Form</h1>
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

                <div className='text-sm'>
                    Bạn chưa có tài khoản? <Link to={'/register'} className='text-blue-700 cursor-pointer'>Đăng ký</Link>
                </div>

                <div className="flex items-center justify-center">
                    <button type="submit" className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;