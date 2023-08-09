import React from 'react';
import Graph from './Graph';
import { colorDec } from '../App';
import './Card.css'



export default function Card ({price, percentage, img, coinID, cur})  {
    return(
        <div className='card'>
            <img src={img} alt="" />

            <div className='con-main'>
                <div className='con-title'>
                    <h2 className={`price ${colorDec(percentage)}`}>{price} </h2>
                    <h4 className={`percentage ${colorDec(percentage)}`}>{percentage} </h4>
                </div>
                <Graph coin ={coinID} currency={cur} color={colorDec(percentage)}  />
            </div>
        </div>
    )
    
}