
import { useSelector, useDispatch } from "react-redux";
import { SideBar } from "../../../components/Admin";
import { Link } from 'react-router-dom'
import { deleteUser } from "../../../api/user";
import { postUser } from "../../../redux/userSlice";


interface IUser {
    id: number,
    username: string,
    password: number,
    roleId: number
}

const ListUserPage = () => {
    const dispatch = useDispatch();

    const listUser = useSelector((state: { user: { listUser: IUser[] } }) => state.user.listUser);

    const handleDeleteUser = (id: number) => {
        confirm(`Are you sure you want to delete user?`) ?
            deleteUser(id).then(() => {
                alert(`User deleted`);
                dispatch(postUser(listUser.filter(user => user.id !== id)))
            }) : undefined
    }

    return (
        <div className="container">
            <SideBar />

            <div className="container-right">

                <div className="overflow-x-auto">
                    <table className="border text-center min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="ltr:text-left rtl:text-right">
                            <tr>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    Id
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    username
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    Role
                                </th>

                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    Acction
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {
                                listUser.map((user) => {
                                    return (
                                        <tr key={user.id}>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                {user?.id}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                {user?.username}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                {user?.roleId == 1 ? 'admin' : 'user'}
                                            </td>

                                            <td className="whitespace-nowrap px-4 py-2">
                                                <Link to={`/admin/users/edit/${user.id}`} className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
                                                    Update
                                                </Link>
                                                <a onClick={() => handleDeleteUser(user.id)} href="#" className="ml-2 inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
                                                    Delete
                                                </a>
                                            </td>
                                        </tr>

                                    )
                                })
                            }

                        </tbody>
                    </table>
                    <Link to={'/admin/users/add'} className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
                        Add New User
                    </Link>
                </div>

            </div>
        </div >
    )
};

export default ListUserPage;
