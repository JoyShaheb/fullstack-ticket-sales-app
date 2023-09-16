import { useState } from "react";
import InputField from "../components/Form/InputField";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { usePurchaseTicketMutation } from "../store/API/SalesApi";
import { toast } from "react-toastify";
import { resetCart } from "../store/Slices/basket";
import ItemCard from "../components/Card/ItemCard";
import { RootState } from "../store";

const Checkout = () => {
  const dispatch = useDispatch();
  const [purchaseTicket] = usePurchaseTicketMutation();

  const customerID: string = useSelector((state: RootState) => state.user.id);
  console.log("user state:", customerID);

  const basket = useSelector((state: RootState) => state?.Basket?.basketItems);
  console.log("basket", basket);

  const modifyBasket = basket.map((item) => {
    return {
      eventID: item.id,
      quantity: item.quantity,
      customerID,
      status: "completed",
    };
  });
  console.log(modifyBasket);
  const [data, setData] = useState({
    name: "",
    cardNo: "",
    pin: "",
    expires: "",
  });

  const navigate = useNavigate();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSales = async () => {
    // Check if any of the fields are empty
    if (!data.name || !data.cardNo || !data.expires || !data.pin) {
      toast.error("Please fill in all the fields before proceeding.");
      return;
    }

    try {
      await purchaseTicket(modifyBasket).then(() => {
        dispatch(resetCart());
        navigate("/");
      });
    } catch (err) {
      toast.error("error ocured");
      console.log(err);
    }
  };

  return (
    <div>
      <h2 >Checkout</h2>
      <div>
        <ItemCard {...data} />
        <div className="">
          <div >
            <InputField
              type="text"
              name="name"
              value={data.name}
              onChange={handleInput}
              label="Full Name"
              placeholder="Enter Your name here..."
              required={true}
            />
            <InputField
              type="text"
              name="cardNo"
              value={data.cardNo}
              onChange={handleInput}
              label="Card No."
              placeholder="234343434646"
              required={true}
            />
            <InputField
              type="date"
              name="expires"
              value={data.expires}
              onChange={handleInput}
              label="Expires"
              placeholder="Enter your expireing date"
              required={true}
            />
            <InputField
              type="pin"
              name="pin"
              value={data.pin}
              onChange={handleInput}
              label="PIN"
              placeholder="Enter your pin"
              required={true}
            />
          </div>
        </div>
      </div>
      <div className="checkout-bottom-section">
        <button onClick={() => navigate(-1)} className="back-bottom-btn">
          Back
        </button>
        <button onClick={handleSales} className="checkout-bottom-btn">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Checkout;
