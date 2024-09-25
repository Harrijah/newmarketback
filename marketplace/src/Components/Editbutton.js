import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../action/createaccount.action';

export default function Editbutton({  userinfos, champs, i, submitedit }) {
    
    const [isUpdating, setIsUpdating] = useState(false);

    function editinfo() {
        setIsUpdating(!isUpdating);
    }
    const [newValue, setNewValue] = useState(champs[i]);

    return (
        <li>
            <b> { userinfos[i][0] } </b> : { !isUpdating ? (
                newValue
            ) : (
                <form onSubmit={(e) => {
                    e.preventDefault();
                    submitedit(i, newValue);
                    setIsUpdating(false);
                }}>
                    <input defaultValue={newValue} onChange={(e) => setNewValue(e.target.value)} />
                    <input type="submit" value='&#10004;' />
                </form>
                        
            )}
            { !isUpdating && <button className='myfontawesome' onClick={() => editinfo()}>
                    <i className="fa fa-edit"></i>
                </button>
            }
        </li>
    )
}
