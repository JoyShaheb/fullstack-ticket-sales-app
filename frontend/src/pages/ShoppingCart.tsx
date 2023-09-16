import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeOneItemFromCart } from "../store/Slices/basket";
import ItemCard from "../components/Card/ItemCard";
import { gradientTextStyles } from "../components/Text/TextStyles";

const ShoppingCart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const basketItems = useSelector((state) => state?.Basket?.basketItems);

    const removeItem = (id: string) => {
        dispatch(removeOneItemFromCart(id));
    };

    return (
        <div>
            <h1 className={`${gradientTextStyles} font-bold text-center text-2xl mb-3`}>
                Shopping Cart
            </h1>
            {basketItems?.length === 0 ? (
                <p className="text-center">Your Shopping Cart is Empty</p>
            ) : (
                <div>
                    {basketItems?.map((item: { _id: string; date: Date; image: string; location: string; title: string; }) => {
                        console.log("Item Data:", item);
                        return (
                            <div key={item._id}>
                                <ItemCard
                                    date={item.date}
                                    image={item.image}
                                    location={item.location}
                                    title={item.title}
                                />
                                <p>
                                    Total price: {/* ${item.price * item?.quantity} */}
                                </p>
                                <p>
                                    price * quantity {/* {item?.quantity} X ${item.price} */}
                                </p>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => removeItem(item?._id)}
                                >
                                    Remove
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
            <div className="p-4 flex justify-between space-x-4 mt-32">
                <button onClick={() => navigate(-1)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Back
                </button>
                <button onClick={() => navigate("/checkout")} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Checkout
                </button>
            </div>
        </div>
    );
}

export default ShoppingCart;
