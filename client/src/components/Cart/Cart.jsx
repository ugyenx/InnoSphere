import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { cartIncrease, cartItem } from "../../store/atoms";
import axios from "axios";
function Cart() {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);

  const [cartItemList, setCartItemList] = useRecoilState(cartItem);
  const [cartItemsCount, setCartItemsCount] = useRecoilState(cartIncrease);
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  useEffect(() => {
    console.log(cartItemList);
    const total = cartItemList.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    setTotal(total);
    async function initialize() {
      const isScriptLoaded = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!isScriptLoaded) {
        alert("Razorpay SDK failed to load. Are you online?");
      }
    }
    initialize();
  }, [cartItemList]);

  const handleBuy = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/payments/createOrder",
        { orderItems: cartItemList },
        {
          withCredentials: true,
        }
      );
      const data = res.data;

      const paymentObject = new window.Razorpay({
        key: "rzp_test_qPQzy0vRy1shuh",
        order_id: data.id,
        ...data,
        handler: function (response) {
          console.log(response);
          const option2 = {
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            orderItems: cartItemList,
          };
          axios
            .post("http://localhost:3000/payments/verifyPayment", option2, {
              withCredentials: true,
            })
            .then((res) => {
              console.log(res.data);
              if (res.data.success) {
                alert("purchase success");
                setCartItemList([]);
                setTotal(0);
                cartItemsCount(0);
              } else {
                alert("purchase failed");
              }
            });
        },
      });
      paymentObject.open();
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  const handleInc = (id) => {
    const updatedCart = cartItemList.map((item) => {
      if (item._id == id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });

    setCartItemList(updatedCart);

    navigate("/cart");
  };

  const handleDec = (id) => {
    console.log(id);
    const updatedCart = cartItemList.map((item) => {
      if (item._id === id) {
        const newQuantity = Math.max(1, item.quantity - 1);
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });
    setCartItemList(updatedCart);

    navigate("/cart");
  };

  const removeProduct = (id) => {
    const updatedCart = cartItemList.filter((item) => item._id !== id);
    setCartItemsCount((e) => e - 1);
    setCartItemList(updatedCart);
    navigate("/cart");
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="w-3/4shadow-md my-10 flex-wrap">
        <div className=" bg-white px-10 py-1">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl"> Items</h2>
            <h2
              className="font-semibold text-2xl bg-gray-400 p-2 rounded-2xl hover:cursor-pointer"
              onClick={() => navigate("/viewOrders")}
            >
              View your orders
            </h2>
          </div>
          <div className="flex flex-wrap mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
              Product Details
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Quantity
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Price
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Total
            </h3>
          </div>
          {cartItemList?.map((cart) => {
            return (
              <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                <div className="flex w-2/5">
                  <div className="w-20">
                    <img
                      className=" rounded-xl"
                      src={`http://localhost:3000/${cart?.image}`}
                      alt={cart?.name}
                    />
                  </div>
                  <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm">{cart?.name}</span>

                    <div
                      className="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer"
                      onClick={() => removeProduct(cart?._id)}
                    >
                      Remove
                    </div>
                  </div>
                </div>
                <div className="flex justify-center w-1/5">
                  <svg
                    className="fill-current text-gray-600 w-3 cursor-pointer"
                    viewBox="0 0 448 512"
                    onClick={() => handleDec(cart?._id)}
                  >
                    <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg>

                  <input
                    className="mx-2 border text-center w-8"
                    type="text"
                    value={cart.quantity}
                  />

                  <svg
                    className="fill-current text-gray-600 w-3 cursor-pointer"
                    onClick={() => handleInc(cart?._id)}
                    viewBox="0 0 448 512"
                  >
                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg>
                </div>
                <span className="text-center w-1/5 font-semibold text-sm">
                  ${cart?.price}
                </span>
                <span className="text-center w-1/5 font-semibold text-sm">
                  ${(cart?.price * cart?.quantity).toFixed(2)}
                </span>
              </div>
            );
          })}

          <Link
            to={"/"}
            className="flex font-semibold text-gray-900 text-sm mt-10"
          >
            <svg
              className="fill-current mr-2 text-gray-900 w-4"
              viewBox="0 0 448 512"
            >
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Continue Shopping
          </Link>
        </div>

        <div id="summary" className="w-2/4 px-8 py-10 container">
          <h1 className="font-semibold text-2xl border-b pb-8">
            Order Summary
          </h1>
          <div className="flex flex-wrap justify-between mt-10">
            <span className="font-semibold text-sm uppercase">
              Items {cartItemList?.length}
            </span>
          </div>

          <div className="border-t mt-8 w-full">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>$ {total.toFixed(2)}</span>
            </div>
            <Link
              onClick={() => handleBuy()}
              className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 p-2 text-sm text-white rounded-xl uppercase w-full"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
