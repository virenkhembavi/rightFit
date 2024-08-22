import React, { useContext } from 'react'
import CartContext from '../context/CartContext'

export default function Navbar() {
    const { data, setData } = useContext(CartContext)

    return (
        <div class="navbar-section">
            <div class="navbar-logo">
                RIGHTFIT.COM
            </div>
            <div class="navbar-links">
                <ul>
                    <li class="active">All Product</li>
                    <li>Featured Product</li>
                    <li onClick={() => {
                        setData((prev) => ({ ...prev, cartToggle: true }))
                    }}>
                        <img src='image/cart-24.png' alt='cart' />
                    </li>
                    <li>{data?.cart?.length}</li>
                </ul>
            </div>
        </div>
    )
}
