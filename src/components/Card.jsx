import React from 'react';
import { colorDec } from '../App';
import './Card.css'
import Graph from './Graph';


export default function Card ({price, porcentaje, img, coinID, cur})  {
    return(
        <div className='card'>
            <img src={img} alt="" />

            <div className='con-main'>
                <div className='con-title'>
                    <h2 className={`price ${colorDec(porcentaje)}`}>{price} </h2>
                    <h4 className={`porcentaje ${colorDec(porcentaje)}`}>{porcentaje} </h4>
                </div>
                <Graph coin ={coinID} currency={cur} color={colorDec(porcentaje)}  />
            </div>
        </div>
    )
    
}