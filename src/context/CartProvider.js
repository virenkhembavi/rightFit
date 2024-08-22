import React, { useState } from 'react'
import CartContext from './CartContext'

export default function CartProvider({ children }) {
    const [data, setData] = useState({
        cart: [],
        total: 0,
        filter: {
            color: [],
            material: []
        },
        cartToggle: false
    })
    return (
        <CartContext.Provider value={{ data, setData }}>
            {children}
        </CartContext.Provider>
    )
}
