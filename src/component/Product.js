import React, { useContext, useEffect, useMemo, useState, useTransition } from 'react'
import { fetchProduct, fetchProductFilterColor, fetchProductFilterMaterial } from '../api'
import SideBar from './SideBar'
import Card from './Card'
import CartContext from '../context/CartContext'
import { GridLoader } from 'react-spinners'

export default function Product() {
    const { data } = useContext(CartContext)
    const [isPending, startTransition] = useTransition()
    const [cardData, setCardData] = useState([])
    const [filterData, setFilterData] = useState({
        color: [],
        material: []
    })

    useEffect(() => {
        fetchProduct()
            .then(data => startTransition(() => {
                setCardData(data?.data?.products)
            })).catch(error => console.log(error))

    }, [])

    useEffect(() => {
        fetchProductFilterColor()
            .then(data => startTransition(() => {
                setFilterData((prev) => ({ ...prev, color: data?.data?.colors }))
            })).catch(error => console.log(error))
    }, [])

    useEffect(() => {
        fetchProductFilterMaterial()
            .then(data => startTransition(() => {
                setFilterData((prev) => ({ ...prev, material: data?.data?.material }))
            })).catch(error => console.log(error))

    }, [])

    const filterCardData = useMemo(() => {
        if (
            data?.filter["color"]?.length < 0 && data?.filter["material"]?.length < 0
        ) {
            return cardData
        }
        if (data?.filter["color"]?.length > 0
            && data?.filter["material"]?.length > 0) {
            return cardData?.filter((item) => data?.filter["color"]?.map(e => +e?.id)?.includes(item?.colorId)) && cardData?.filter((item) => data?.filter["material"]?.map(e => +e?.id)?.includes(item?.materialId))
        }
        if (data?.filter["color"]?.length > 0) {
            return cardData?.filter((item) => data?.filter["color"]?.map(e => +e?.id)?.includes(item?.colorId))
        }
        if (data?.filter["material"]?.length > 0) {
            return cardData?.filter((item) => data?.filter["material"]?.map(e => +e?.id)?.includes(item?.materialId))
        }
        return cardData

    }, [cardData, data?.filter["color"], data?.filter["material"]])


    return (
        <div className='Product-section'>
            <SideBar product={filterCardData} filterData={filterData} />
            {
                isPending ?
                    <div className='loader'>
                        <GridLoader />
                    </div>
                    :
                    <Card product={filterCardData} />
            }
        </div>
    )
}
