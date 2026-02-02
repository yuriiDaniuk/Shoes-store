import { useAppSelector } from '../store/hooks';
import { TrashIcon, Minus, Plus } from 'lucide-react';

export function CartPage() {

    const { items, totalPrice } = useAppSelector((state) => state.cart);

    if (items.length === 0){
        return(
            <div className='flex items-center justify-center mt-5'>
                <h1 className='text-2xl text-gray-700 font-bold'>Your cart is empty</h1>
            </div>
        )
    }

    return (
        <div className='max-w-7xl mx-auto px-4 py-6'>
            <h1 className="text-3xl font-bold text-gray-700">Cart Page</h1>

            <div className='flex flex-col gap-6 py-3'>
                {items.map(item => (
                    <div key={item.id} className='flex items-start pb-6 border-b border-gray-200 last:border-0 max-w-2xl'>

                        <div className='shrink-0 overflow-hidden'> 
                            <img 
                                src={item.image}
                                alt={item.title}
                                className='h-32 w-32 object-contain pb-4 pr-4'
                            />
                        </div>

                        <div className='flex flex-col flex-1'>
                            <span className=' text-gray-700 text-xl pl-1'>{item.title}</span>
                            <span className=' text-gray-500 text-lg pl-1'>{item.description}</span>

                            <div className='flex items-center justify-baseline gap-1 group py-2'>
                                <button className='flex group-hover:cursor-pointer'>
                                    <TrashIcon className='h-5 w-5 text-gray-300'/>
                                    <div className='text-gray-300'>delete</div>
                                </button>
                            </div>

                            <div className='flex items-center justify-between w-full mt-2'>
                                <div className='h-10 w-24 bg-gray-100 ml-0 flex items-center justify-center'>
                                    <button className='px-1 py-1 cursor-pointer'>
                                        <Minus className=' text-gray-500 w-6 h-6'/>
                                    </button>
                                    <span className='px-2 py-1 text-gray-500 text-lg'>{item.quantity}</span>
                                    <button className='px-1 py-1 cursor-pointer'>
                                        <Plus className=' text-gray-500 w-6 h-6'/>
                                    </button>
                                </div>

                                <div>
                                    <span className=' text-black text-[1.5rem]'>{(item.price * item.quantity).toFixed(2)} $</span>
                                </div>
                            </div>

                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}