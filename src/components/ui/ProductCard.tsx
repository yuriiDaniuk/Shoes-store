import { Heart, Star, ShoppingCart, MessageSquare } from 'lucide-react';
import type { IProduct } from "../../types/index";

interface ProductCardProps {
    product: IProduct;
}

export function ProductCard({ product }: ProductCardProps) {
    // Mock data for demonstration
    const oldPrice = (product.price * 1.3).toFixed(2);
    const discount = "-30%";

    return (
        // --- MAIN CARD CONTAINER ---
        <div className="flex flex-col h-full bg-white">

            {/* --- TOP SECTION: IMAGE & WISHLIST --- */}
            <div className="relative mb-3 overflow-hidden">
                
                {/* Wishlist Button (Heart) - Positioned absolutely to top-right */}
                <button className="absolute top-0 right-0 p-1 text-black transition-colors bg-white hover:cursor-pointer hover:text-white hover:bg-black">
                    <Heart strokeWidth={1} className="w-7 h-7" />
                </button>
                
                {/* Product Image */}
                <img
                    src={product.image}
                    alt={product.title}
                    className="object-contain w-full h-full p-0" 
                />
            </div>

            {/* --- BOTTOM SECTION: INFO & ACTIONS --- */}
            <div className="flex flex-col flex-grow px-2 pb-4">

                {/* Category / Brand Name */}
                <h4 className="mb-1 text-lg font-bold text-black capitalize">
                    {product.category}
                </h4>

                {/* Product Title (Clamped to 2 lines) */}
                <h3 className="h-10 mb-3 text-[20px] font-normal leading-snug text-gray-700 line-clamp-2">
                    {product.title}
                </h3>

                {/* --- RATING & REVIEWS SECTION --- */}
                <div className='flex items-center gap-4 mb-4 text-sm'>
                    {/* Star Rating */}
                    <div className="flex items-center gap-1 font-bold text-orange-500">
                        <Star className='w-4 h-4 text-orange-500 fill-orange-500'/>
                        <span>{product.rating.rate}</span>
                    </div>
                    {/* Review Count (Message Icon) */}
                    <div className="flex items-center gap-1 text-gray-500 cursor-pointer hover:text-gray-700">
                        <MessageSquare className="w-4 h-4" />
                        <span>{product.rating.count}</span>
                    </div>
                </div>

                {/* --- PRICE & BUY BUTTON ROW --- */}
                {/* 'items-stretch' makes the button height equal to the price block */}
                <div className='flex items-stretch items-end justify-between mt-auto'>
                    
                    {/* Left Side: Pricing Info */}
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            {/* Old Price (Strikethrough) */}
                            <span className="text-sm text-gray-400 line-through decoration-gray-400">
                                {oldPrice} $
                            </span>
                            {/* Discount Badge (Red) */}
                            <span className="bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-sm">
                                {discount}
                            </span>
                        </div>
                        {/* Current Main Price */}
                        <div className="text-2xl font-bold leading-none text-black">
                            {product.price} $
                        </div>
                    </div>

                    {/* Right Side: Buy Button (Lime Green) */}
                    {/* Negative margins (-mr-2 -mb-4) pull the button to the very corner */}
                    <button 
                        className="w-15 flex items-center justify-center bg-[#ccff00] hover:bg-[#d2fc18] hover:cursor-pointer transition-colors ml-2 -mr-2 -mb-4"
                        onClick={() => console.log('Buy:', product.id)}
                    >
                        <ShoppingCart className="w-6 h-6 text-black" strokeWidth={1} />
                    </button>
                    
                </div>
            </div>
        </div>
    );
}