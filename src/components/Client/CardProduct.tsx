import { Link } from "react-router-dom";
import { IProduct } from "../../types/products";

interface IProps {
    item: IProduct
}

const CardProduct: React.FC<IProps> = ({ item }) => {

    return (
        <Link to={`/product/${item.id}`} className="group block overflow-hidden">
            <img src={item?.image} alt="" className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]" />
            <div className="relative bg-white pt-3">
                <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                    Basic Tee
                </h3>
                <p className="mt-2">
                    <span className="sr-only"> Regular Price </span>
                    <span className="text-xl mb-2 font-bold">{item?.name}</span>
                    <span className="tracking-wider text-gray-900"> ${item?.price} </span>
                </p>
            </div>
        </Link>
    )
}

export default CardProduct;