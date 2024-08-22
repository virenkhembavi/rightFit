import React, { useContext } from 'react'
import CartContext from '../context/CartContext'

export default function SideBar({ filterData }) {
    const { data, setData } = useContext(CartContext)

    const handleChange = (evt) => {
        const { value, checked, name, id, alt } = evt.target;
        let checkValue = data?.filter[name]?.some((item) => item?.value === value);

        if (checked) {
            if (!checkValue) {
                setData((prevData) => ({
                    ...prevData,
                    filter: {
                        ...prevData.filter,
                        [name]: [...prevData.filter[name], name === "color" ? { value: value, id: alt } : name === "material" ? { value: value, id: id } : { value: value, id: id }],
                    },
                }));
            }
        } else {
            setData((prevData) => ({
                ...prevData,
                filter: {
                    ...prevData.filter,
                    [name]: prevData.filter[name].filter((item) => item.value !== value),
                },
            }));

            evt.target.checked = false;
        }
    };

    return (
        <div className='sideBar-Section'>
            <h2>Filter</h2>
            <div className='Material-section'>
                <span>Material</span>
                <ul>
                    {
                        filterData?.material?.map((e, i) => {
                            return (
                                <li key={e?.id}>
                                    <input type="checkbox"
                                        id={e?.id}
                                        name="material"
                                        value={e?.name}
                                        checked={
                                            data?.filter["material"]?.some((item) => item?.value === e?.name)
                                        }
                                        onChange={handleChange}
                                    />
                                    <label htmlFor={e?.id}>{e?.name}</label>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className='Color-section'>
                <span>Color</span>
                <ul>
                    {
                        filterData?.color?.map((e, i) => {
                            return (
                                <li key={e?.id}>
                                    <input
                                        type="checkbox"
                                        id={e?.name}
                                        name="color"
                                        value={e?.name}
                                        alt={e?.id}
                                        checked={
                                            data?.filter["color"]?.some((item) => item?.value === e?.name)
                                        }
                                        onChange={handleChange} />
                                    <label htmlFor={e?.name}>{e?.name}</label>
                                </li>
                            )
                        })
                    }

                </ul>
            </div>
        </div>
    )
}
