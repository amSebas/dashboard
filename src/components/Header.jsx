import React from 'react';



export default function Header({ currencys, fun, cur }) {
    return (
        <header className='app-header'>
            <p> Cripto Stadistics</p>
            <div className='select-button'>
                <select value={cur} name="coinSelect" id="coinSelect" onChange={() => { fun(document.getElementById("coinSelect").value) }}>
                    {currencys.map((item, index) => {
                        <option value={item} key={index}> {item} </option>
                    })
                    }
                </select>
            </div>
        </header>
    )
}