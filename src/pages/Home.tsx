import { useEffect, useState } from "react";
import axios from "axios";
import { ProductCard } from "../components/ui/ProductCard";
import type { IProduct } from "../types/index";

export function Home(){

    const [ products, setProduct ] = useState<IProduct[]>([]);

    const [ loading, setLoading ] = useState<boolean>(true);

    useEffect(() => {

        async function fetchProducts() {
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
                
                setProduct(response.data);
                setLoading(false);
            }
            catch (error){
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        
        fetchProducts();

    }, []);

    if(loading){
        return(
            <div className="flex items-center justify-center text-2xl text-gray-700 ">Loading ...</div>
        )
    }

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                {products.map((product) => (
                    <ProductCard 
                        key={product.id} 
                        product={product} 
                    />
                ))}

            </div>
        </div>
    );
}