import React, { useContext, useEffect, useState } from 'react'
import CartContext from '../context/CartContext'

export default function Card({ product }) {
    const { data, setData } = useContext(CartContext)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(6)


    const handleCart = (product) => {
        const isProductInCart = data?.cart?.some((item) => item.id === product.id)
        if (!isProductInCart) {
            setData((prev) => ({
                ...prev,
                cartToggle: true,
                cart: [...prev?.cart, product],
            }))
        }
    }

    const handleRemove = (productId) => {
        setData((prev) => ({
            ...prev,
            cart: prev?.cart?.filter((item) => item.id !== productId),
        }))
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = product?.slice(indexOfFirstItem, indexOfLastItem)

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(product?.length / itemsPerPage); i++) {
        pageNumbers.push(i)
    }

    const removeCartItem = (id) => {
        const filterCart = data?.filter[id?.name].filter((item) => item?.value !== id?.value)
        setData((prev) => ({
            ...prev, filter: {
                ...prev.filter,
                [id.name]: filterCart
            }
        }))
    }

    useEffect(() => {
        if (data?.filter["color"]?.length > 0 || data?.filter["material"]?.length > 0) {
            setCurrentPage(1)
        }

    }, [data?.filter["color"], data?.filter["material"]])


    return (
        <section>
            <div className={data?.cartToggle ? "cart-sidebar-open" : "cart-sidebar-close"}>
                <div className="cart-header">
                    <h2>Shopping Cart</h2>
                    <button className="close-btn" onClick={() => setData((prev) => ({ ...prev, cartToggle: false }))}>×</button>
                </div>
                <div className="cart-content">
                    {
                        data?.cart?.map((item, index) => {
                            return (
                                <div class="product-cart" key={item?.id}>
                                    <img src="image/suit.jpg" alt="Autumn flower top" className="product-cart-image" />
                                    <div class="product-cart-details">
                                        <h2 class="product-cart-title">{item?.name}</h2>
                                        <p class="product-cart-subtitle">BLACK &nbsp;&nbsp; COTTON</p>
                                        <p class="product-cart-price">INR {item?.price}</p>
                                        <button class="remove-btn" onClick={() => handleRemove(item?.id)}>Remove &nbsp;&times;</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {
                data?.filter["color"]?.length > 0 &&
                data?.filter["color"]?.map((e, i) => {
                    return (
                        <div className='filter-chip' key={i}>
                            <span>{e?.value}</span>
                            <span className='filter-chip-remove' onClick={() => removeCartItem({ name: "color", value: e?.value })}>×</span>
                        </div>
                    )
                })
            }
            {
                data?.filter["material"]?.length > 0 &&
                data?.filter["material"]?.map((e, i) => {
                    return (
                        <div className='filter-chip' key={i}>
                            <span>{e?.value}</span>
                            <span className='filter-chip-remove' onClick={() => removeCartItem({ name: "material", value: e?.value })}>×</span>
                        </div>
                    )
                })
            }
            <div className='product-Section' id='product'>
                {
                    currentItems?.map((e, i) => {
                        console.log(e?.materialId)
                        return (
                            <div class="product-card" key={e?.id}>
                                <div class="product-image">
                                    <img src="image/suit.jpg" alt={e?.name} />
                                    <div class="add-to-cart" onClick={() => handleCart(e)}>{data?.cart?.some((item) => item.id === e?.id) ? "Already In Cart" : "Add to Cart"}</div>
                                </div>
                                <div class="product-info">
                                    <h3>{e?.name}</h3>
                                    <div className='product-description'>
                                        <span>
                                            Black
                                        </span>
                                        <span style={{ color: "#888" }}>Cotton</span>
                                    </div>
                                    <p>INR {e?.price}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="pagination">
                <ul>
                    {pageNumbers?.map((pageNumber) => (
                        <li key={pageNumber}>
                            <button onClick={() => handlePageChange(pageNumber)} disabled={currentPage === pageNumber ? true : false}>{pageNumber}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
