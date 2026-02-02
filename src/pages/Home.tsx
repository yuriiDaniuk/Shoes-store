import { useEffect } from "react";
import axios from "axios";
import { ProductCard } from "../components/ui/ProductCard";
import type { IProduct } from "../types/index";

export function Home(){

    const testProduct: IProduct = {
        id: 1,
        title: "Nike air force 1",
        price: 99.99,
        description: "A classic sneaker for walkers and runners.",
        category: "shoes",
        image: "https://deltasport.ua/storage/product/size_976/9120/IM6029-084-639833.jpg",
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
    <div className="flex flex-col items-center justify-center w-full mt-10 text-3xl font-bold">
    
        <ProductCard product={testProduct}></ProductCard>

    </div>
    );
}