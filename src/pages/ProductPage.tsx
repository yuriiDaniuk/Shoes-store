import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import type { IProduct } from "../types/index";
import { useAppDispatch } from "../store/hooks";
import { addToCart } from "../store/slices/cartSlice"; 
import { ArrowLeft, MessageSquare, Star } from "lucide-react";
import toast from "react-hot-toast";

export function ProductPage(){
    // --- HOOKS & STATE ---
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [product, setProduct] = useState<IProduct | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // --- HANDLERS ---
    const handleAddToCart = () => {
        if(product){
            dispatch(addToCart(product)); 

            toast.success(`${product.title} added to cart!`, {
            id: 'add-to-cart-success',
            duration: 2000,
            position: 'top-center',
            style: {
                background: '#b3e600',
                color: 'black',
            },
            iconTheme:{
                primary: 'black',
                secondary: 'white',
            },
            });
        }
    };

    // --- DATA FETCHING ---
    useEffect(() => {
        async function fetchProduct() {
            try {       
                const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
                setProduct(response.data);
                setLoading(false);
            }
            catch (error){
                console.error("Error fetching product data:", error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    // --- LOADING STATE UI ---
    if(loading){
        return(
            <div className="flex items-center justify-center text-2xl text-gray-700 mt-20">Loading ...</div>
        )
    }

    // --- ERROR / NOT FOUND UI ---
    if(!product){  
        return(
            <div className="flex items-center justify-center text-2xl text-gray-700 mt-20">Product not found</div>
        )
    }

    // --- MAIN RENDER ---
    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            
            {/* --- NAVIGATION HEADER --- */}
            <div>
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-black transition mb-8"
                >
                    <ArrowLeft size={20}/>
                    Back to shopping
                </button>
            </div>

            {/* --- PRODUCT CONTENT WRAPPER --- */}
            <div className="flex flex-col md:flex-row gap-8">
                
                {/* --- LEFT COLUMN: PRODUCT IMAGE --- */}
                <div className="shrink-0 w-full md:w-1/2">
                    <img 
                        src={product.image} 
                        alt={product.title} 
                        // Fixed height (h-110 matches right column)
                        className="object-contain w-full h-110 p-4 border border-gray-200 bg-white"
                    />
                </div>

                {/* --- RIGHT COLUMN: PRODUCT DETAILS --- */}
                {/* md:h-110 fixes height to match image on desktop */}
                <div className="flex flex-col w-full md:w-1/2 md:h-110">
                    
                    {/* --- SCROLLABLE CONTENT AREA --- */}
                    {/* flex-1 allows this area to grow/shrink, overflow-y-auto enables scrolling */}
                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        <h2 className="text-3xl font-bold mb-4 text-gray-800">{product.title}</h2>
                        <p className="text-2xl text-gray-600 mb-6">${product.price.toFixed(2)}</p>
                        
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            {product.description}
                        </p>
                        
                        <p className="text-sm text-gray-500 mb-6 capitalize">Category: {product.category}</p>

                        {/* Rating & Reviews */}
                        <div className='flex items-center gap-4 mb-4 text-sm'>
                            <div className="flex items-center gap-1 font-bold text-orange-500">
                                <Star className='w-4 h-4 text-orange-500 fill-orange-500'/>
                                <span>{product.rating.rate}</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-500 cursor-pointer hover:text-gray-700">
                                <MessageSquare className="w-4 h-4" />
                                <span>{product.rating.count}</span>
                            </div>
                        </div>
                    </div>

                    {/* --- BOTTOM ACTION AREA (STICKY BUTTON) --- */}
                    {/* mt-auto pushes this block to the bottom */}
                    <div className="mt-auto pt-4 bg-white"> 
                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-[#CCFF00] hover:bg-[#b3e600] text-black text-center py-3 text-lg cursor-pointer transition-colors"
                        >
                            Add to Cart
                        </button>
                    </div>

                </div>
            </div>  
        </div>
    );
}