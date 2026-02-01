import { useEffect, useState } from "react";
import axios from "axios";
import { ProductCard } from "../components/ui/ProductCard";
import type { IProduct } from "../types/index";

export function Home(){

    const testProduct: IProduct = {
        id: 1,
        title: "Nike air force 1",
        price: 99.99,
        description: "A classic sneaker",
        category: "shoes",
        image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTljCwHj83JbTNRDKF7hEJ77tDwyugNptn0CaH0vUS-GuN8x3EiDUVRn7QJ4iqZR7yQtPnMTRRuJXkldZ4e15MJxi6GULfBv_iSZJrC5ydcaHo9Mu1arKR4mqH9L5KhAQ&usqp=CAc",
        rating: {
            rate: 4.5,
            count: 120
        }
    } 

    useEffect(() => {

        async function fetchProducts() {
            try {
                console.log("Fetching data...");
                const response = await axios.get('https://fakestoreapi.com/products');
                console.log("Data fetched:", response.data);
            }
            catch (error){
                console.error("Error fetching data:", error);
            }
        };
        
        fetchProducts();

    }, []);

    return (
    <div className="flex flex-col justify-center items-center w-full mt-10 text-3xl font-bold">
    
        <ProductCard product={testProduct}></ProductCard>

    </div>
    );
}