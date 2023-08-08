import React from "react";
import CoinRow from "./CoinRow" 
import './TableCoins.css'


export default  function TableCoins ({coins})  {
    return(
        <table>
            <thead>
                <tr>
                    <td>#</td>
                    <td>Moneda</td>
                    <td>Precio</td>
                    <td>24h</td>
                    <td>Vol. total</td>
                    <td>Cap. mercado</td>
                    <td>Ultimos 7 dias</td>
                </tr>
            </thead>

            <tbody>
                {coins.map((coin, index) => (
                    <CoinRow coin={coin} key={index} index= {index + 1}/>))}
            </tbody>
        </table>
    )

}