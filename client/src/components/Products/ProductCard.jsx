import React, { useEffect } from "react";
import Button from "../Shared/Button";
import { useRecoilState } from "recoil";
import { cartIncrease, cartItem } from "../../store/atoms";
import { useState } from "react";
import axios from "axios";

const ProductCard = () => {
  const [increase, setIncrease] = useRecoilState(cartIncrease);
  const [cartItemList, setCartItemList] = useRecoilState(cartItem);
  const [data, setData] = useState([]);
  async function fetchItems() {
    try {
      let res = await axios.get("http://localhost:3000/allItems", {
        withCredentials: true,
      });
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    try {
      fetchItems();
    } catch (error) {}
  }, []);
  async function createCart(data) {
    let res = cartItemList.includes(data);
    console.log(data._id);
    console.log(cartItemList);
    console.log(res);
    if (res) {
      alert("item has already been added to the cart");
      return;
    }
    setIncrease(increase + 1);
    let newData = data;
    newData.quantity = 1;
    console.log(newData);
    setCartItemList([...cartItemList, newData]);
  }
  return (
    <div className="mb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 place-items-center">
        {/* card section */}
        {data?.map((data) => (
          <div
            data-aos="fade-up"
            data-aos-delay={data.aosDelay}
            className="group"
            key={data.id}
          >
            <div className="relative">
              <img
                src={`http://localhost:3000/${data.image}`}
                alt=""
                className="h-[180px] w-[260px] object-cover rounded-md"
              />
              {/* hover button */}
              <div className="hidden group-hover:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-full w-full text-center group-hover:backdrop-blur-sm justify-center items-center duration-200 rounded-md">
                <Button
                  handler={() => {
                    createCart(data);
                  }}
                  text={"Add to cart"}
                  bgColor={"bg-primary"}
                  textColor={"text-white"}
                />
              </div>
            </div>
            <div className="leading-7">
              <h2 className="font-semibold">{data.title}</h2>
              <h2 className="font-bold">${data.price}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
