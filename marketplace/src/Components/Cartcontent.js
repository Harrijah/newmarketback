import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setitemquantity } from "../action/session.action";

const Cartcontent = ({ quantity, id, index }) => {
    const [tempquantity, setTempquantity] = useState(quantity);
    const dispatch = useDispatch();
    function updatequantity(qtty) {
        const data = {
            id,
            quantity: qtty,
            index,
        }
        // console.log(data);
        dispatch(setitemquantity(data));
    }
    useEffect(() => {      
        updatequantity(tempquantity);
    }, [tempquantity])
    return (
        <td style={{display: 'flex'}}>
            <button onClick={() => setTempquantity((tempquantity > 1) && tempquantity - 1)} >-</button>
            <input className="addoncart" type="number" style={{textAlign: 'right'}} value={tempquantity} min={1} readOnly />
            <button onClick={() =>  setTempquantity(tempquantity + 1)} >+</button>
        </td>
    )
}

export default Cartcontent;
