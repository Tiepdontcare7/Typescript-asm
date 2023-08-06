
import { useDispatch, useSelector } from "react-redux";
import { SideBar } from "../../../components/Admin";
import { ICategory } from "../../../types/products";
import {Link} from 'react-router-dom'
import { deleteCategory } from "../../../api/category";
import { postCategoryProducts } from "../../../redux/categoryProductSlice";


const CategoryPage = () => {
    const dispatch = useDispatch();
    const listCategory = useSelector((state: { category: { listCategory: ICategory[] } }) => state.category.listCategory);
    
    const onHandleDelete =(id:number) => {
        confirm(`Are you sure you want to delete?`) ?
        deleteCategory(id)
        .then(() => {
            dispatch(postCategoryProducts(listCategory.filter(c => c.id !== id)))
            alert('Delete category successfully')
        }) : undefined
    }
    
    return (
        <div className="container">
            <SideBar/>

            <div className="container-right">

                <div className="overflow-x-auto">
                    <table className="border text-center min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="ltr:text-left rtl:text-right">
                            <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    Id
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Category name
                                </th>
                                
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    Acction
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {
                                listCategory.map((category,i) => {
                                    return (
                                        <tr key={i}>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                {category?.id}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                {category?.name}
                                            </td>
                                            
                                            <td className="whitespace-nowrap px-4 py-2">
                                                <Link to={`/admin/product/category/edit/${category.id}`} className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
                                                    Update
                                                </Link>
                                                <a onClick={()=> onHandleDelete(category.id)} href="#" className="ml-2 inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
                                                    Delete
                                                </a>
                                            </td>
                                        </tr>

                                    )
                                })
                            }
                            
                        </tbody>
                    </table>
                    <Link to={'/admin/product/category/add'} className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
                        Add New Category
                    </Link>
                </div>

            </div>
        </div >
    )
};

export default CategoryPage;
