import Image from "next/image";
import Layout from "../../layouts/Main";
import { useSelector } from "react-redux";
import CheckoutStatus from "../../components/checkout-status";
import CheckoutItems from "../../components/checkout/items";
import { RootState } from "store";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const CheckoutPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const priceTotal = useSelector((state: RootState) => {
    const cartItems = state.cart.cartItems;
    let totalPrice = 0;
    if (cartItems.length > 0) {
      cartItems.map((item) => (totalPrice += item.price * item.count));
    }

    return totalPrice;
  });

  return (
    <Layout>
      <section className="cart">
        <div className="container">
          <div className="cart__intro">
            <h3 className="cart__title">Shipping and Payment</h3>
            <CheckoutStatus step="checkout" />
          </div>

          <div className="checkout-content">
            <div className="checkout__col-6">
              {!(session && session?.user) && (
                <div className="checkout__btns">
                  <button
                    className="btn btn--rounded btn--yellow"
                    onClick={() => router.push("/login")}
                  >
                    Log in
                  </button>
                  <button
                    className="btn btn--rounded btn--border"
                    onClick={() => router.push("/register")}
                  >
                    Sign up
                  </button>
                </div>
              )}

              <div className="block">
                <h3 className="block__title">Shipping information</h3>
                <form className="form">
                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="text"
                        placeholder="Email"
                      />
                    </div>

                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="text"
                        placeholder="Address"
                      />
                    </div>
                  </div>

                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="text"
                        placeholder="First name"
                      />
                    </div>

                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="text"
                        placeholder="City"
                      />
                    </div>
                  </div>

                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="text"
                        placeholder="Last name"
                      />
                    </div>

                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="text"
                        placeholder="Postal code / ZIP"
                      />
                    </div>
                  </div>

                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="text"
                        placeholder="Phone number"
                      />
                    </div>

                    <div className="form__col">
                      <div className="select-wrapper select-form">
                        <select>
                          <option>Country</option>
                          <option value="Argentina">Argentina</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="checkout__col-4">
              <div className="block">
                <h3 className="block__title">Payment method</h3>
                <ul className="round-options round-options--three">
                  <li className="round-item">
                    <Image
                      src="/images/logos/paypal.png"
                      alt="Paypal"
                      width={65}
                      height={16}
                    />
                  </li>
                  <li className="round-item">
                    <Image
                      src="/images/logos/visa.png"
                      alt="Paypal"
                      width={41}
                      height={13}
                    />
                  </li>
                  <li className="round-item">
                    <Image
                      src="/images/logos/mastercard.png"
                      alt="Paypal"
                      width={33}
                      height={25}
                    />
                  </li>
                  <li className="round-item">
                    <Image
                      src="/images/logos/maestro.png"
                      alt="Paypal"
                      width={30}
                      height={23}
                    />
                  </li>
                  <li className="round-item">
                    <Image
                      src="/images/logos/discover.png"
                      alt="Paypal"
                      width={53}
                      height={9}
                    />
                  </li>
                  <li className="round-item">
                    <Image
                      src="/images/logos/ideal-logo.svg"
                      alt="Paypal"
                      width={34}
                      height={30}
                    />
                  </li>
                </ul>
              </div>

              <div className="block">
                <h3 className="block__title">Delivery method</h3>
                <ul className="round-options round-options--two">
                  <li className="round-item round-item--bg">
                    <Image
                      src="/images/logos/inpost.svg"
                      alt="Paypal"
                      width={42}
                      height={25}
                    />
                    <p>$20.00</p>
                  </li>
                  <li className="round-item round-item--bg">
                    <Image
                      src="/images/logos/dpd.svg"
                      alt="Paypal"
                      width={35}
                      height={16}
                    />
                    <p>$12.00</p>
                  </li>
                  <li className="round-item round-item--bg">
                    <Image
                      src="/images/logos/dhl.svg"
                      alt="Paypal"
                      width={43}
                      height={10}
                    />
                    <p>$15.00</p>
                  </li>
                  <li className="round-item round-item--bg">
                    <Image
                      src="/images/logos/maestro.png"
                      alt="Paypal"
                      width={30}
                      height={23}
                    />
                    <p>$10.00</p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="checkout__col-2">
              <div className="block">
                <h3 className="block__title">Your cart</h3>
                <CheckoutItems />

                <div className="checkout-total">
                  <p>Total cost</p>
                  <h3>${priceTotal}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="cart-actions cart-actions--checkout">
            <Link href="/cart" className="cart__btn-back">
              <i className="icon-left"></i> Back
            </Link>
            <div className="cart-actions__items-wrapper">
              <button type="button" className="btn btn--rounded btn--border" onClick={() => router.push('/products')}>
                Continue shopping
              </button>
              <button type="button" className="btn btn--rounded btn--yellow">
                Proceed to payment
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CheckoutPage;
