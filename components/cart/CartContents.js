import { motion } from 'framer-motion';
import React from 'react'
import { AppProvider } from '../../context/AppContext'
import garbageBin from '../../assets/garbage-bin.svg';
import Dropdown from '../dropdown/Dropdown';
const qtys = [1,2,3,4,5,6,7,8]
const sizes = [
    5.5, 6, 6.5, 7, 7.5, 
    8, 8.5, 9, 9.5, 10, 
    10.5, 11, 11.5, 12,
    12.5, 13, 13.5, 14, 14.5
]
function CartContents() {
    const {state, dispatch} = React.useContext(AppProvider)
    const windowObject = typeof window != 'undefined' && window
    return (
        <div className='open-cart-layout'>
            <div className='cart-contents'>
                {state.cart.map(({product, quantity, selectedSize}, i) => {
                    const {brand, category, description, 
                    image, price, rating, title, _id, shoeSizes} = product
                    console.log(quantity,selectedSize)
                    return(
                        <motion.div 
                        className='cart-item'
                        key={`cart-item-${i}`}>
                            <div className='left'>
                                <motion.div 
                                animate={windowObject.innerWidth < 500 && {scale: 0, width: 0, height: 0}} 
                                className='image'>
                                    <motion.img src={image[0]} />
                                </motion.div>
                                <div className='info'>
                                    <div>
                                        <p className='uppercased'>{title}</p>
                                        <p>Brand: {brand}</p>
                                    </div>
                                    <motion.div animate={{x:-4}} className='cart-options'>
                                        <span>QTY:</span>
                                        <Dropdown type={'quantity'} iD={_id} number={quantity} numbers={qtys} />
                                        <span>SIZE: </span>
                                        <Dropdown type={'size'} iD={_id} number={selectedSize} numbers={sizes} />
                                    </motion.div>
                                </div>
                            </div>
                            <div className='right'>
                                <div className='top'>
                                    <span>${price/100}</span>
                                </div>
                                <div className='bottom'>
                                    <div>
                                        <motion.img whileTap={{scale: 0.9}} src={garbageBin.src} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
            <div className='cart-bottom'>
                <div className='subtotal'>

                </div>
                <div className='cart-buttons'>

                </div>
            </div>
        </div>
    )
}

export default CartContents
