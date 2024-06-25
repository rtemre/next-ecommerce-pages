import { useSelector } from "react-redux";
import Image from "next/image";

const CheckoutItems = () => {
  const { cartItems } = useSelector((state: any) => state.cart);

  return (
    <ul className="checkout-items">
      {cartItems.map((item: any) => (
        <li key={item.id} className="checkout-item">
          <div className="checkout-item__content">
            <div className="checkout-item__img">
              <Image src={item.thumb} alt="" fill />
            </div>

            <div className="checkout-item__data">
              <h3>{item.name}</h3>
              <span>#{item.id}</span>
            </div>
          </div>
          <h3>${item.price}</h3>
        </li>
      ))}
    </ul>
  );
};

export default CheckoutItems;
