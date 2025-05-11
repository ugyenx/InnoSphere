import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

export default function ProductsPage() {
   
    const { register, handleSubmit, reset } = useForm();
    const [products,setProducts]=useState([])
    async function fetchProducts() {
        try {
            let res= await axios.get("http://localhost:3000/allItems")
            setProducts(res.data)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
      fetchProducts()
    
      return () => {
        
      }
    }, [])
    
  
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("price", data.price);
        formData.append("image", data.image[0]);
      
        try {
            // 2. Send to backend using axios
            const res = await axios.post("http://localhost:3000/addItem", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
        
            console.log("Server response:", res.data.msg);
          } catch (err) {
            console.error("Error uploading data:", err);
          }
        
          // 3. Reset the form
          reset();
    };
  
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Products</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: true })}
            className="block"
          />
          <input
            type="text"
            placeholder="Product Name"
            {...register("name", { required: true })}
            className="block w-full p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Price"
            {...register("price", { required: true })}
            className="block w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Product
          </button>
        </form>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products?.map((product, index) => (
            <div key={index} className="border p-4 rounded shadow">
              {product.image && (
                <img src={`http://localhost:3000/${product.image}`} alt={product.name} className="h-40 w-full object-cover mb-2 rounded" />
              )}
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-700">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }