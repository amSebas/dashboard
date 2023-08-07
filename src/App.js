import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header'
import PrincipalCard from './components/CardPrincipal'
import Card from './components/Card'
import Convert from './components/Convert'
import TableCoins from './components/TableCoins'
import Footer from './components/Footer'

export default function App() {
  const [coins, setCoins] = useState()
  const [currency, setCurrency] = useState()
  const [selCur, setselCur] = useState("usd")

  const getData = async () => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=4&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d%2C90d%2C1y`
    );
    const json = await response.json()

    const currency = await fetch(
      `https://api.coingecko.com/api/v3/simple/supported_vs_currencies`
    );
    const curr = await currency.json() 

    setCoins(json)
    setCurrency(curr)

    console.log(json)
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    getData()
  }, [selCur])


  return !coins ? (
  "cargando...") : (
    <div className="App">
      <Header currencys={currency} fun={setselCur} curr={selCur} /> 
      <main>
        <PrincipalCard json={coins[0]} cur={selCur}/>

        <div className= "secundary__cards" >
          {coins.map(({ id, symbol, image,current_price, price_change_percentage_30d_in_currency, }, index) => {
            if (index !== 0) {
              return <Card key = {index} price={`${symbol} - ${current_price} - ${selCur}`} 
                      percentage={deleteDec(price_change_percentage_30d_in_currency, 2)} img={image}
                      coinId={id} cur={selCur}/>
            }
          }
        )}
        </div>
      </main>
      <Convert/>
      <TableCoins coins={coins}/>
      <Footer/>
    </div>
  );
};

export function deleteDec(value, decimal) {
  return value.toFixed(decimal)
};

export function colorDec(num) {
  return num > 0 ? "green" : "red";
}

export const numberF = Intl.NumberFormat("es-Es");