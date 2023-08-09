import { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import './Graph.css'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
} from 'chart.js'
import moment from "moment/moment";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend)

export default function Graph({ type = 1, coin = "bitcoin", currency = "usd", days = 30, color = "#04D99D" }) {

    const chartStyle = {
        border: {
            display: false
        },

        grid: {
            display: false
        },

        ticks: {
            display: false
        }
    }

    let url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=${days}&interval=daily`

    let data, options // variables para la informacion y precios
    const [prices, setPrices] = useState()
    const [dates, setDates] = useState()
    const [gradient, setGradient] = useState()

    async function getData() {
        try {
            const response = await fetch(url)
            const json = await response.json()
            setPrices(json.prices.map(item => Math.round(item[1]))) //mapear valor del json (api) y redondear con el metodo math
            setDates(json.prices.map(item => moment.unix(item[0]).format('MM-DD'))) // nueveamente mapear para sacar la fecha con el metodo unix
        } catch (e) {
            console.log('error', e)
        }
    }
    const chartRef = useRef(null)

    useEffect(() => {
        getData()
        const canvas = chartRef.current.firstChild
        let BGgradient = canvas.getContext("2d").createLinearGradient(0, 0, 0, canvas.height);
        BGgradient.addColorStop(0, 'rgba(4, 191, 157, 1)') // colores gradientes y transparencia
        BGgradient.addColorStop(1, 'rgba(4, 191, 157, 0)')
        setGradient(BGgradient)
    }, [])

    switch (type) {
        case 0:
            options = {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                    title: {
                        display: false,
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            callback: function (value, index, ticks) {
                                return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ${currency.toUpperCase()}`;  // Formatear el valor del eje Y con un símbolo de moneda y comas separadoras de miles 
                            }
                        }
                    }
                }
            }
            data = {
                labels: dates,
                datasets:  {
                    data: prices,
                    borderColor: color,
                    background: gradient,
                    tension: .4,
                    pointRadius: 0,
                    fill: true
                }
            }
            break;

        case 1:
            options = {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                    title: {
                        display: false,
                    }
                },
                scales: {
                    x: chartStyle, // estilos predeterminados del grafico
                    y: chartStyle
                }
            }
            data = {
                labels: dates,
                datasets: {
                    data: prices,
                    borderColor: color,
                    tension: .4,
                    pointRadius: 0,
                }
            }
            break
    }
    return (
        <div ref={chartRef} className="graph">
            <Line data={data} options={options} />
        </div>
    )
}