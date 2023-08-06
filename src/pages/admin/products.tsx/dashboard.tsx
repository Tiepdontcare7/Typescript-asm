import { useSelector, useDispatch } from "react-redux";
import { SideBar } from "../../../components/Admin";
import { ICategory, IProduct } from "../../../types/products";
import { Link } from 'react-router-dom'
import { deleteProduct } from "../../../api/products";
import { postProducts } from "../../../redux/productSlice";


const DashboardPage = () => {
    const dispatch = useDispatch();

    const listProduct = useSelector((state: { product: { listProduct: IProduct[] } }) => state.product.listProduct);
    const listCategory = useSelector((state: { category: { listCategory: ICategory[] } }) => state.category.listCategory);

    const handleDelete = (id: number) => {
        confirm(`Are you sure you want to delete?`) ?
            deleteProduct(id).then(() => {
                dispatch(postProducts(listProduct.filter(product => product.id !== id)))
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
                                    Name
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    Category
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    Price
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    Description
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    Image
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    Acction
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {
                                listProduct.map((product, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                {product?.id}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                {product?.name}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                {(listCategory.find(i => i.id == product.categoryId))?.name || 'undefined'}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{product?.price}</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{product?.description}</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                <img style={{ height: 100, width: 200, objectFit: "cover" }} src={product?.image} alt="" />
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2">
                                                <Link to={'/admin/product/edit/' + product?.id} className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
                                                    Update
                                                </Link>
                                                <a onClick={() => handleDelete(product.id)} href="#" className="ml-2 inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
                                                    Delete
                                                </a>
                                            </td>
                                        </tr>

                                    )
                                })
                            }

                        </tbody>
                    </table>
                    <Link to={'/admin/product/add'} className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
                        Add New Product
                    </Link>
                </div>

            </div>
        </div >
    )
};

export default DashboardPage;
