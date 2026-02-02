import { useAppDispatch, useAppSelector } from '../store/hooks';
import { TrashIcon, Minus, Plus } from 'lucide-react';
import { changeQuantity, deleteFromCart } from '../store/slices/cartSlice';

// --- TYPES ---
interface ChangeQuantityPayload {
    id: number;
    type: 'increase' | 'decrease';
}

export function CartPage() {

    // --- REDUX STATE & HOOKS ---
    const { items, totalPrice } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();

    // --- CALCULATIONS ---
    const totalCountOfItems = items.reduce((sum, item) => sum + item.quantity, 0);

    // --- ACTION HANDLERS ---
    const handleChangeQuantity = (payload: ChangeQuantityPayload) => {
        dispatch(changeQuantity(payload));
    }

    const handleDeleteFromCart = (id: number) => {
        dispatch(deleteFromCart(id));
    }

    // --- RENDER: EMPTY STATE ---
    if (items.length === 0){
        return(
            <div className='flex items-center justify-center mt-5'>
                <h1 className='text-2xl text-gray-700 font-bold'>Your cart is empty</h1>
            </div>
        )
    }

    // --- RENDER: MAIN CONTENT ---
    return (
        <div className='max-w-7xl mx-auto px-4 py-6'>
            
            {/* --- PAGE HEADER --- */}
            <div className='flex items-center justify-baseline gap-2'>
                <h1 className="text-3xl font-bold text-gray-700">Your cart </h1>
                <h1 className="text-3xl font-bold text-gray-500">/ {totalCountOfItems} items</h1>
            </div>      

            {/* --- CONTENT WRAPPER (2 Columns) --- */}
            <div className='flex items-start w-full gap-5'>

                {/* --- LEFT COLUMN: ITEMS LIST --- */}
                <div className='flex flex-col gap-6 py-3'>
                    {items.map(item => (
                        
                        // --- INDIVIDUAL PRODUCT CARD ---
                        <div key={item.id} className='flex items-start pb-6 border-b border-gray-200 last:border-0 max-w-2xl'>

                            {/* Product Image */}
                            <div className='shrink-0 overflow-hidden'> 
                                <img 
                                    src={item.image}
                                    alt={item.title}
                                    className='h-32 w-32 object-contain pb-4 pr-4'
                                />
                            </div>

                            {/* Product Details Column */}
                            <div className='flex flex-col flex-1'>
                                {/* Title & Description */}
                                <span className=' text-gray-700 text-xl pl-1'>{item.title}</span>
                                <span className=' text-gray-500 text-lg pl-1'>{item.description}</span>

                                {/* Remove Button */}
                                <div className='flex items-center justify-baseline gap-1 group py-2'>
                                    <button 
                                        className='flex group-hover:cursor-pointer'
                                        onClick={() => handleDeleteFromCart(item.id)}
                                    >
                                        <TrashIcon className='h-5 w-5 text-gray-300'/>
                                        <div className='text-gray-300'>delete</div>
                                    </button>
                                </div>

                                {/* Controls Row: Quantity & Price */}
                                <div className='flex items-center justify-between w-full mt-2'>
                                    
                                    {/* Quantity Buttons */}
                                    <div className='h-10 w-24 bg-gray-100 ml-0 flex items-center justify-center'>
                                        <button 
                                            className='px-1 py-1 cursor-pointer'
                                            onClick={() => handleChangeQuantity({id: item.id, type: 'decrease'})}
                                        >
                                            <Minus className=' text-gray-500 w-6 h-6'/>
                                        </button>
                                        <span className='px-2 py-1 text-gray-500 text-lg'>{item.quantity}</span>
                                        <button 
                                            className='px-1 py-1 cursor-pointer'
                                            onClick={() => handleChangeQuantity({id: item.id, type: 'increase'})}
                                        >
                                            <Plus className=' text-gray-500 w-6 h-6'/>
                                        </button>
                                    </div>

                                    {/* Item Total Price */}
                                    <div>
                                        <span className=' text-black text-[1.5rem]'>{(item.price * item.quantity).toFixed(2)} $</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

                {/* --- RIGHT COLUMN: ORDER SUMMARY (STICKY) --- */}
                <div className='flex flex-col items-center justify-center w-[40%] border border-gray-200 p-4 mt-6 sticky top-24 h-fit'>
                    <div className='flex items-center justify-between w-full'>
                        <span className='text-2xl font-bold text-gray-700'>Total Price &bull; {totalCountOfItems}</span>
                        <div className='text-3xl font-bold text-black mt-2'>{totalPrice.toFixed(2)} $</div>
                    </div>

                    <button className='w-full'>
                        <div className='mt-6 w-full bg-[#CCFF00] hover:bg-[#b3e600] text-black text-center py-3 text-lg cursor-pointer'>
                            Proceed to Checkout
                        </div>
                    </button>
                </div>

            </div>
        </div>
    )
}