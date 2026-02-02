import { ShoppingCart, ShoppingBag } from 'lucide-react';
import { useAppSelector } from '../../store/hooks'; 
import { Link } from 'react-router-dom';

export function NavBar(){

    const { items } = useAppSelector((state) => state.cart);

    const totalCountOfItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return(
        // --- MAIN CONTAINER ---
        <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
            
            {/* --- INNER WRAPPER --- */}
            <div className='flex items-center justify-between px-4 py-3 mx-auto max-w-7xl'>

                {/* --- LEFT SIDE: LOGO --- */}
                <Link to="/">
                    <div className='flex items-center gap-1'>
                        <button className='flex items-center gap-2 hover:cursor-pointer group'>
                            <ShoppingBag className='text-blue-500 transition-colors duration-300 w-9 h-9 group-hover:text-blue-600'/>
                            <span className='text-xl font-bold tracking-tight text-blue-500 uppercase transition-colors duration-300 group-hover:text-blue-600'>
                                React Store
                            </span>
                        </button>
                    </div>
                </Link>

                {/* --- RIGHT SIDE: CART --- */}
                <Link to="/cart">
                    <div className='relative flex items-center justify-center group'>
                        <ShoppingCart 
                            strokeWidth='1.5' 
                            className='text-gray-700 transition-colors duration-300 cursor-pointer w-7 h-7 group-hover:text-black'
                        />
                        
                        {totalCountOfItems > 0 && (
                            <span className='absolute -top-1.5 -right-1.5 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white'>
                                {totalCountOfItems}
                            </span>
                        )}
                    </div>
                </Link>

            </div>
        </nav>
    )
}